import React from "react";

import s from "./styles.module.scss";
import { isMobile } from "utils";
import ThemeSwitcher from "@components/ThemeSwitcher";

function Navigation() {
  return (
    <>
      <div className={s.container}>
        <h1 className={s.title}>Where in the world?</h1>
        {!isMobile() && <ThemeSwitcher text="Dark Mode" type="text" />}
      </div>
      {isMobile() && <ThemeSwitcher className={s.themeSwitcher} />}
    </>
  );
}

export default Navigation;
