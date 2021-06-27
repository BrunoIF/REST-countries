import React from "react";

import s from "./styles.module.scss";

function Input({ value, onChange, placeholder, className, Icon }) {
  return (
    <div className={`${s.input} ${className}`}>
      {!!Icon && <span className={s.icon}>{Icon}</span>}
      <input
        onChange={onChange}
        type="text"
        placeholder={placeholder}
        value={value}
      />
    </div>
  );
}

export default Input;
