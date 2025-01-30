"use client";

import { FC, useState } from "react";
import { FaArrowDown, FaArrowUp, FaPlus } from "react-icons/fa6";

import { cn } from "@/lib/utils";
import { useColorPreferences } from "@/providers/color-preferences";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import Typography from "@/components/ui/typography";
import CreateChannelDialog from "@/components/create-channel-dialog";
import { Channel, User, Workspace } from "@/types/app";

const InfoSection: FC<{
  userData: User;
  currentWorkspaceData: Workspace;
  userWorkspaceChannels: Channel[];
}> = ({ userData, currentWorkspaceData, userWorkspaceChannels }) => {
  const { color } = useColorPreferences();
  const [isChannelCollapsed, setIsChannelCollapsed] = useState(false);
  const [isDirectMessageCollapsed, setIsDirectMessageCollapsed] =
    useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  let backgroundColor = "bg-primary-light";

  if (color === "green") {
    backgroundColor = "bg-green-900";
  } else if (color === "blue") {
    backgroundColor = "bg-blue-900";
  }

  let hoverBg = "hover:bg-primary-dark";

  if (color === "green") {
    hoverBg = "hover:bg-green-700";
  } else if (color === "blue") {
    hoverBg = "hover:bg-blue-700";
  }

  return (
    <div
      className={cn(
        "fixed text-white left-20 rounded-l-xl md:w-52 lg:w-[350px] h-[calc(100%-63px)] z-20 flex flex-col items-center",
        backgroundColor
      )}
    >
      <div className="w-full flex flex-col gap-2 p-3">
        <div>
          <Collapsible
            open={isChannelCollapsed}
            onOpenChange={setIsChannelCollapsed}
            className="flex flex-col gap-2"
          >
            <div className="flex items-center justify-between">
              <CollapsibleTrigger className="flex items-center gap-2">
                {isChannelCollapsed ? <FaArrowDown /> : <FaArrowUp />}
                <Typography variant="p" text="Channels" className="font-bold" />
              </CollapsibleTrigger>
              <div
                className={cn("cursor-pointer p-2 rounded-full", hoverBg)}
                onClick={() => setDialogOpen(true)}
              >
                <FaPlus />
              </div>
            </div>
            <CollapsibleContent>
              {userWorkspaceChannels.map(channel => (
                <Typography
                  key={channel.id}
                  variant="p"
                  text={`# ${channel.name}`}
                  className={cn("px-2 py-1 rounded-sm cursor-pointer", hoverBg)}
                />
              ))}
            </CollapsibleContent>
          </Collapsible>
        </div>
        <div>
          <Collapsible
            open={isDirectMessageCollapsed}
            onOpenChange={setIsDirectMessageCollapsed}
            className="flex flex-col gap-2"
          >
            <div className="flex items-center justify-between">
              <CollapsibleTrigger className="flex items-center gap-2">
                {isDirectMessageCollapsed ? <FaArrowDown /> : <FaArrowUp />}
                <Typography
                  variant="p"
                  text="Direct Messages"
                  className="font-bold"
                />
              </CollapsibleTrigger>
              <div className={cn("cursor-pointer p-2 rounded-full", hoverBg)}>
                <FaPlus />
              </div>
            </div>
            <CollapsibleContent>
              <Typography
                variant="p"
                text="User Name 1"
                className={cn("px-2 py-1 rounded-sm cursor-pointer", hoverBg)}
              />
              <Typography
                variant="p"
                text="User Name 2"
                className={cn("px-2 py-1 rounded-sm cursor-pointer", hoverBg)}
              />
              <Typography
                variant="p"
                text="User Name 3"
                className={cn("px-2 py-1 rounded-sm cursor-pointer", hoverBg)}
              />
            </CollapsibleContent>
          </Collapsible>
        </div>
      </div>

      <CreateChannelDialog
        setDialogOpen={setDialogOpen}
        dialogOpen={dialogOpen}
        workspaceId={currentWorkspaceData.id}
        userId={userData.id}
      />
    </div>
  );
};

export default InfoSection;
