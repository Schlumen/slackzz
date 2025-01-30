import { redirect } from "next/navigation";

import { getUserData } from "@/actions/get-user-data";
import InfoSection from "@/components/info-section";
import Sidebar from "@/components/sidebar";
import { Workspace as UserWorkspace } from "@/types/app";
import {
  getCurrentWorkspaceData,
  getUserWorkspaceData,
} from "@/actions/workspaces";
import { getUserWorkspaceChannels } from "@/actions/get-user-workspace-channels";
import ChatHeader from "@/components/chat-header";
import Typography from "@/components/ui/typography";
import TextEditor from "@/components/text-editor";

const ChannelId = async ({
  params,
}: {
  params: Promise<{ workspaceId: string; channelId: string }>;
}) => {
  const { workspaceId, channelId } = await params;

  const userData = await getUserData();
  if (!userData) return redirect("/auth");

  const [userWorkspaceData] = await getUserWorkspaceData(userData.workspaces!);

  const [currentWorkspaceData] = await getCurrentWorkspaceData(workspaceId);

  const userWorkspaceChannels = await getUserWorkspaceChannels(
    currentWorkspaceData.id,
    userData.id
  );

  const currentChannelData = userWorkspaceChannels.find(
    channel => channel.id === channelId
  );

  if (!currentChannelData) return redirect("/");

  return (
    <div className="hidden md:block">
      <div className="h-[calc(100vh-256px)] overflow-y-auto [&::-webkit-scrollbar-thumb]:rounded-[6px] [&::-webkit-scrollbar-thumb]:bg-foreground/60 [&::-webkit-scrollbar-track]:bg-none [&::-webkit-scrollbar]:w-2">
        <Sidebar
          userData={userData}
          userWorkspaceData={userWorkspaceData as UserWorkspace[]}
          currentWorkspaceData={currentWorkspaceData}
        />
        <InfoSection
          userData={userData}
          currentWorkspaceData={currentWorkspaceData}
          userWorkspaceChannels={userWorkspaceChannels}
          currentChannelId={channelId}
        />
        <div className="p-4 relative w-full overflow-hidden">
          <ChatHeader title={currentChannelData.name} />

          <div className="mt-10">
            <Typography variant="h4" text="Chat Content" />
          </div>
        </div>
      </div>

      <div className="m-4">
        <TextEditor />
      </div>
    </div>
  );
};

export default ChannelId;
