import { Link } from "react-router-dom";
import { Input } from "..";
import Button from "../button/Button";
import { useForm } from "react-hook-form";
import { useActivateTwoFaMutation } from "@/hooks/queries/useActivateTwoFaMutation";

export const TwoFactorForm = () => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { isDirty, isValid, errors },
  } = useForm<{ tg_code: string }>({
    mode: "onChange",
  });
  const { mutate } = useActivateTwoFaMutation();
  const onSubmit = handleSubmit((data) => {
    mutate(data.tg_code);
    reset();
  });
  return (
    <form className="flex flex-col gap-3" onSubmit={onSubmit}>
      <div>
        <h2>2FA via Telegram</h2>
        <p className="text-xs !opacity-60">
          Укажите в поле ниже Ваш ID Telegram. Узнать его вы можете через{" "}
          <Link
            className="text-brand !opacity-100 underline"
            target="_blank"
            to={"https://t.me/getmyid_bot"}
          >
            ID Bot
          </Link>
          . После подтверждения к Вашему аккаунту будет подключена 2FA
        </p>
      </div>
      <Input
        {...register("tg_code", {
          required: true,
          pattern: /^\d+$/,
        })}
        {...(errors.tg_code && {
          error: !!errors.tg_code,
        })}
      />
      <Button
        title="Подтвердить"
        disabled={isDirty && !isValid}
        variant="ghost"
        type="submit"
      />
    </form>
  );
};
