import { useChangePasswordMutation } from "@/hooks/queries/useChangePasswordMutation";
import { useForm } from "react-hook-form";
import { Input } from "../input/Input";
import Button from "../button/Button";
import { useUser } from "@/contexts";

const ChangePasswordForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty },
  } = useForm<ChangePasswordFields>({
    mode: "onChange",
  });
  const { user } = useUser();
  const { mutate: changePasswordMutate } = useChangePasswordMutation();
  const changePasswordHandler = handleSubmit((data) => {
    changePasswordMutate(data);
  });
  return (
    <form
      className="flex flex-col w-full gap-10"
      onSubmit={changePasswordHandler}
    >
      <Input
        label="Текущий пароль"
        type="password"
        {...register("old_password", {
          required: {
            value: true,
            message: "Поле обязательно к заполнению",
          },
        })}
        {...(errors.old_password && {
          error: !!errors.old_password.message,
          helperText: errors.old_password.message,
        })}
      />
      <Input
        label="Новый пароль"
        type="password"
        {...register("new_password", {
          minLength: {
            value: 6,
            message: "Пароль должен содержать не менее 6 символов",
          },
          required: {
            value: true,
            message: "Поле обязательно к заполнению",
          },
        })}
        {...(errors.new_password && {
          error: !!errors.new_password.message,
          helperText: errors.new_password.message,
        })}
      />
      <Button
        type="submit"
        variant="ghost"
        title="Сменить пароль"
        disabled={isDirty && !isValid}
      />
      <span className="text-xs !opacity-40 mobile:text-center desktop:text-right">
        Ваш ID аккаунта: {user?.id}
      </span>
    </form>
  );
};

export default ChangePasswordForm;
