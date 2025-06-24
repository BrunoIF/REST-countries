import React from "react";

import s from "./styles.module.scss";

interface Props {
  className?: string;
  title: string;
  description: string | React.ReactNode;
}

function Info({ className, title, description }: Props) {
  return (
    <p className={className}>
      <span className={s.title}>{`${title}: `}</span>
      {description || "-"}
    </p>
  );
}

export default Info;
