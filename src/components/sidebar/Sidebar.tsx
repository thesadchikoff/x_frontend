import { navLinks } from "@/data/nav-links";
import { useThemeContext } from "@/hooks/useThemeContext";
import { cn } from "@/utils/helpers";
import { PanelLeftCloseIcon, PanelLeftOpenIcon } from "lucide-react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import "./Sidebar.scss";

export const Sidebar = () => {
  console.log(typeof localStorage.getItem("is_open"));
  const storedIsOpenSidebar = () => {
    const storeState = localStorage.getItem("is_open");
    if (storeState == undefined) {
      return true;
    }
    return storeState === "true" ? true : false;
  };
  console.log(typeof storedIsOpenSidebar, storedIsOpenSidebar);

  const [isShow, setIsShow] = useState<boolean>(storedIsOpenSidebar);
  console.log(isShow);
  const toggleShowSideBar = () => {
    setIsShow((prev) => {
      const newState = !prev;
      localStorage.setItem("is_open", String(newState));
      return newState;
    });
  };

  const { theme } = useThemeContext();
  return (
    <aside
      className={cn(
        "w-[15rem] border-r bg-indicator-white transition-[width] duration-150",
        {
          "bg-dark border-r-dark": theme === "dark",
          "w-[5rem]": !isShow,
        }
      )}
    >
      <div
        onClick={toggleShowSideBar}
        className={cn(
          "flex items-center justify-center p-3 border-b hover:bg-primary-50 cursor-pointer",
          {
            "border-b-dark hover:bg-dark-foreground": theme === "dark",
          }
        )}
      >
        {isShow ? (
          <PanelLeftCloseIcon className={cn("text-brand-accent ")} />
        ) : (
          <PanelLeftOpenIcon className={cn("text-brand-accent ")} />
        )}
      </div>
      <div
        className={cn("flex flex-col  gap-3 p-5 ", {
          "items-center": !isShow,
        })}
      >
        {navLinks.map((link) => {
          return (
            <NavLink
              to={link.path}
              key={link.title}
              title={link.title}
              className={({ isActive }) =>
                cn(
                  "flex  items-center gap-3 px-5 py-2 cursor-pointer rounded-xl  text-[13px]",

                  {
                    "hover:bg-primary-100 text-indicator-normal":
                      theme === "light",
                    "hover:bg-dark-foreground text-indicator-light":
                      theme === "dark",
                    "bg-dark-foreground text-brand-accent":
                      isActive && theme === "dark",
                    "bg-primary-100 text-brand-accent":
                      isActive && theme === "light",
                  }
                )
              }
            >
              <link.icon size={18} />
              {isShow && <span>{link.title}</span>}
            </NavLink>
          );
        })}
      </div>
    </aside>
  );
};
