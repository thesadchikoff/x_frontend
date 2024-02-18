import { AuthServerError } from "@/api/api.types";
import Coin from "@/assets/gem.png";
import Button from "@/components/button/Button";
import { Input } from "@/components/input/Input";
import { SendCodeView } from "@/components/send-code-view/SendCodeView";
import { QUERYE_KEYS } from "@/constants";
import { useUser } from "@/contexts";
// import { useAuthMutation } from "@/hooks/queries/useAuthMutation";
import { useThemeContext } from "@/hooks/useThemeContext";
import userService from "@/services/user/user.service";
import { cn } from "@/utils/helpers";
import { useMutation } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const LoginScreen = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { setUser } = useUser();
  const [view, setView] = useState<"login" | "code">("login");
  const { from } = location.state || { from: { pathname: "/" } };
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty },
  } = useForm<AuthAndRegisterFormField>({
    mode: "onChange",
  });
  const { mutate, isPending, context } = useMutation<
    AuthResponse,
    AuthServerError,
    AuthAndRegisterFormField
  >({
    mutationKey: [QUERYE_KEYS.LOGIN],
    mutationFn: userService.login,

    onSuccess(data) {
      if (data?.message) {
        toast.success("Success", {
          description: data.message,
        });
        setView("code");
        return;
      }
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
  const loginSubmit = handleSubmit(({ email, password }) => {
    mutate({ email, password });
    console.log(context);
  });
  const { theme } = useThemeContext();
  return (
    <>
      {view === "login" && (
        <div
          className={cn(
            "flex flex-col items-center justify-center flex-1 gap-10 bg-primary-50",
            { "bg-dark": theme === "dark" }
          )}
        >
          <img src={Coin} width={200} height={200} />
          <h1 className="text-lg font-semibold">Вход в систему</h1>
          <form
            className="flex flex-col gap-5 w-[300px]"
            onSubmit={loginSubmit}
          >
            <Input
              placeholder="Почта"
              type="email"
              {...register("email", {
                required: {
                  value: true,
                  message: "Это поле является обязательным",
                },
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Почта указана некорректно",
                },
              })}
              {...(errors.email && {
                error: !!errors.email.message,
                helperText: errors.email.message,
              })}
            />
            <Input
              placeholder="Пароль"
              type="password"
              {...register("password", {
                required: {
                  value: true,
                  message: "Это поле является обязательным",
                },
              })}
              {...(errors.password && {
                error: !!errors.password.message,
                helperText: errors.password.message,
              })}
            />
            <Button
              type="submit"
              title="Войти"
              disabled={(isDirty && !isValid) || isPending}
              size="md"
              icon={isPending && <Loader2 className="animate-spin" />}
            />

            <span
              className={cn("text-xs text-center text-secondary", {
                "text-indicator-medium": theme === "dark",
              })}
            >
              Нет аккаунта?{" "}
              <Link className="font-semibold text-brand" to={"/register"}>
                Зарегистрируйся
              </Link>
            </span>
          </form>
        </div>
      )}
      {view === "code" && <SendCodeView />}
    </>
  );
};

export default LoginScreen;
