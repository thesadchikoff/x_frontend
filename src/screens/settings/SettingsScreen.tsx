import { ChangeProfileForm, UploadAvatar } from "@/components";
import TelegramLogo from "@/assets/telegram.png";
import ChangePasswordForm from "@/components/change-password-form/ChangePasswordForm";
import { TwoFactorForm } from "@/components/two-factor-form/TwoFactorForm";
import { useUser } from "@/contexts";
import { useThemeContext } from "@/hooks/useThemeContext";
import { cn } from "@/utils/helpers";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Button from "@/components/button/Button";
import { ROUTES } from "@/constants";
import { useDeactivateTwoFaMutation } from "@/hooks/queries/useDeactivateTwoFaMutation";

export const SettingsScreen = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const { theme } = useThemeContext();
  const { mutate } = useDeactivateTwoFaMutation();
  return (
    <div
      className={cn("flex-1  bg-primary-50", {
        "bg-dark": theme === "dark",
      })}
    >
      <div className="flex flex-col gap-10">
        <div
          onClick={() => navigate(ROUTES.PROFILE)}
          className="text-xs !opacity-65 flex items-center gap-2 cursor-pointer"
        >
          <ChevronLeft size={16} />
          <span>В профиль</span>
        </div>
        <h1 className="text-xl font-medium">Настройки</h1>
        <div
          className={cn(
            "grid gap-10 p-5 border shadow-sm mobile:grid-cols-1 desktop:grid-cols-1 bg-indicator-white rounded-xl",
            {
              "bg-dark-foreground border-dark": theme === "dark",
            }
          )}
        >
          <UploadAvatar />
          <div className="grid gap-10 mobile:grid-cols-1 desktop:grid-cols-2 ">
            <ChangeProfileForm />
            <ChangePasswordForm />

            {user?.two_factor ? (
              <Button
                icon={
                  <img
                    className="rounded-full"
                    src={TelegramLogo}
                    width={50}
                    height={50}
                    alt=""
                  />
                }
                onClick={mutate}
                title="Отключить 2FA"
                variant="ghost"
              />
            ) : (
              <TwoFactorForm />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
