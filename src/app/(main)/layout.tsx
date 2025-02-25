import { FC, ReactNode } from "react";

import MainContent from "@/components/main-content";
import { ColorPreferencesProvider } from "@/providers/color-preferences";
import { ThemeProvider } from "@/providers/theme-provider";
import { WebSocketProvider } from "@/providers/web-socket";
import { QueryProvider } from "@/providers/query-provider";

const MainLayout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <WebSocketProvider>
        <ColorPreferencesProvider>
          <MainContent>
            <QueryProvider>{children}</QueryProvider>
          </MainContent>
        </ColorPreferencesProvider>
      </WebSocketProvider>
    </ThemeProvider>
  );
};

export default MainLayout;
