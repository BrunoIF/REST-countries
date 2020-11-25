import React from 'react';

import Info from '../Info';

import { formatNumber } from '../../utils';
import styles from './styles.module.scss';

function CountryCard({ country }) {
  const {
    name, flag, region, capital, population,
  } = country;
  const formattedPopulation = formatNumber(population);

  return (
    <div className={styles.container}>
      <img src={flag} alt={`${name}-flag`} />
      <div className={styles.content}>
        <h3 className={styles.title}>{name}</h3>
        <Info className={styles.text} title="Population" description={formattedPopulation} />
        <Info className={styles.text} title="Region" description={region} />
        <Info className={styles.text} title="Capital" description={capital} />
      </div>
    </div>
  );
}

export default CountryCard;
