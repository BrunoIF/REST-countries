import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon } from '@fortawesome/free-regular-svg-icons';

import styles from './styles.module.scss';

function Navigation() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Where in the world?</h1>
      <p className={styles.themeSwitcher}>
        <FontAwesomeIcon icon={faMoon} /> Dark Mode
      </p>
    </div>
  );
}

export default Navigation;
