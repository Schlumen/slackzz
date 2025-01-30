import { FC } from "react";
import Typography from "@/components/ui/typography";
import { IoMdHeadset } from "react-icons/io";

const ChatHeader: FC<{ title: string }> = ({ title }) => {
  return (
    <div className="absolute h-10 top-0 left-0 w-full">
      <div className="h-10 flex items-center justify-between px-4 fixed md:w-[calc(100%-296px)] lg:w-[calc(100%-436px)] bg-white dark:bg-neutral-800 border-b border-b-white/30 shadow-md">
        <Typography variant="h4" text={`# ${title}`} />
        <IoMdHeadset className="text-primary" size={24} />
      </div>
    </div>
  );
};

export default ChatHeader;
