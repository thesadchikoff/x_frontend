import ProfileIcon from "@/assets/profile.svg";
import { ROUTES } from "@/constants";
import { useUser } from "@/contexts";
import userService from "@/services/user/user.service";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import Logout from "@/assets/logout.svg";
import styles from "./Header.module.scss";
import { cn } from "@/utils/helpers";

export const Header = () => {
  const { user, setUser } = useUser();
  const navigate = useNavigate();

  const logoutHandler = () => {
    userService.logout();
    setUser(null);
    toast.info("Вы вышли из профиля");
    navigate(ROUTES.LOGIN);
  };
  return (
    <header className=" w-full min-h-[70px] border-b">
      <div className="container flex items-center justify-between h-full">
        <Link to={ROUTES.HOME} className="flex items-center gap-1">
          <span>Task Manager</span>
          {user?.is_premium && (
            <sup className="font-bold text-brand">Premium</sup>
          )}
        </Link>
        <div className="flex items-center gap-4">
          {!user?.is_premium && (
            <div className={styles.premium_root}>
              <span className={cn("font-semibold", styles.premium_badge)}>
                Get Premium
              </span>
            </div>
          )}

          <Link to={ROUTES.PROFILE}>
            <span className="px-4 py-1 font-medium border text-slate-700 rounded-xl mobile:hidden tablet:block bg-primary-50">
              {user?.login ? user.login : user?.email}
            </span>
          </Link>
          <Link className="mobile:block tablet:hidden" to={ROUTES.PROFILE}>
            <img src={ProfileIcon} width={25} height={25} alt="" />
          </Link>
          <img
            onClick={logoutHandler}
            src={Logout}
            width={25}
            height={25}
            className="transition-all delay-100 cursor-pointer hover:drop-shadow"
          />
        </div>
      </div>
    </header>
  );
};
