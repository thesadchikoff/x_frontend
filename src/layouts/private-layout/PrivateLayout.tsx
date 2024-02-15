import { Header } from "@/layouts";
import { PropsWithChildren } from "react";
interface PrivateLayoutProps extends PropsWithChildren {}
export const PrivateLayout = ({ children }: PrivateLayoutProps) => {
  return (
    <div className="flex flex-col w-full h-full">
      <Header />
      {children}
      <footer className="flex items-center justify-center p-2 border-t">
        <span className="text-xs font-medium">Made by Sadchikov 💖</span>
      </footer>
    </div>
  );
};
