import React, { useState, useEffect } from "react";
import Head from "next/head";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import cn from "classnames";
import { useReactiveVar } from "@apollo/client";

import { isDarkThemeVar } from "lib/apolloStates";
import Input from "components/Input";
import CountryCard from "components/CountryCard";
import SelectList from "components/SelectList";
import {
  REGION_OPTIONS,
  DEFAULT_AMOUNT_COUNTRIES_TO_DISPLAY,
} from "@constants";

import styles from "./index.module.scss";

function Home({ countries }) {
  const [searchValue, setSearchValue] = useState("");
  const [countriesContent, setCountriesContent] = useState([]);
  const searchIcon = <FontAwesomeIcon icon={faSearch} />;
  const isDarkTheme = useReactiveVar(isDarkThemeVar);

  const setMostPopulousCountries = () => {
    const sortedByPopulation = countries.sort(
      (a, b) => b.population - a.population
    );
    const countriesToDisplay = sortedByPopulation.slice(
      0,
      DEFAULT_AMOUNT_COUNTRIES_TO_DISPLAY
    );
    setCountriesContent(countriesToDisplay);
  };

  useEffect(() => {
    setMostPopulousCountries();
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
      setMostPopulousCountries();
    }
  }, [searchValue]);

  const handleRegionChange = (selectedRegion) => {
    if (selectedRegion) {
      const filteredCountries = countries.filter(
        (country) => country.region === selectedRegion
      );
      setCountriesContent(filteredCountries);
    } else {
      setMostPopulousCountries();
    }
  };

  return (
    <>
      <Head>
        <title>REST Countries</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={cn("container", { [styles.dark]: isDarkTheme })}>
        <div className={styles.filters}>
          <Input
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Search for a country..."
            value={searchValue}
            Icon={searchIcon}
          />

          <SelectList options={REGION_OPTIONS} onChange={handleRegionChange} />
        </div>

        <div className={styles.container}>
          {countriesContent.map((country) => (
            <CountryCard key={country.numericCode} country={country} />
          ))}
        </div>
      </div>
    </>
  );
}

export const getStaticProps = async () => {
  const res = await fetch(
    "https://restcountries.eu/rest/v2/all?filter=name;capital;population;flag;region;numericCode"
  );
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
