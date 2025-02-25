"use client";

import { Send } from "lucide-react";
import { FiPlus } from "react-icons/fi";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import PlaceHolder from "@tiptap/extension-placeholder";
import { FC, useState } from "react";
import axios from "axios";

import { Button } from "@/components/ui/button";
import MenuBar from "@/components/menu-bar";
import { Channel, User, Workspace } from "@/types/app";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import ChatFileUpload from "@/components/chat-file-upload";

type TextEditorProps = {
  apiUrl: string;
  type: "Channel" | "DirectMessage";
  channel?: Channel;
  workspaceData: Workspace;
  userData: User;
  recipientId?: string;
};

const TextEditor: FC<TextEditorProps> = ({
  apiUrl,
  type,
  channel,
  workspaceData,
  userData,
  recipientId,
}) => {
  const [content, setContent] = useState("");
  const [fileUploadModal, setFileUploadModal] = useState(false);

  const toggleFileUploadModal = () => setFileUploadModal(prev => !prev);

  const editor = useEditor({
    extensions: [
      StarterKit,
      PlaceHolder.configure({
        placeholder: `Message #${channel?.name ?? "USERNAME"}`,
      }),
    ],
    autofocus: true,
    content,
    onUpdate({ editor }) {
      setContent(editor.getHTML());
    },
  });

  const handleSend = async () => {
    if (content.length < 2) return;

    try {
      const payload = {
        content,
        type,
      };

      let endpoint = apiUrl;

      if (type === "Channel" && channel) {
        endpoint += `?channelId=${channel?.id}&workspaceId=${workspaceData.id}`;
      } else if (type === "DirectMessage" && recipientId) {
        endpoint += `?recipientId=${recipientId}&workspaceId=${workspaceData.id}`;
      }
      await axios.post(endpoint, payload);

      setContent("");
      editor?.commands.setContent("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-1 border dark:border-zinc-500 border-neutral-700 rounded-md relative overflow-hidden">
      <div className="sticky top-0 z-10">
        {editor && <MenuBar editor={editor} />}
      </div>
      <div className="h-[150px] pt-11 flex w-full grow-1">
        <EditorContent
          editor={editor}
          className="prose dark:prose-invert prose-p:my-2 max-w-none w-full h-full dark:text-white leading-[1.15] overflow-y-scroll whitespace-pre-wrap"
        />
      </div>
      <div className="absolute top-3 z-10 right-3 bg-black dark:bg-white cursor-pointer transition-all duration-500 hover:scale-110 text-white grid place-content-center rounded-full w-6 h-6">
        <FiPlus
          onClick={toggleFileUploadModal}
          size={28}
          className="dark:text-black"
        />
      </div>

      <Button
        onClick={handleSend}
        disabled={content.length < 2}
        size="sm"
        className="absolute bottom-3 right-3"
      >
        <Send />
      </Button>

      <Dialog onOpenChange={setFileUploadModal} open={fileUploadModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>File Uplaod</DialogTitle>
            <DialogDescription>
              Upload a file to share with your team
            </DialogDescription>

            <ChatFileUpload
              userData={userData}
              workspaceData={workspaceData}
              channel={channel}
              recipientId={recipientId}
              toggleFileUploadModal={toggleFileUploadModal}
            />
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TextEditor;
