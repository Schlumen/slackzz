import { getUserData } from "@/actions/get-user-data";
import {
  getCurrentWorkspaceData,
  getUserWorkspaceData,
} from "@/actions/workspaces";
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

  return <div>Workspace</div>;
};

export default Workspace;
