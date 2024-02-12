import { useUser } from "@/contexts";
import { useProfileUpdateMutation } from "@/hooks/queries/useUpdateProfileMutation";
import { useForm } from "react-hook-form";
import { Input } from "../input/Input";
import Button from "../button/Button";

export const ChangeProfileForm = () => {
  const { user } = useUser();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty },
  } = useForm<UpdateUserField>({
    mode: "onChange",
  });
  const { mutate } = useProfileUpdateMutation();

  const updateHandler = handleSubmit((data) => {
    mutate(data);
  });
  return (
    <form className="flex flex-col w-full gap-10" onSubmit={updateHandler}>
      <Input
        label="Почта"
        placeholder={user?.email ? user.email : "Укажите почту"}
        type="email"
        {...register("email", {
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
        label="Имя пользователя"
        placeholder={user?.login ? user.login : "Укажите имя пользователя"}
        {...register("login", {
          minLength: {
            value: 3,
            message: "Имя пользователя должно содержать не менее 3 символов",
          },
        })}
        {...(errors.login && {
          error: !!errors.login.message,
          helperText: errors.login.message,
        })}
      />
      <Button
        type="submit"
        variant="ghost"
        title="Сохранить изменения"
        disabled={isDirty && !isValid}
      />
    </form>
  );
};
