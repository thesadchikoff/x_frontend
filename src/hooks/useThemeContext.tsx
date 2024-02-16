import { ThemeContext } from "@/providers/ThemeProvider";
import { useContext } from "react";

export const useThemeContext = () => useContext(ThemeContext);
