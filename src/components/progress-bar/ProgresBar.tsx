import { useThemeContext } from "@/hooks/useThemeContext";
import { cn } from "@/utils/helpers";
import { useEffect, useState } from "react";
import { useSpring, animated } from "react-spring";
import styles from "./ProgressBar.module.scss";
import { CheckCircle2 } from "lucide-react";

interface ProgressBarProps {
  currentValue: number;
  totalValue: number;
}

const MAX_PROGRESS = 100;

export const ProgresBar = ({ currentValue, totalValue }: ProgressBarProps) => {
  const { theme } = useThemeContext();
  const [completedTasks, setCompletedTasks] = useState(0);
  const progress = (completedTasks / totalValue) * MAX_PROGRESS;
  const { number } = useSpring({
    from: { number: 0 },
    to: { number: completedTasks },
    delay: 150, // Задержка, чтобы анимация началась после заполнения прогресс-бара
  });
  useEffect(() => {
    setTimeout(() => {
      setCompletedTasks(currentValue);
    }, 150);
  }, [currentValue]);
  return (
    <div
      className={cn("p-5 border w-max rounded-xl flex flex-col gap-4", {
        "border-dark": theme === "dark",
      })}
    >
      <span
        className={cn(
          "text-5xl text-center font-bold select-none",
          styles.progress_value
        )}
        onClick={() => setCompletedTasks((prev) => ++prev)}
      >
        <animated.span>
          {number.interpolate((val) => Math.floor(val))}
        </animated.span>
        /{totalValue}
      </span>
      <span>Задач выполнено</span>
      <div
        className={cn(`w-full h-[6px] rounded-full bg-primary-50 border`, {
          "bg-dark border-dark": theme === "dark",
        })}
      >
        <div
          className={cn(
            "bg-indicator-error h-full  rounded-full flex items-center justify-center transition-all duration-500 ease-in-out",
            {
              "bg-yellow-400": progress >= 40,
              "bg-indicator-positive": progress >= 70,
            }
          )}
          style={{ width: progress + "%" }}
        >
          {progress === 100 && (
            <CheckCircle2
              className={cn("px-1 bg-indicator-white text-indicator-positive", {
                "bg-dark-foreground": theme === "dark",
              })}
              size={30}
            />
          )}
        </div>
      </div>
    </div>
  );
};
