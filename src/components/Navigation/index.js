import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon } from '@fortawesome/free-regular-svg-icons';
import { faMoon as faMoonSolid } from '@fortawesome/free-solid-svg-icons';
import { useQuery } from '@apollo/client';

import { toggleTheme, GET_IS_DARK_THEME } from '../../lib/apollo';

import styles from './styles.module.scss';

function Navigation() {
  const { data: { isDarkTheme } } = useQuery(GET_IS_DARK_THEME);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Where in the world?</h1>
      <button type="button" className={styles.themeSwitcher} onClick={() => toggleTheme()}>
        {isDarkTheme ? (
          <FontAwesomeIcon icon={faMoonSolid} />
        ) : (
          <FontAwesomeIcon icon={faMoon} />
        )}
        Dark Mode
      </button>
    </div>
  );
}

export default Navigation;
