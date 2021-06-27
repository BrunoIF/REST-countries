import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon } from "@fortawesome/free-regular-svg-icons";
import { faMoon as faMoonSolid } from "@fortawesome/free-solid-svg-icons";

import s from "./styles.module.scss";
import { isMobile } from "utils";
import { useDarkTheme } from "@hooks/useDarkTheme";

function Navigation() {
  const { isDarkTheme, toggleTheme } = useDarkTheme();

  return (
    <>
      <div className={s.container}>
        <h1 className={s.title}>Where in the world?</h1>
        {!isMobile() && (
          <button
            type="button"
            className={s.themeSwitcher}
            onClick={() => toggleTheme()}
          >
            {isDarkTheme ? (
              <FontAwesomeIcon icon={faMoonSolid} />
            ) : (
              <FontAwesomeIcon icon={faMoon} />
            )}
            Dark Mode
          </button>
        )}
      </div>
      {isMobile() && (
        <button
          type="button"
          className={s.themeSwitcher}
          onClick={() => toggleTheme()}
        >
          {isDarkTheme ? (
            <FontAwesomeIcon icon={faMoonSolid} />
          ) : (
            <FontAwesomeIcon icon={faMoon} />
          )}
        </button>
      )}
    </>
  );
}

export default Navigation;
