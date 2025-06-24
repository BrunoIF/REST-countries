import { DarkThemeContext } from "context/DarkThemeContext";
import { useContext } from "react";

export function useDarkTheme() {
  const { isDarkTheme, setIsDarkTheme } = useContext(DarkThemeContext);

  const toggleTheme = () => {
    setIsDarkTheme((prev) => !prev);
  };

  return { isDarkTheme, toggleTheme };
}
