import { getUserData } from "@/actions/get-user-data";
import {
  getCurrentWorkspaceData,
  getUserWorkspaceData,
} from "@/actions/workspaces";
import Sidebar from "@/components/sidebar";
import { Workspace as UserWorkspace } from "@/types/app";
import { redirect } from "next/navigation";

const Workspace = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  const userData = await getUserData();
  if (!userData) return redirect("/auth");

  const [userWorkspaceData, userWorkspaceError] = await getUserWorkspaceData(
    userData.workspaces!
  );

  const [currentWorkspaceData, currentWorkspaceError] =
    await getCurrentWorkspaceData(id);

  return (
    <>
      <div className="hidden md:block">
        <Sidebar
          userData={userData}
          userWorkspaceData={userWorkspaceData as UserWorkspace[]}
          currentWorkspaceData={currentWorkspaceData}
        />
      </div>
      <div className="md:hidden block min-h-screen">Mobile</div>
    </>
  );
};

export default Workspace;
