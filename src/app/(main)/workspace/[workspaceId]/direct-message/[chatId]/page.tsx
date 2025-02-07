import { redirect } from "next/navigation";

import { getUserData } from "@/actions/get-user-data";
import ChatGroup from "@/components/chat-group";
import {
  getCurrentWorkspaceData,
  getUserWorkspaceData,
} from "@/actions/workspaces";
import { getUserWorkspaceChannels } from "@/actions/get-user-workspace-channels";
import { Workspace } from "@/types/app";

const DirectMessage = async ({
  params,
}: {
  params: Promise<{ workspaceId: string; chatId: string }>;
}) => {
  const { workspaceId, chatId } = await params;

  const userData = await getUserData();

  if (!userData) return redirect("/auth");

  const [userWorkspaceData] = await getUserWorkspaceData(userData.workspaces!);

  const [currentWorkspaceData] = await getCurrentWorkspaceData(workspaceId);

  const userWorkspaceChannels = await getUserWorkspaceChannels(
    workspaceId,
    userData.id
  );

  const currentChannelData = userWorkspaceChannels.find(
    channel => channel.id === chatId
  );

  //if (!currentChannelData) return <div>NO CHANNEL DATA</div>;

  return (
    <div className="hidden md:block">
      <ChatGroup
        userData={userData}
        type="DirectMessage"
        currentChannelData={currentChannelData}
        currentWorkspaceData={currentWorkspaceData}
        userWorkspaceData={userWorkspaceData as Workspace[]}
        slug={workspaceId}
        userWorkspaceChannels={userWorkspaceChannels}
        chatId={chatId}
        socketUrl="/api/web-socket/direct-messages"
        socketQuery={{
          channelId: currentChannelData?.id,
          workspaceId: currentWorkspaceData.id,
          recipientId: chatId,
        }}
        apiUrl="/api/direct-messages"
        headerTitle="DIRECT MESSAGE"
        paramKey="recipientId"
        paramValue={chatId}
      />
    </div>
  );
};

export default DirectMessage;
