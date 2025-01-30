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

  return (
    <div className="hidden md:block">
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
      <div className="p-2">Channel</div>
    </div>
  );
};

export default ChannelId;
