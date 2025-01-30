import { Editor } from "@tiptap/react";
import {
  Bold,
  Code,
  Italic,
  List,
  ListOrdered,
  SquareCode,
  Strikethrough,
} from "lucide-react";
import { useTheme } from "next-themes";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";

import Typography from "@/components/ui/typography";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { BsEmojiSmile } from "react-icons/bs";

const MenuBar = ({ editor }: { editor: Editor }) => {
  const { resolvedTheme } = useTheme();

  return (
    <div className="flex items-center flex-wrap gap-2 absolute z-10 top-0 left-0 w-full p-2 bg-neutral-100 dark:bg-neutral-900">
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={editor.isActive("bold") ? "bg-gray-500" : ""}
      >
        <Bold className="w-4 h-4" />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={editor.isActive("italic") ? "bg-gray-500" : ""}
      >
        <Italic className="w-4 h-4" />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={!editor.can().chain().focus().toggleStrike().run()}
        className={editor.isActive("strike") ? "bg-gray-500" : ""}
      >
        <Strikethrough className="w-4 h-4" />
      </button>
      <Typography text="|" variant="h6" className="m-0" />
      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={editor.isActive("bulletList") ? "bg-gray-500" : ""}
      >
        <List className="w-4 h-4" />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={editor.isActive("orderedList") ? "bg-gray-500" : ""}
      >
        <ListOrdered className="w-4 h-4" />
      </button>
      <Typography text="|" variant="h6" className="m-0" />
      <button
        onClick={() => editor.chain().focus().toggleCode().run()}
        disabled={!editor.can().chain().focus().toggleCode().run()}
        className={editor.isActive("code") ? "bg-gray-500" : ""}
      >
        <Code className="w-4 h-4" />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={editor.isActive("codeBlock") ? "bg-gray-500" : ""}
      >
        <SquareCode className="w-4 h-4" />
      </button>
      <Typography text="|" variant="h6" className="m-0" />
      <Popover>
        <PopoverTrigger asChild>
          <button>
            <BsEmojiSmile size={18} />
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-fit p-0 bg-transparent">
          <Picker
            theme={resolvedTheme}
            data={data}
            onEmojiSelect={(emoji: { native: string }) =>
              editor.chain().focus().insertContent(emoji.native).run()
            }
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default MenuBar;
