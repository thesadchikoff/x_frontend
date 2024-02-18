import React, { useState } from "react";

type ThemeContextType = {
  theme: "dark" | "light";
  toggleTheme: () => void;
};

export const ThemeContext = React.createContext<ThemeContextType>({
  theme: "dark",
  toggleTheme: () => null,
});

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const storedTheme = localStorage.getItem("theme");
  const cuurentTheme = storedTheme ? (storedTheme as "dark" | "light") : "dark";

  const [theme, setTheme] = useState(cuurentTheme);

  const toggleTheme = () => {
    setTheme((prevTheme) => {
      const newTheme = prevTheme === "light" ? "dark" : "light";
      localStorage.setItem("theme", newTheme);

      return newTheme;
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <main className={`${theme}  flex flex-col w-full h-full overflow-hidden`}>
        {children}
      </main>
    </ThemeContext.Provider>
  );
};
