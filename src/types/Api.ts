import { CountryThumbnail } from "./Country";

export interface GetCountriesResponse {
  countries: CountryThumbnail[];
  page: number;
  maxPages: number;
  limit: number;
  amount: number;
}
