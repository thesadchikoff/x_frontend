import { Sidebar } from "@/components/sidebar/Sidebar";
import { useThemeContext } from "@/hooks/useThemeContext";
import { Header } from "@/layouts";
import { cn } from "@/utils/helpers";
import { PropsWithChildren } from "react";
interface PrivateLayoutProps extends PropsWithChildren {}
export const PrivateLayout = ({ children }: PrivateLayoutProps) => {
  const { theme } = useThemeContext();
  return (
    <div className="flex flex-col flex-1 w-full max-h-screen">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main
          className={cn(
            "flex flex-col flex-1 w-full !py-5 h-full overflow-y-auto px-5",
            {
              "dark:bg-dark": theme === "dark",
              "bg-primary-50 ": theme === "light",
            }
          )}
        >
          {children}
        </main>
      </div>
      <footer
        className={cn(
          "flex items-center justify-center flex-grow-0 p-2 border-t",
          {
            "border-t-dark bg-dark": theme === "dark",
          }
        )}
      >
        <span className="text-xs font-medium">Made by Sadchikov 💖</span>
      </footer>
    </div>
  );
};
