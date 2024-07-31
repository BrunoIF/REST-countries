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
} from "@constants";
import Loader from "components/Loader";

import s from "styles/pages/index.module.scss";
import { useLazyFetch } from "@hooks/useLazyFetch";
import { useDebounce } from "@hooks/useDebounce";

const baseArgs = { amount: DEFAULT_AMOUNT_COUNTRIES_TO_DISPLAY };

function Home() {
  const [page, setPage] = useState(1);
  const [requestArgs, setRequestArgs] = useState({
    ...baseArgs,
    page,
  });
  const {
    fetch: fetchCountries,
    data,
    loading,
  } = useLazyFetch("/api/getCountries", requestArgs);
  const [searchValue, setSearchValue] = useState("");
  const debounceSearchValue = useDebounce(searchValue, 1000);
  const [countriesContent, setCountriesContent] = useState([]);
  const searchIcon = <FontAwesomeIcon icon={faSearch} />;

  useEffect(() => {
    setRequestArgs({ ...requestArgs, page });
    fetchCountries(requestArgs);
  }, [page]);

  useEffect(() => {
    if (data) {
      setCountriesContent(data?.data?.countries ?? []);
    }
  }, [data]);

  useEffect(() => {
    fetchCountries({
      ...requestArgs,
      page: 1,
      filters: { ...requestArgs.filters, name: searchValue ?? null },
    });
  }, [debounceSearchValue]);

  const handleRegionChange = (selectedRegion) => {
    if (selectedRegion) {
      const regionRequest = {
        ...requestArgs,
        filters: {
          ...requestArgs.filters,
          region: selectedRegion,
        },
      };
      setRequestArgs(regionRequest);

      if (page === 1) {
        fetchCountries(regionRequest);
      } else {
        setPage(1);
      }
    } else {
      setRequestArgs(baseArgs);
      if (page === 1) {
        fetchCountries({ ...baseArgs, page });
      } else {
        setPage(1);
      }
    }
  };

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
            Icon={searchIcon}
          />

          <SelectList options={REGION_OPTIONS} onChange={handleRegionChange} />
        </div>

        <div className={cn(s.container, { [s.center]: loading })}>
          {loading ? (
            <Loader />
          ) : (
            countriesContent.map((country) => (
              <CountryCard key={country.numericCode} country={country} />
            ))
          )}
        </div>
      </div>
    </>
  );
}

export default Home;
