import Bug from "@/assets/bug.svg";
import Button from "@/components/button/Button";
import { useNavigate, useRouteError } from "react-router-dom";

export const ErrorScreen = () => {
  const error = useRouteError();
  const navigate = useNavigate();
  console.log(error);
  return (
    <div className="flex flex-col items-center justify-center w-full h-full gap-5 bg-primary-50">
      <img src={Bug} alt="" width={100} height={100} />
      <h1 className="text-lg font-semibold !opacity-80">
        Возникла непредвиденная ошибка
      </h1>
      <span className="text-red-500">{String(error)}</span>
      <Button
        size="xs"
        variant="ghost"
        title="Вернуться на главную"
        onClick={() => navigate("/")}
      />
    </div>
  );
};
