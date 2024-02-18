import { Input } from "..";
import { cn } from "@/utils/helpers";
import { useThemeContext } from "@/hooks/useThemeContext";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { QUERYE_KEYS } from "@/constants";
import userService from "@/services/user/user.service";
import { useUser } from "@/contexts";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { AuthServerError } from "@/api/api.types";

export const SendCodeView = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { setUser } = useUser();
  const { from } = location.state || { from: { pathname: "/" } };
  const { theme } = useThemeContext();
  const { mutate } = useMutation<
    AuthResponse,
    AuthServerError,
    { code: string }
  >({
    mutationKey: [QUERYE_KEYS.SEND_CODE],
    mutationFn: userService.loginWithCode,
    onSuccess(data) {
      localStorage.setItem("token", data.accessToken);
      setUser(data.user);
      navigate(from);
      toast.success("Success", {
        description: `${data.user.email}, вы успешно авторизовались`,
      });
    },
    onError(error) {
      console.log(error);
      toast.error("Error", {
        description: error.response.data.message,
      });
    },
  });
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<{ code: string }>({
    mode: "all",
  });
  const onSubmit = handleSubmit((data) => {
    mutate(data);
    reset();
  });
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center flex-1 gap-10 bg-primary-50",
        { "bg-dark": theme === "dark" }
      )}
    >
      <form onSubmit={onSubmit} className="flex flex-col gap-5 w-[400px]">
        <span>Введите код отправленный в телеграм</span>
        <Input
          placeholder="Код"
          className="w-full"
          {...register("code", {
            required: true,
            pattern: /^\d+$/,
            minLength: 4,
            maxLength: 4,
          })}
          {...(errors.code && {
            error: !!errors.code,
          })}
        />
      </form>
    </div>
  );
};
