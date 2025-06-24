import React from "react";
import s from "./styles.module.scss";

function Loader() {
  return (
    <svg className={s.loader} width="100" height="100">
      <rect x="15" y="26.5" width="18" height="47" />
      <rect x="41" y="26.5" width="18" height="47" />
      <rect x="67" y="26.5" width="18" height="47" />
    </svg>
  );
}

export default Loader;
