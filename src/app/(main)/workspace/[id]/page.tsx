import { getUserData } from "@/actions/get-user-data";
import { getUserWorkspaceChannels } from "@/actions/get-user-workspace-channels";
import {
  getCurrentWorkspaceData,
  getUserWorkspaceData,
} from "@/actions/workspaces";
import InfoSection from "@/components/info-section";
import Sidebar from "@/components/sidebar";
import { Workspace as UserWorkspace } from "@/types/app";
import { redirect } from "next/navigation";

const Workspace = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  const userData = await getUserData();
  if (!userData) return redirect("/auth");

  const [userWorkspaceData] = await getUserWorkspaceData(userData.workspaces!);

  const [currentWorkspaceData] = await getCurrentWorkspaceData(id);

  const userWorkspaceChannels = await getUserWorkspaceChannels(
    currentWorkspaceData.id,
    userData.id
  );

  return (
    <>
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
        />
        Workspace
      </div>
      <div className="md:hidden block min-h-screen">Mobile</div>
    </>
  );
};

export default Workspace;
