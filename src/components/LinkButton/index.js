import React from 'react';
import Link from 'next/link';

import styles from './styles.module.scss';

function LinkButton({
  to, text, className, Icon,
}) {
  return (
    <div className={`${styles.buttonContainer} ${className}`}>
      <Link href={to}>
        <a className={styles.button}>
          {!!Icon && (<span className={styles.icon}>{Icon}</span>)}
          {text}
        </a>
      </Link>
    </div>
  );
}

export default LinkButton;
