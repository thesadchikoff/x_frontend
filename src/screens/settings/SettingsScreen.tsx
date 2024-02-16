import { ChangeProfileForm, UploadAvatar } from "@/components";
import ChangePasswordForm from "@/components/change-password-form/ChangePasswordForm";
import { useThemeContext } from "@/hooks/useThemeContext";
import { cn } from "@/utils/helpers";

export const SettingsScreen = () => {
  const { theme } = useThemeContext();
  return (
    <div
      className={cn("flex-1 py-10 bg-primary-50", {
        "bg-dark": theme === "dark",
      })}
    >
      <div className="container flex flex-col gap-10">
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
          </div>
        </div>
      </div>
    </div>
  );
};
