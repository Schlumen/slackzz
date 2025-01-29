import { FC } from "react";
import { FaPlus } from "react-icons/fa";
import { PiChatsTeardrop } from "react-icons/pi";
import { RiHome2Fill } from "react-icons/ri";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Typography from "@/components/ui/typography";
import { Workspace } from "@/types/app";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

type SidebarNavProps = {
  userWorkspaceData: Workspace[];
  currentWorkspaceData: Workspace;
};

const SidebarNav: FC<SidebarNavProps> = ({
  currentWorkspaceData,
  userWorkspaceData,
}) => {
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
                    {userWorkspaceData.map(workspace => (
                      <div
                        key={workspace.id}
                        className="hover:opacity-70 px-2 py-1 flex gap-2"
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
                    ))}
                    <Separator />
                    <div className="flex items-center gap-2 p-2">
                      <Button variant="secondary">
                        <FaPlus />
                      </Button>
                      <Typography text="Add Workspace" variant="p" />
                    </div>
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
