import React from 'react';
import Head from 'next/head';

import styles from './index.module.scss';

import CountryCard from '../components/CountryCard';

function Home({ countries }) {
  return (
    <div className={`container ${styles.container}`}>
      <Head>
        <title>REST Countries</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {countries.map(country => (
        <CountryCard key={country.numericCode} country={country} />
      ))}

    </div>
  );
}

export const getStaticProps = async () => {
  const res = await fetch('https://restcountries.eu/rest/v2/all');
  const data = await res.json();

  if (!data) {
    return {
      notFound: true,
    };
  }

  const DEFAULT_AMOUNT_COUNTRIES_TO_DISPLAY = 15;
  const sortedByPopulation = data.sort((a, b) => b.population - a.population);
  const slicedData = sortedByPopulation.slice(0, DEFAULT_AMOUNT_COUNTRIES_TO_DISPLAY);

  return {
    props: {
      countries: slicedData,
    },
  };
};

export default Home;
