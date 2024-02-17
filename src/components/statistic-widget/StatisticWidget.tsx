import { useThemeContext } from "@/hooks/useThemeContext";
import { cn } from "@/utils/helpers";

import { ProgresBar } from "../progress-bar/ProgresBar";

export const StatisticWidget = () => {
  const { theme } = useThemeContext();
  return (
    <div
      className={cn(
        "p-5 bg-indicator-white border rounded-xl flex flex-col gap-5 shadow-sm",
        {
          "bg-dark-foreground border-dark": theme === "dark",
        }
      )}
    >
      <h1 className="text-xl font-medium">Ваша статистика</h1>
      <div className="grid grid-cols-5 gap-10">
        <ProgresBar currentValue={1} totalValue={24} />
        <ProgresBar currentValue={15} totalValue={24} />
        <ProgresBar currentValue={5} totalValue={24} />
        <ProgresBar currentValue={19} totalValue={24} />
        <ProgresBar currentValue={11} totalValue={24} />
        <ProgresBar currentValue={9} totalValue={24} />
      </div>
    </div>
  );
};
