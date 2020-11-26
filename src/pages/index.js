import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

import styles from './index.module.scss';

import Input from '../components/Input';
import CountryCard from '../components/CountryCard';

function Home({ countries }) {
  const [searchValue, setSearchValue] = useState('');
  const [countriesContent, setCountriesContent] = useState([]);
  const searchIcon = <FontAwesomeIcon icon={faSearch} />;
  const DEFAULT_AMOUNT_COUNTRIES_TO_DISPLAY = 15;

  const getMostPopulous = () => {
    const sortedByPopulation = countries.sort((a, b) => b.population - a.population);
    return sortedByPopulation.slice(0, DEFAULT_AMOUNT_COUNTRIES_TO_DISPLAY);
  };

  useEffect(() => {
    const topPopulousCountries = getMostPopulous();
    setCountriesContent(topPopulousCountries);
  }, []);

  useEffect(() => {
    if (searchValue) {
      const filteredCountries = countries.filter(({ name }) => {
        const lowerCaseSearchValue = searchValue.toLowerCase();
        const lowerCaseCountryName = name.toLowerCase();
        return lowerCaseCountryName.includes(lowerCaseSearchValue);
      });
      setCountriesContent(filteredCountries);
    } else {
      const topPopulousCountries = getMostPopulous();
      setCountriesContent(topPopulousCountries);
    }
  }, [searchValue]);

  return (
    <>
      <Head>
        <title>REST Countries</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="container">
        <Input className={styles.input} onChange={e => setSearchValue(e.target.value)} placeholder="Search for a country..." value={searchValue} Icon={searchIcon} />

        <div className={`${styles.container}`}>
          {countriesContent.map(country => (
            <CountryCard key={country.numericCode} country={country} />
          ))}

        </div>
      </div>

    </>
  );
}

export const getStaticProps = async () => {
  const res = await fetch('https://restcountries.eu/rest/v2/all?filter=name;capital;population;flag;region');
  const data = await res.json();

  if (!data) {
    return {
      notFound: true,
    };
  }

  // const DEFAULT_AMOUNT_COUNTRIES_TO_DISPLAY = 15;
  // const sortedByPopulation = data.sort((a, b) => b.population - a.population);
  // const slicedData = sortedByPopulation.slice(0, DEFAULT_AMOUNT_COUNTRIES_TO_DISPLAY);

  return {
    props: {
      countries: data,
    },
  };
};

export default Home;
