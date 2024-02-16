import { useThemeContext } from "@/hooks/useThemeContext";
import { cn } from "@/utils/helpers";

const HomeScreen = () => {
  const { theme } = useThemeContext();
  return (
    <div className="h-full py-10 ">
      <div className="container flex flex-col gap-10">
        <div
          className={cn(
            "relative flex flex-col justify-center w-full gap-5 p-5 bg-white border rounded-xl",
            {
              "bg-dark-foreground border-dark": theme === "dark",
            }
          )}
        >
          <h1 className="font-medium mobile:text-md tablet:text-xl">
            Освой своё время: Задачи становятся возможностями
          </h1>
          <span className="z-10 text-indicator-medium mobile:text-xs tablet:text-[14px]">
            Приветствуем вас в мире возможностей! Ваше время - ваш ресурс,
            который можно мудро использовать. Давайте превратим ваши ежедневные
            задачи в шаги к вашим мечтам. Улучшайте продуктивность, достигайте
            целей и создавайте своё будущее с нашим приложением для планирования
            задач. Давайте сделаем каждый день значимым - день, когда вы
            реализуете свой потенциал. Присоединяйтесь сейчас и начните
            преобразование!
          </span>
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
