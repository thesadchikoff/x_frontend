import { AvatarPremium } from "@/components/avatar-premium/AvatarPremium";
import { PremiumBadge } from "@/components/premium-badge/PremiumBadge";
import { ROUTES } from "@/constants";
import { useUser } from "@/contexts";
import { Settings2 } from "lucide-react";
import { Link } from "react-router-dom";
import styles from "./Profile.module.scss";
import ErrorBoundary from "@/components/error/ErrorBoundary";
import { useThemeContext } from "@/hooks/useThemeContext";
import { cn } from "@/utils/helpers";
import { StatisticWidget } from "@/components/statistic-widget/StatisticWidget";

export const Profile = () => {
  const { user } = useUser();
  const { theme } = useThemeContext();

  return (
    <div
      className={cn("flex flex-1  w-full h-full", {
        "bg-dark": theme === "dark",
        "bg-primary-50": theme === "light",
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
                <AvatarPremium user={user} />

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
            className="p-2 rounded-full hover:bg-brand hover:bg-opacity-15"
          >
            <Settings2 className="stroke-primary-800" />
          </Link>
        </div>
        {user?.is_premium && <StatisticWidget />}
      </div>
    </div>
  );
};
