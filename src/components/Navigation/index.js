import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon } from "@fortawesome/free-regular-svg-icons";
import { faMoon as faMoonSolid } from "@fortawesome/free-solid-svg-icons";

import { useReactiveVar } from "@apollo/client";
import { toggleTheme, isDarkThemeVar } from "lib/apolloStates";

import styles from "./styles.module.scss";
import { isMobile } from "utils";

function Navigation() {
  const isDarkTheme = useReactiveVar(isDarkThemeVar);

  return (
    <>
      <div className={styles.container}>
        <h1 className={styles.title}>Where in the world?</h1>
        {!isMobile() && (
          <button
            type="button"
            className={styles.themeSwitcher}
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
          className={styles.themeSwitcher}
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
