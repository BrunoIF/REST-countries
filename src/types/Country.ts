type CountryName = {
  common: string;
  official: string;
  nativeName?: Record<string, CountryName>;
};

export interface CountryThumbnail {
  population: number;
  name: CountryName;
  region: string;
  capital?: string[];
  // 3 Letter Country Code
  cca3: string;
  cca2: string;
  flags: {
    png: string;
    svg: string;
    alt: string;
  };
}

export interface Country extends CountryThumbnail {
  tld: string[];
  currencies?: Record<string, { symbol: string; name: string }>;
  altSpellings: string[];
  region: string;
  subregion: string;
  languages?: Record<string, string>;
  borders: string[];
  area: number;
  continents: string[];
  borderCountries?: CountryName[];
}
