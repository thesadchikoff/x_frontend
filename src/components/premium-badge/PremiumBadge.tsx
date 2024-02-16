import Status from "@/assets/status.gif";
import { useUser } from "@/contexts";
import { useEffect, useState } from "react";
import { ContextStatus } from "../context-status/ContextStatus";
import ErrorBoundary from "../error/ErrorBoundary";

export const PremiumBadge = () => {
  const { user } = useUser();
  const [isOpenContext, setIsOpenContext] = useState(false);

  useEffect(() => {
    // Добавляем обработчик клика на весь документ
    document.addEventListener("click", handleClickOutside);
    // Добавляем обработчик нажатия на клавишу Escape
    document.addEventListener("keydown", handleEscape);

    return () => {
      // Удаляем обработчики при размонтировании компонента
      document.removeEventListener("click", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const handleClickOutside = (event) => {
    // Проверяем, является ли цель события потомком компонента ContextStatus
    if (!event.target.closest(".context-status")) {
      setIsOpenContext(false);
    }
  };

  const handleEscape = (event) => {
    if (event.key === "Escape") {
      setIsOpenContext(false);
    }
  };

  const handleImgClick = () => {
    setIsOpenContext(!isOpenContext);
  };
  if (!user?.is_premium) {
    return null;
  }
  return (
    <div className="relative" onClick={(e) => e.stopPropagation()}>
      <img
        src={import.meta.env.VITE_API_URL + "/" + user.status?.path}
        alt=""
        className="cursor-pointer w-[30px] h-[30px] object-contain"
        onClick={handleImgClick}
      />
      {isOpenContext && (
        <ErrorBoundary>
          <ContextStatus />
        </ErrorBoundary>
      )}
    </div>
  );
};
