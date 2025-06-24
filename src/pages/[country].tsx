import React from "react";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import Head from "next/head";

import { API_URL } from "constants/api";
import Info from "components/Info";
import LinkButton from "components/LinkButton";
import { formatNumber } from "utils";
import type { Country as CountryType } from 'types/Country'

import s from "styles/pages/country.module.scss";

function Country({ content }: { content: CountryType }) {
  const route = useRouter();

  if (route.isFallback) {
    return <h1>Loading...</h1>;
  }

  const {
    population,
    name: { common: name, nativeName },
    region,
    subregion,
    capital,
    tld: topLevelDomain,
    currencies,
    languages,
    flags,
    borderCountries,
  } = content;
  const formattedPopulation = formatNumber(population);
  const currenciesList = Object.values(currencies).map(
    (currency) => currency.name
  );
  const languagesList = Object.values(languages);
  const borderCountriesList = borderCountries.length
    ? borderCountries.map(({ common: country }) => (
      <LinkButton
        className={s.borderCountry}
        to={`/${country.toLowerCase()}`}
        text={country}
        key={country}
      />
    ))
    : null;

  return (
    <>
      <Head>
        <title>{name}</title>
      </Head>
      <div className={`container ${s.container}`}>
        <LinkButton to="/" text="Back" className={s.button} icon={<FontAwesomeIcon icon={faArrowLeft} />} />
        <div className={s.country}>
          <img className={s.flag} src={flags.png} alt={`${name}-flag`} />
          <div className={s.content}>
            <h1 className={s.title}>{name}</h1>
            <div className={s.contentContainer}>
              <div className={s.contentBlock}>
                <Info
                  className={s.text}
                  title="Native Name"
                  description={Object.values(nativeName)[0].common}
                />
                <Info
                  className={s.text}
                  title="Population"
                  description={formattedPopulation}
                />
                <Info className={s.text} title="Region" description={region} />
                <Info
                  className={s.text}
                  title="Sub Region"
                  description={subregion}
                />
                <Info
                  className={s.text}
                  title="Capital"
                  description={capital}
                />
              </div>
              <div className={s.contentBlock}>
                <Info
                  className={s.text}
                  title="Top Level Domain"
                  description={topLevelDomain[0]}
                />
                <Info
                  className={s.text}
                  title="Currencies"
                  description={currenciesList}
                />
                <Info
                  className={s.text}
                  title="Languages"
                  description={languagesList}
                />
              </div>
            </div>
            <div className={s.borderCountries}>
              <Info
                className={s.text}
                title="Border Countries"
                description={borderCountriesList}
              />
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
  const {
    params: { country },
  } = context;

  const response = await fetch(`${API_URL}/name/${country}?fullText=true`);
  const data = await response.json();

  if (!data) {
    return {
      notFound: true,
    };
  }

  let countryData = { ...data[0], borderCountries: [] };

  const borderCountries = data[0].borders?.join(",") || [];

  if (borderCountries.length) {
    const bordersResponse = await fetch(
      `${API_URL}/alpha?codes=${borderCountries}`
    );
    const bordersData = await bordersResponse.json();

    const borderCountriesNames = bordersData.map(
      (borderCountry) => borderCountry.name
    );
    countryData = { ...countryData, borderCountries: borderCountriesNames };
  }

  return {
    props: {
      content: countryData,
    },
  };
};

export default Country;
