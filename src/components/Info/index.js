import React from 'react';

import styles from './styles.module.scss';

function Info({ className, title, description }) {

  return (
    <p className={className}>
      <span className={styles.title}>{title}: </span>
      {description}
    </p>
  );
}

export default Info;
