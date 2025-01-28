import MainContent from "@/components/main-content";
import { ColorPreferencesProvider } from "@/providers/color-preferences";
import { ThemeProvider } from "@/providers/theme-provider";
import { FC, ReactNode } from "react";

const MainLayout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <ColorPreferencesProvider>
        <MainContent>{children}</MainContent>
      </ColorPreferencesProvider>
    </ThemeProvider>
  );
};

export default MainLayout;
