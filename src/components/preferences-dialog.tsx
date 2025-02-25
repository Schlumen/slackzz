"use client";

import { useTheme } from "next-themes";
import { HiOutlinePaintBrush } from "react-icons/hi2";

import { useColorPreferences } from "@/providers/color-preferences";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "./ui/dialog";
import Typography from "./ui/typography";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { BsLaptop } from "react-icons/bs";

const PreferencesDialog = () => {
  const { setTheme, theme } = useTheme();
  const { selectColor } = useColorPreferences();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Typography
          text="Preferences"
          variant="p"
          className="hover:text-white hover:bg-blue-700 px-2 py-1 rounded cursor-pointer"
        />
      </DialogTrigger>
      <DialogContent className="max-w-xs md:w-fit">
        <DialogTitle datatype="div">
          <div className="py-5 scroll-m-12 text-2xl font-semibold tracking-tight lg:text-3xl">
            Preferences
          </div>
          <hr className="bg-gray-200" />
          <Tabs orientation="horizontal" defaultValue="themes">
            <TabsList>
              <TabsTrigger value="themes">
                <HiOutlinePaintBrush className="mr-2" />
                <Typography text="Themes" variant="p" />
              </TabsTrigger>
            </TabsList>
            <TabsContent value="themes" className="max-w-xs md:max-w-fit">
              <Typography
                text="Color Mode"
                variant="p"
                className="py-2 font-bold"
              />
              <Typography
                text="Choose if slackzz appearance should be light or dark or follow the computer settings"
                variant="p"
                className="pb-4"
              />
              <div className="flex flex-wrap gap-3">
                <Button
                  variant="outline"
                  onClick={() => setTheme("light")}
                  className={`w-full ${cn(
                    theme === "light" && "border-blue-600"
                  )}`}
                >
                  <MdLightMode className="mr-2" size={20} />
                  <Typography text="Light" variant="p" />
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setTheme("dark")}
                  className={`w-full ${cn(
                    theme === "dark" && "border-blue-600"
                  )}`}
                >
                  <MdDarkMode className="mr-2" size={20} />
                  <Typography text="Dark" variant="p" />
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setTheme("system")}
                  className={`w-full ${cn(
                    theme === "system" && "border-blue-600"
                  )}`}
                >
                  <BsLaptop className="mr-2" size={20} />
                  <Typography text="System" variant="p" />
                </Button>
              </div>
              <hr className="bg-gray-200 my-5" />
              <Typography
                text="Single Color"
                variant="p"
                className="py-2 font-bold"
              />

              <div className="flex flex-wrap gap-3">
                <Button
                  onClick={() => selectColor("green")}
                  className="w-full hover:border-green-800 border-2"
                >
                  Green
                </Button>
                <Button
                  onClick={() => selectColor("blue")}
                  className="w-full hover:border-blue-800 border-2"
                >
                  Blue
                </Button>
                <Button
                  onClick={() => selectColor("")}
                  className="w-full hover:border-red-800 border-2"
                >
                  Reset
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </DialogTitle>
      </DialogContent>
    </Dialog>
  );
};

export default PreferencesDialog;
