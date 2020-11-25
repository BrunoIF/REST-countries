import React from 'react';

import Info from '../Info';

import { formatNumber } from '../../utils';
import styles from './styles.module.scss';

function CountryCard({ country }) {
  const { name, flag, region, capital, population } = country;
  const formattedPopulation = formatNumber(population);

  return (
    <div className={styles.container}>
      <img src={flag}></img>
      <div className={styles.content}>
        <h3 className={styles.title}>{name}</h3>
        <Info title="Population" description={formattedPopulation} />
        <Info title="Region" description={region} />
        <Info title="Capital" description={capital} />
      </div>
    </div>
  );
}

export default CountryCard;
