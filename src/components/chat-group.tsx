"use client";

import { FC } from "react";

import { Channel, User, Workspace } from "@/types/app";
import Sidebar from "@/components/sidebar";
import InfoSection from "@/components/info-section";
import ChatHeader from "@/components/chat-header";
import Typography from "@/components/ui/typography";
import TextEditor from "@/components/text-editor";

type ChatGroupProps = {
  type: "Channel" | "DirectMessage";
  socketUrl: string;
  apiUrl: string;
  headerTitle: string;
  chatId: string;
  socketQuery: Record<string, string>;
  paramKey: "channelId" | "recipientId";
  paramValue: string;
  userData: User;
  currentWorkspaceData: Workspace;
  currentChannelData: Channel;
  userWorkspaceData: Workspace[];
  userWorkspaceChannels: Channel[];
  slug: string;
};

const ChatGroup: FC<ChatGroupProps> = ({
  type,
  socketUrl,
  apiUrl,
  headerTitle,
  chatId,
  socketQuery,
  paramKey,
  paramValue,
  userData,
  currentWorkspaceData,
  currentChannelData,
  userWorkspaceChannels,
  userWorkspaceData,
  slug,
}) => {
  return (
    <>
      <div className="h-[calc(100vh-256px)] overflow-y-auto [&::-webkit-scrollbar-thumb]:rounded-[6px] [&::-webkit-scrollbar-thumb]:bg-foreground/60 [&::-webkit-scrollbar-track]:bg-none [&::-webkit-scrollbar]:w-2">
        <Sidebar
          userData={userData}
          userWorkspaceData={userWorkspaceData as Workspace[]}
          currentWorkspaceData={currentWorkspaceData}
        />
        <InfoSection
          userData={userData}
          currentWorkspaceData={currentWorkspaceData}
          userWorkspaceChannels={userWorkspaceChannels}
          currentChannelId={
            type === "Channel" ? currentChannelData.id : undefined
          }
        />
        <div className="p-4 relative w-full overflow-hidden">
          <ChatHeader title={headerTitle} chatId={chatId} userData={userData} />

          <div className="mt-10">
            <Typography variant="h4" text="Chat Content" />
          </div>
        </div>
      </div>

      <div className="m-4">
        <TextEditor
          apiUrl={socketUrl}
          type={type}
          channel={currentChannelData}
          workspaceData={currentWorkspaceData}
          userData={userData}
          recipientId={type === "DirectMessage" ? chatId : undefined}
        />
      </div>
    </>
  );
};

export default ChatGroup;
