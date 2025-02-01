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
import { Channel, Workspace } from "@/types/app";

type TextEditorProps = {
  apiUrl: string;
  type: "channel" | "directMessage";
  channel: Channel;
  workscaceData: Workspace;
};

const TextEditor: FC<TextEditorProps> = ({
  apiUrl,
  type,
  channel,
  workscaceData,
}) => {
  const [content, setContent] = useState("");

  const editor = useEditor({
    extensions: [
      StarterKit,
      PlaceHolder.configure({
        placeholder: `Message #${
          type === "channel" ? channel.name : "Username"
        }`,
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
      await axios.post(
        `${apiUrl}?channelId=${channel?.id}&workspaceId=${workscaceData.id}`,
        {
          content,
        }
      );

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
        <FiPlus size={28} className="dark:text-black" />
      </div>

      <Button
        onClick={handleSend}
        disabled={content.length < 2}
        size="sm"
        className="absolute bottom-3 right-3"
      >
        <Send />
      </Button>
    </div>
  );
};

export default TextEditor;
