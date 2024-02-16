import { AvatarPremium } from "@/components/avatar-premium/AvatarPremium";
import { PremiumBadge } from "@/components/premium-badge/PremiumBadge";
import { ROUTES } from "@/constants";
import { useUser } from "@/contexts";
import { Settings2 } from "lucide-react";
import Avatar from "react-avatar";
import { Link } from "react-router-dom";
import styles from "./Profile.module.scss";
import ErrorBoundary from "@/components/error/ErrorBoundary";
import { useThemeContext } from "@/hooks/useThemeContext";
import clsx from "clsx";
import { cn } from "@/utils/helpers";

export const Profile = () => {
  const { user } = useUser();
  const { theme } = useThemeContext();
  return (
    <div
      className={clsx({
        [styles.dark]: theme === "dark",
        [styles.light]: theme === "light",
      })}
    >
      <div className="container flex flex-col gap-10">
        <h1 className="text-xl font-medium">Ваш профиль</h1>
        <div
          className={cn(styles.profile_info, {
            "bg-dark-foreground border border-dark": theme === "dark",
            "bg-indicator-white border": theme === "light",
          })}
        >
          <div className="flex items-center gap-5">
            <div className="flex flex-col">
              <div className="flex items-center gap-5">
                {user?.is_premium ? (
                  <AvatarPremium user={user} />
                ) : (
                  <Avatar
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore

                    name={user?.login ? user?.login : user?.email}
                    size="50"
                    email={user?.email}
                    round
                    src={import.meta.env.VITE_API_URL + "/" + user?.avatar_url}
                    className={styles.avatar}
                  />
                )}

                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-4">
                    <span className="font-medium">{user?.email}</span>
                    <ErrorBoundary>
                      <PremiumBadge />
                    </ErrorBoundary>
                  </div>

                  {user?.login && (
                    <span className="text-xs font-medium !opacity-50">
                      {user!.login}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
          <Link
            to={ROUTES.SETTINGS}
            className="p-2 rounded-full hover:bg-brand hover:bg-opacity-10 hover:bg-opacity-35"
          >
            <Settings2 className="stroke-blue-500" />
          </Link>
        </div>
      </div>
    </div>
  );
};
