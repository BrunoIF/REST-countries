import React, { useState, useEffect } from "react";
import Head from "next/head";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import cn from "classnames";

import Input from "components/Input";
import CountryCard from "components/CountryCard";
import SelectList from "components/SelectList";
import {
  REGION_OPTIONS,
  DEFAULT_AMOUNT_COUNTRIES_TO_DISPLAY,
} from "constants/filters";
import Loader from "components/Loader";

import s from "styles/pages/index.module.scss";
import { useLazyFetch } from "hooks/useLazyFetch";
import { useDebounce } from "hooks/useDebounce";
import { useInfiniteScroll } from "hooks/useInfiniteScroll";
import { GetCountriesResponse } from "types/Api";

const baseArgs = { amount: DEFAULT_AMOUNT_COUNTRIES_TO_DISPLAY };

function Home() {
  const [page, setPage] = useState(1);
  const [region, setRegion] = useState("")
  const {
    fetch: fetchCountries,
    data,
    loading,
    error
  } = useLazyFetch<GetCountriesResponse>("/api/getCountries", { ...baseArgs, page });
  const [searchValue, setSearchValue] = useState("");
  const [countries, setCountries] = useState([])
  const debounceSearchValue = useDebounce(searchValue, 1000);
  const { ref } = useInfiniteScroll(() => { if (page < data.maxPages) { setPage(prev => prev + 1) } });
  const isEmpty = !countries.length;
  const isLoading = isEmpty && loading

  useEffect(() => {
    console.log({ page })
    fetchCountries({ ...baseArgs, page, filters: { name: debounceSearchValue || null, region } });
  }, [page, region, debounceSearchValue]);

  useEffect(() => {
    if (data) {
      setCountries(prev => ([...prev, ...data.countries]))
    }
  }, [data])

  useEffect(() => {
    setPage(1)
    setCountries([])
  }, [debounceSearchValue]);

  const handleRegionChange = (selectedRegion: string) => {
    setRegion(selectedRegion ?? "")
    setCountries([])
    setPage(1)
  };

  const renderResults = () => {
    if (isLoading) {
      return <Loader />
    }

    if (error) {
      return <p>Something went wrong. Try again later.</p>
    }

    if (isEmpty) {
      return <p>No results found, check your filters and try again.</p>
    }

    return countries.map((country) => (
      <CountryCard key={country.cca3} country={country} />
    ))
  }

  return (
    <>
      <Head>
        <title>REST Countries</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="container">
        <div className={s.filters}>
          <Input
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Search for a country..."
            value={searchValue}
            icon={<FontAwesomeIcon icon={faSearch} />}
          />

          <SelectList options={REGION_OPTIONS} onChange={handleRegionChange} />
        </div>

        <div className={cn(s.container, { [s.center]: isLoading || isEmpty })}>
          {renderResults()}
        </div>
        {!!countries.length && <div ref={ref} />}
      </div>
    </>
  );
}

export default Home;
