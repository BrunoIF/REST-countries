import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon } from "@fortawesome/free-regular-svg-icons";
import { faMoon as faMoonSolid } from "@fortawesome/free-solid-svg-icons";
import cn from "classnames";

import s from "./styles.module.scss";
import { useDarkTheme } from "@hooks/useDarkTheme";

function ThemeSwitcher({ text, type = "button", className }) {
  const { isDarkTheme, toggleTheme } = useDarkTheme();

  return (
    <button
      type="button"
      className={cn(s.themeSwitcher, className, {
        [s.text]: type === "text",
        [s.button]: type === "button",
      })}
      onClick={() => toggleTheme()}
    >
      {isDarkTheme ? (
        <FontAwesomeIcon icon={faMoonSolid} />
      ) : (
        <FontAwesomeIcon icon={faMoon} />
      )}
      {text}
    </button>
  );
}

export default ThemeSwitcher;
