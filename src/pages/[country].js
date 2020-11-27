import React from 'react';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import Head from 'next/head';

import Info from '../components/Info';
import LinkButton from '../components/LinkButton';
import { formatNumber, getStringListOfAttr } from '../utils';

import styles from './country.module.scss';

function Country({ content }) {
  const route = useRouter();

  if (route.isFallback) {
    return <h1>Loading...</h1>;
  }

  const {
    population,
    name,
    region,
    subregion,
    nativeName,
    capital,
    topLevelDomain,
    currencies,
    languages,
    flag,
    borderCountries,
  } = content;
  const formattedPopulation = formatNumber(population);
  const currenciesList = getStringListOfAttr(currencies, 'name');
  const languagesList = getStringListOfAttr(languages, 'name');
  const borderCountriesList = borderCountries.length
    ? borderCountries.map(country => (
      <LinkButton
        className={styles.borderCountry}
        to={`/${country.toLowerCase()}`}
        text={country}
        key={country}
      />
    ))
    : null;
  const backArrow = <FontAwesomeIcon icon={faArrowLeft} />;

  return (
    <>
      <Head>
        <title>{name}</title>
      </Head>
      <div className={`container ${styles.container}`}>
        <LinkButton to="/" text="Back" className={styles.button} Icon={backArrow} />
        <div className={styles.country}>
          <img className={styles.flag} src={flag} alt={`${name}-flag`} />
          <div className={styles.content}>
            <h1 className={styles.title}>{name}</h1>
            <div className={styles.contentContainer}>
              <div className={styles.contentBlock}>
                <Info className={styles.text} title="Native Name" description={nativeName} />
                <Info className={styles.text} title="Population" description={formattedPopulation} />
                <Info className={styles.text} title="Region" description={region} />
                <Info className={styles.text} title="Sub Region" description={subregion} />
                <Info className={styles.text} title="Capital" description={capital} />
              </div>
              <div className={styles.contentBlock}>
                <Info className={styles.text} title="Top Level Domain" description={topLevelDomain[0]} />
                <Info className={styles.text} title="Currencies" description={currenciesList} />
                <Info className={styles.text} title="Languages" description={languagesList} />
              </div>
            </div>
            <div className={styles.borderCountries}>
              <Info className={styles.text} title="Border Countries" description={borderCountriesList} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export const getStaticPaths = async () => ({
  paths: [],
  fallback: true,
});

export const getStaticProps = async (context) => {
  const { params: { country } } = context;

  const response = await fetch(`https://restcountries.eu/rest/v2/name/${country}`);
  const data = await response.json();

  if (!data) {
    return {
      notFound: true,
    };
  }

  let countryData = { ...data[0], borderCountries: [] };

  const borderCountries = data[0].borders?.join(';') || [];

  if (borderCountries.length) {
    const bordersResponse = await fetch(`https://restcountries.eu/rest/v2/alpha?codes=${borderCountries}`);
    const bordersData = await bordersResponse.json();

    const borderCountriesNames = bordersData.map(borderCountry => borderCountry.name);
    countryData = { ...countryData, borderCountries: borderCountriesNames };
  }

  return {
    props: {
      content: countryData,
    },
  };
};

export default Country;
