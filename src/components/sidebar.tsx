"use client";

import { FC } from "react";
import { FiPlus } from "react-icons/fi";
import { GoDot, GoDotFill } from "react-icons/go";
import { GiNightSleep } from "react-icons/gi";
import { FaPencil } from "react-icons/fa6";
import { IoDiamondOutline } from "react-icons/io5";
import Image from "next/image";

import { User, Workspace } from "@/types/app";
import SidebarNav from "@/components/sidebar-nav";
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useColorPreferences } from "@/providers/color-preferences";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Typography from "@/components/ui/typography";
import { FaRegCalendarCheck } from "react-icons/fa";
import PreferencesDialog from "@/components/preferences-dialog";

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
  const { color } = useColorPreferences();
  let backgroundColor = "bg-primary-dark";

  if (color === "green") {
    backgroundColor = "bg-green-700";
  } else if (color === "blue") {
    backgroundColor = "bg-blue-700";
  }

  return (
    <aside
      className={`fixed top-0 left-0 pt-[68px] pb-8 z-30 flex flex-col justify-between items-center h-screen w-20`}
    >
      <SidebarNav
        currentWorkspaceData={currentWorkspaceData}
        userWorkspaceData={userWorkspaceData}
      />

      <div className="flex flex-col space-y-3">
        <div
          className={`bg-[rgba(255,255,255,0.3)] cursor-pointer transition-all duration-300
          hover:scale-110 text-white grid place-content-center rounded-full w-10 h-10`}
        >
          <FiPlus size={28} />
        </div>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div>
                <Popover>
                  <PopoverTrigger>
                    <div className="h-10 w-10 relative cursor-pointer">
                      <div className="h-full w-full rounded-lg overflow-hidden">
                        <Image
                          className="object-cover w-full h-full"
                          src={userData.avatar_url}
                          alt={userData.name || "user"}
                          width={300}
                          height={300}
                        />
                        <div
                          className={cn(
                            "absolute z-10 rounded-full -right-[20%] -bottom-1",
                            backgroundColor
                          )}
                        >
                          {userData.is_away ? (
                            <GoDot className="text-white text-xl" />
                          ) : (
                            <GoDotFill className="text-green-600" size={17} />
                          )}
                        </div>
                      </div>
                    </div>
                  </PopoverTrigger>
                  <PopoverContent side="right">
                    <div>
                      <div className="flex space-x-3">
                        <Avatar>
                          <AvatarImage src={userData.avatar_url} />
                          <AvatarFallback>
                            {userData.name && userData.name.slice(0, 2)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                          <Typography
                            text={userData.name || userData.email}
                            variant="p"
                            className="font-bold"
                          />
                          <div className="flex items-center space-x-1">
                            {userData.is_away ? (
                              <GiNightSleep size="12" />
                            ) : (
                              <GoDotFill size="17" className="text-green-600" />
                            )}
                            <span className="text-xs">
                              {userData.is_away ? "Away" : "Active"}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="border group cursor-pointer mt-4 mb-2 p-1 rounded flex items-center space-x-2">
                        <FaRegCalendarCheck className="group-hover:hidden" />
                        <FaPencil className="hidden group-hover:block" />
                        <Typography
                          text={"In a meeting"}
                          variant="p"
                          className="text-xs text-gray-600"
                        />
                      </div>
                      <div className="flex flex-col space-y-1">
                        <Typography
                          text={
                            userData.is_away
                              ? "Set yourself as active"
                              : "Set yourself as away"
                          }
                          className="hover:text-white hover:bg-blue-700 px-2 py-1 rounded cursor-pointer"
                          variant="p"
                        />
                        <Typography
                          text={"Clear status"}
                          className="hover:text-white hover:bg-blue-700 px-2 py-1 rounded cursor-pointer"
                          variant="p"
                        />
                        <hr className="bg-gray-400" />
                        <Typography
                          text={"Profile"}
                          className="hover:text-white hover:bg-blue-700 px-2 py-1 rounded cursor-pointer"
                          variant="p"
                        />
                        {/* Preferences Dialog */}
                        <PreferencesDialog />
                        <hr className="bg-gray-400" />
                        <div className="flex gap-2 items-center hover:text-white hover:bg-blue-700 px-2 py-1 rounded cursor-pointer">
                          <IoDiamondOutline className="text-orange-400" />
                          <Typography
                            text={`Upgrade ${currentWorkspaceData.name}`}
                            variant="p"
                            className="text-xs"
                          />
                        </div>
                        <Typography
                          text={`Sign out of ${currentWorkspaceData.name}`}
                          className="hover:text-white hover:bg-blue-700 px-2 py-1 rounded cursor-pointer"
                          variant="p"
                        />
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            </TooltipTrigger>
            <TooltipContent
              className="text-white bg-black border-black"
              side="right"
            >
              <Typography text={userData.name || userData.email} variant="p" />
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </aside>
  );
};

export default Sidebar;
