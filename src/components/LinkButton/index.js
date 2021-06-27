import React from "react";
import Link from "next/link";

import s from "./styles.module.scss";

function LinkButton({ to, text, className, Icon }) {
  return (
    <div className={`${s.buttonContainer} ${className}`}>
      <Link href={to}>
        <a className={s.button}>
          {!!Icon && <span className={s.icon}>{Icon}</span>}
          {text}
        </a>
      </Link>
    </div>
  );
}

export default LinkButton;
