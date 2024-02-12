import { Outlet } from "react-router-dom";
import { Header } from "@/layouts";

export const PrivateLayout = () => {
  return (
    <div className="flex flex-col w-full h-full">
      <Header />
      <Outlet />
      <footer className="flex items-center justify-center p-2 border-t">
        <span className="text-xs font-medium">Made by Sadchikov 💖</span>
      </footer>
    </div>
  );
};
