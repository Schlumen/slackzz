"use client";

import { FC, useState } from "react";
import { PiChatsTeardrop } from "react-icons/pi";
import { RiHome2Fill } from "react-icons/ri";
import { useRouter } from "next/navigation";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import Typography from "@/components/ui/typography";
import { Workspace } from "@/types/app";
import CreateWorkspace from "@/components/create-workspace";
import ProgressBar from "@/components/progress-bar";
import { cn } from "@/lib/utils";
import { useColorPreferences } from "@/providers/color-preferences";

type SidebarNavProps = {
  userWorkspaceData: Workspace[];
  currentWorkspaceData: Workspace;
};

const SidebarNav: FC<SidebarNavProps> = ({
  currentWorkspaceData,
  userWorkspaceData,
}) => {
  const { color } = useColorPreferences();
  let backgroundColor = "bg-primary-dark";

  if (color === "green") {
    backgroundColor = "bg-green-700";
  } else if (color === "blue") {
    backgroundColor = "bg-blue-700";
  }

  // Switch workspace function
  const router = useRouter();
  const [switchingWorkspace, setSwitchingWorkspace] = useState(false);

  const switchWorkspace = async (id: string) => {
    setSwitchingWorkspace(true);
    router.push(`/workspace/${id}`);
    setTimeout(() => {
      setSwitchingWorkspace(false);
    }, 2000);
  };

  return (
    <nav>
      <ul className="flex flex-col space-y-4">
        <li>
          <div className="cursor-pointer items-center text-white mb-4 w-10 h-10 rounded-lg overflow-hidden">
            <Popover>
              <PopoverTrigger>
                <Avatar>
                  <AvatarImage
                    src={currentWorkspaceData.image_url || ""}
                    alt={currentWorkspaceData.name}
                    className="object-cover w-full h-full"
                  />
                  <AvatarFallback className="bg-neutral-700">
                    <Typography
                      text={currentWorkspaceData.name.slice(0, 2)}
                      variant="p"
                    />
                  </AvatarFallback>
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="p-0" side="bottom">
                <Card className="w-[350px] border-0">
                  <CardContent className="flex p-0 flex-col">
                    {switchingWorkspace ? (
                      <div className="m-2">
                        <ProgressBar />
                      </div>
                    ) : (
                      userWorkspaceData.map(workspace => {
                        const isActive =
                          workspace.id === currentWorkspaceData.id;
                        return (
                          <div
                            key={workspace.id}
                            className={cn(
                              isActive && `${backgroundColor} text-white`,
                              `hover:opacity-70 px-2 py-1 flex gap-2 cursor-pointer`
                            )}
                            onClick={() => switchWorkspace(workspace.id)}
                          >
                            <Avatar>
                              <AvatarImage
                                src={workspace.image_url || ""}
                                alt={workspace.name}
                                className="object-cover w-full h-full"
                              />
                              <AvatarFallback>
                                <Typography
                                  text={workspace.name.slice(0, 2)}
                                  variant="p"
                                />
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <Typography
                                text={workspace.name}
                                variant="p"
                                className="text-sm"
                              />
                              <Typography
                                text={workspace.invite_code || ""}
                                variant="p"
                                className="text-xs lg:text-xs"
                              />
                            </div>
                          </div>
                        );
                      })
                    )}
                    <Separator />
                    <CreateWorkspace />
                  </CardContent>
                </Card>
              </PopoverContent>
            </Popover>
          </div>
          <div className="flex flex-col items-center cursor-pointer group text-white">
            <div className="p-2 rounded-lg bg-[rgba(255,255,255,0.3)]">
              <RiHome2Fill
                size={20}
                className="group-hover:scale-125 transition-all duration-300"
              />
            </div>
            <Typography
              text="Home"
              variant="p"
              className="text-sm lg:text-sm md:text:sm"
            />
          </div>
        </li>
        <li>
          <div className="flex flex-col cursor-pointer items-center group text-white">
            <div className="flex flex-col items-center cursor-pointer group text-white">
              <div className="p-2 rounded-lg bg-[rgba(255,255,255,0.3)]">
                <PiChatsTeardrop
                  size={20}
                  className="group-hover:scale-125 transition-all duration-300"
                />
              </div>
              <Typography
                text="Dm's"
                variant="p"
                className="text-sm lg:text-sm md:text:sm"
              />
            </div>
          </div>
        </li>
      </ul>
    </nav>
  );
};

export default SidebarNav;
