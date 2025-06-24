import { isDarkThemeVar, toggleTheme, setDarkTheme } from "lib/apolloStates";
import { useReactiveVar } from "@apollo/client";

export function useDarkTheme() {
  const isDarkTheme = useReactiveVar(isDarkThemeVar);

  return {
    setDarkTheme,
    toggleTheme,
    isDarkTheme,
  };
}
