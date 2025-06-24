import React from "react";

import s from "./styles.module.scss";

interface Props {
  value: string,
  placeholder?: string,
  className?: string,
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  icon: React.ReactNode
}

function Input({ value, onChange, placeholder, className, icon }: Props) {
  return (
    <div className={`${s.input} ${className}`}>
      {!!icon && <span className={s.icon}>{icon}</span>}
      <input
        name={placeholder}
        onChange={onChange}
        type="text"
        placeholder={placeholder}
        value={value}
      />
    </div>
  );
}

export default Input;
