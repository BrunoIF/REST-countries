import React from 'react';

import styles from './styles.module.scss';

function Input({
  value, onChange, placeholder, className, Icon,
}) {
  return (
    <div className={`${styles.input} ${className}`}>
      {!!Icon && (<span className={styles.icon}>{Icon}</span>)}
      <input onChange={onChange} type="text" placeholder={placeholder} value={value} />
    </div>
  );
}

export default Input;
