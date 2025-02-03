import { FC } from "react";

import { useChatFetcher } from "@/hooks/use-chat-fetcher";
import { Channel, User, Workspace } from "@/types/app";
import DotAnimatedLoader from "@/components/dot-animated-loader";

type ChatMessagesProps = {
  userData: User;
  name: string;
  chatId: string;
  apiUrl: string;
  socketUrl: string;
  socketQuery: Record<string, string>;
  paramKey: "channelId" | "recipientId";
  paramValue: string;
  type: "Channel" | "DirectMessage";
  workspaceData: Workspace;
  channelData?: Channel;
};

const ChatMessages: FC<ChatMessagesProps> = ({
  apiUrl,
  paramKey,
  paramValue,
  socketQuery,
  type,
  chatId,
  userData,
  workspaceData,
  channelData,
}) => {
  const queryKey =
    type === "Channel" ? `channel:${chatId}` : `direct_message:${chatId}`;

  const { data, status, fetchNextPage, hasNextPage, isFetchNextPage } =
    useChatFetcher({
      apiUrl,
      queryKey,
      paramKey,
      paramValue,
      pageSize: 10,
    });

  if (status === "pending") {
    return <DotAnimatedLoader />;
  }

  if (status === "error") {
    return <div>Error occured</div>;
  }

  const renderMessages = () =>
    data.pages.map(page =>
      page.data.map(message => (
        <div key={message.id}>
          {message.content ? message.content : "File Url"}
        </div>
      ))
    );

  return (
    <div className="flex-1 flex flex-col py-4 overflow-y-auto">
      <div className="flex flex-col-reverse mt-auto">{renderMessages()}</div>
    </div>
  );
};

export default ChatMessages;
