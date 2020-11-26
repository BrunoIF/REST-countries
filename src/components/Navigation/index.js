import React from 'react';

import styles from './styles.module.scss';

function Navigation() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Where in the world?</h1>
      <p className={styles.themeSwitcher}>Dark Mode</p>
    </div>
  );
}

export default Navigation;
