import React from "react";
import Link from "next/link";

import s from "./styles.module.scss";

interface Props {
  to: string;
  text: string;
  className?: string;
  icon?: React.ReactNode
}

function LinkButton({ to, text, className, icon }: Props) {
  return (
    <div className={`${s.buttonContainer} ${className}`}>
      <Link href={to}>
        <a className={s.button}>
          {!!icon && <span className={s.icon}>{icon}</span>}
          {text}
        </a>
      </Link>
    </div>
  );
}

export default LinkButton;
