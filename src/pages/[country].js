import React from 'react';
import { useRouter } from 'next/router';
import Info from '../components/Info';
import LinkButton from '../components/LinkButton';

import styles from './country.module.scss';

import { formatNumber, getStringListOfAttr } from '../utils';

function Country({ content }) {
  console.log('content', content);
  const route = useRouter();
  
  if(route.isFallback) {
    return <h1>Loading...</h1>;
  }
  
  const { population, name, region, subregion, nativeName, capital, topLevelDomain, currencies, languages, flag } = content;
  const formattedPopulation = formatNumber(population);
  const currenciesList = getStringListOfAttr(currencies, 'name');
  const languagesList = getStringListOfAttr(languages, 'name');

  return (
    <div className={`container ${styles.container}`}>
      <LinkButton to="/" text="Back" className={styles.button} />
      <div className={styles.country}>
        <img className={styles.flag} src={flag} alt={`${name}-flag`} />
        <div className={styles.content}>
          <h1 className={styles.title}>{name}</h1>
          <div className={styles.contentContainer}>
            <div className={styles.contentBlock}>
              <Info className={styles.text} title="Native Name" description={nativeName}/>
              <Info className={styles.text} title="Population" description={formattedPopulation}/>
              <Info className={styles.text} title="Region" description={region}/>
              <Info className={styles.text} title="Sub Region" description={subregion}/>
              <Info className={styles.text} title="Capital" description={capital}/>
            </div>
            <div className={styles.contentBlock}>
              <Info className={styles.text} title="Top Level Domain" description={topLevelDomain[0]}/>
              <Info className={styles.text} title="Currencies" description={currenciesList}/>
              <Info className={styles.text} title="Languages" description={languagesList}/>
            </div>
          </div>
        </div>
      </div>
    </div>
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

  return {
    props: {
      content: data[0],
    },
  };
};

export default Country;
