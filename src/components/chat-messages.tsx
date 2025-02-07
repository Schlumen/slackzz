import { FC, useRef } from "react";
import { format } from "date-fns";

import { useChatFetcher } from "@/hooks/use-chat-fetcher";
import { Channel, User, Workspace } from "@/types/app";
import DotAnimatedLoader from "@/components/dot-animated-loader";
import ChatItem from "@/components/chat-item";
import { useChatSocketConnection } from "@/hooks/use-chat-socket-connection";
import IntroBanner from "@/components/intro-banner";
import { Button } from "@/components/ui/button";
import { useChatScrollHandler } from "@/hooks/use-chat-scroll-handler";

const DATE_FORMAT = "d MMM yyy, HH:mm";

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
  socketUrl,
  socketQuery,
  type,
  chatId,
  userData,
  workspaceData,
  channelData,
  name,
}) => {
  const chatRef = useRef<HTMLDivElement>(null!);
  const bottomRef = useRef<HTMLDivElement>(null!);

  const queryKey =
    type === "Channel" ? `channel:${chatId}` : `direct_message:${chatId}`;

  const { data, status, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useChatFetcher({
      apiUrl,
      queryKey,
      paramKey,
      paramValue,
      pageSize: 10,
    });

  useChatSocketConnection({
    queryKey,
    addKey:
      type === "Channel"
        ? `${queryKey}:channel-messages`
        : "direct-messages:post",
    updateKey:
      type === "Channel"
        ? `${queryKey}:channel-message:update`
        : "direct-messages:update",
    paramValue,
  });

  useChatScrollHandler({
    chatRef,
    bottomRef,
    lastMessageId: data?.pages?.[0].data?.[0]?.id ?? "",
  });

  console.log(data?.pages?.[0].data?.[0]?.id);

  if (status === "pending") {
    return <DotAnimatedLoader />;
  }

  if (status === "error") {
    return <div>Error occured</div>;
  }

  const renderMessages = () =>
    data.pages.map(page =>
      page.data.map(message => (
        <ChatItem
          key={message.id}
          currentUser={userData}
          user={message.user}
          content={message.content}
          fileUrl={message.file_url}
          deleted={message.is_deleted}
          id={message.id}
          timestamp={format(new Date(message.created_at), DATE_FORMAT)}
          isUpdated={message.updated_at !== message.created_at}
          socketUrl={socketUrl}
          socketQuery={socketQuery}
          channelData={channelData}
        />
      ))
    );

  return (
    <div ref={chatRef} className="flex-1 flex flex-col py-4 overflow-y-auto">
      {!hasNextPage && (
        <IntroBanner
          type={type}
          name={name}
          creationDate={workspaceData.created_at}
        />
      )}
      {hasNextPage && (
        <div className="flex justify-center">
          {isFetchingNextPage ? (
            <DotAnimatedLoader />
          ) : (
            <Button variant="link" onClick={() => fetchNextPage()}>
              Load Previous Messages
            </Button>
          )}
        </div>
      )}
      <div className="flex flex-col-reverse mt-auto">{renderMessages()}</div>
      <div ref={bottomRef} />
    </div>
  );
};

export default ChatMessages;
