import { useThemeContext } from "@/hooks/useThemeContext";
import { cn } from "@/utils/helpers";
import { PropsWithChildren } from "react";
interface PublicLayoutProps extends PropsWithChildren {}
export const PublicLayout = ({ children }: PublicLayoutProps) => {
  const version = import.meta.env.PACKAGE_VERSION;
  const { theme } = useThemeContext();
  return (
    <div className="flex flex-col w-full h-full">
      {children}
      <footer
        className={cn("flex items-center justify-center gap-4 p-2 border-t", {
          "border-t-dark": theme === "dark",
        })}
      >
        <span className="text-xs font-medium">Made by Sadchikov 💖</span>
        <span className="text-xs !opacity-60">v{version}</span>
      </footer>
    </div>
  );
};
