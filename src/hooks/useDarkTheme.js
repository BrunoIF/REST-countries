import { isDarkThemeVar, toggleTheme } from "lib/apolloStates";
import { useReactiveVar } from "@apollo/client";

export function useDarkTheme() {
  const isDarkTheme = useReactiveVar(isDarkThemeVar);

  return { toggleTheme, isDarkTheme };
}
