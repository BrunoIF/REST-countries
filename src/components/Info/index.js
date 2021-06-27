import React from "react";

import s from "./styles.module.scss";

function Info({ className, title, description }) {
  return (
    <p className={className}>
      <span className={s.title}>{`${title}: `}</span>
      {description || "-"}
    </p>
  );
}

export default Info;
