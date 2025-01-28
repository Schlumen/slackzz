import { User, Workspace } from "@/types/app";
import { FC } from "react";

type SidebarProps = {
  userWorkspaceData: Workspace[];
  currentWorkspaceData: Workspace;
  userData: User;
};

const Sidebar: FC<SidebarProps> = ({
  userWorkspaceData,
  currentWorkspaceData,
  userData,
}) => {
  return <aside></aside>;
};

export default Sidebar;
