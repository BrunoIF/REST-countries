import React from 'react';
import Link from 'next/link';

import styles from './styles.module.scss';

function LinkButton({ to, text, className }) {

  return (
    <div className={`${styles.buttonContainer} ${className}`}>
      <Link href={to}>
        <a className={styles.button}>{text}</a>
      </Link>
    </div>
  );
}

export default LinkButton;
