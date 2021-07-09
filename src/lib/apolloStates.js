import { makeVar } from "@apollo/client";

export const isDarkThemeVar = makeVar(false);

export const toggleTheme = () => {
  isDarkThemeVar(!isDarkThemeVar());
};

export const setDarkTheme = (value) => {
  isDarkThemeVar(value);
};
