import { useRouter, useSearchParams } from "next/navigation";
import { FC } from "react";
import Typography from "@/components/ui/typography";
import { IoMdHeadset } from "react-icons/io";
import { User } from "@/types/app";

type ChatHeaderProps = {
  title: string;
  chatId: string;
  userData: User;
};
const ChatHeader: FC<ChatHeaderProps> = ({ title, chatId, userData }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleCall = () => {
    const currentParams = new URLSearchParams(searchParams?.toString());
    if (currentParams.has("call")) {
      currentParams.delete("call");
    } else {
      currentParams.set("call", "true");
    }

    router.push(`?${currentParams.toString()}`);
  };
  return (
    <div className="absolute z-20 h-10 top-0 left-0 w-full">
      <div className="h-10 flex items-center justify-between px-4 fixed md:w-[calc(100%-296px)] lg:w-[calc(100%-436px)] bg-white dark:bg-neutral-800 border-b border-b-white/30 shadow-md">
        <Typography variant="h4" text={`# ${title}`} />
        <IoMdHeadset
          onClick={handleCall}
          className="text-primary cursor-pointer"
          size={24}
        />
      </div>
    </div>
  );
};

export default ChatHeader;
