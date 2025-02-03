"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { z } from "zod";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Form } from "@/components/ui/form";
import Typography from "@/components/ui/typography";
import { useChatFile } from "@/hooks/use-chat-file";
import { cn } from "@/lib/utils";
import { Channel, User } from "@/types/app";

type ChatItemProps = {
  id: string;
  content: string | null;
  user: User;
  timestamp: string;
  fileUrl: string | null;
  deleted: boolean;
  currentUser: User;
  isUpdated: boolean;
  socketUrl: string;
  socketQuery: Record<string, string>;
  channelData?: Channel;
};

const formSchema = z.object({
  content: z.string().min(2),
});

const ChatItem = ({
  id,
  content,
  user,
  timestamp,
  fileUrl,
  deleted,
  currentUser,
  isUpdated,
  socketUrl,
  socketQuery,
  channelData,
}: ChatItemProps) => {
  const { publicUrl, fileType } = useChatFile(fileUrl!);
  const [isEditing, setIsEditing] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { content: content ?? "" },
  });

  const isSuperAdmin = currentUser.id === channelData?.user_id;
  const isRegulator =
    channelData?.regulators?.includes(currentUser.id) ?? false;
  const isOwner = currentUser.id === user.id;

  const canDeleteMessage = !deleted && (isSuperAdmin || isRegulator || isOwner);
  const canEditMessage = !deleted && isOwner && !fileUrl;
  const isPdf = fileType === "pdf" && fileUrl;
  const isImage = fileType === "image" && fileUrl;
  // const isLoading = status === "loading";

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    console.log(data);
  };

  const FilePreview = () => (
    <>
      {isImage && (
        <Link
          href={publicUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="relative aspect-square rounded-md mt-2 overflow-hidden border flex items-center bg-secondary h-28 w-48"
        >
          <Image
            src={publicUrl}
            alt={content ?? ""}
            fill
            className="object-cover"
          />
        </Link>
      )}
      {isPdf && (
        <div className="flex flex-col items-start justify-center gap-2 px-2 py-1 border rounded-md shadow bg-white dark:bg-gray-800">
          <Typography
            variant="p"
            text="shared file"
            className="text-lg font-semibold text-gray-700 dark:text-gray-200"
          />
          <Link
            href={publicUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 hover:underline transition-colors duration-300 ease-in-out"
          >
            View PDF
          </Link>
        </div>
      )}
    </>
  );

  const EditableContent = () =>
    isEditing ? (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}></form>
      </Form>
    ) : (
      <div
        className={cn("text-sm", { "text-xs opacity-90 italic": deleted })}
        dangerouslySetInnerHTML={{ __html: content ?? "" }}
      ></div>
    );

  return (
    <div className="relative group flex items-center hover:bg-black/5 p-2 rounded transition w-full">
      <div className="flex gap-x-2">
        <div className="cursor-pointer hover:drop-shadow-md transition">
          <Avatar>
            <AvatarImage
              src={user.avatar_url}
              alt={user.name ?? user.email}
              className="object-cover w-full h-full"
            />
            <AvatarFallback className="bg-neutral-700">
              <Typography variant="p" text={user.name?.slice(0, 2) ?? "UN"} />
            </AvatarFallback>
          </Avatar>
        </div>
        <div className="flex flex-col w-full">
          <div className="flex items-center gap-x-2">
            <Typography
              variant="p"
              text={user.name ?? user.email}
              className="font-semibold text-sm hover:underline cursor-pointer"
            />
            <MdOutlineAdminPanelSettings className="w-5 h-5" />
            <span className="text-sm">(editd)</span>
            <span>{timestamp}</span>
          </div>
          <FilePreview />
          {!fileUrl && <EditableContent />}
        </div>
      </div>
    </div>
  );
};

export default ChatItem;
