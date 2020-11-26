import React from 'react';
import Head from 'next/head';

import CountryCard from '../components/CountryCard';

import styles from './index.module.scss';

function Home({ countries }) {
  return (
    <div className={styles.container}>
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

export const getServerSideProps = async () => {
  const res = await fetch('https://restcountries.eu/rest/v2/name/japan');
  const data = await res.json();

  if (!data) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      countries: data,
    },
  };
};

export default Home;
