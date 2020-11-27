import { makeVar } from '@apollo/client';

export const isDarkThemeVar = makeVar(false);

export const toggleTheme = () => {
  isDarkThemeVar(!isDarkThemeVar());
};
