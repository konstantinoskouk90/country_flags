export type RequestParams = { alpha3Code: string };
export type RequestQuery = void;
export type RequestPayload = void;
export type FullResponseBody = {
  borders: string[];
  capital: string;
  currencies: Array<{ code: string; name: string; symbol: string }>;
  flag: string;
  languages: Array<{
    iso639_1: string;
    iso639_2: string;
    name: string;
    nativeName: string;
  }>;
  name: string;
  nativeName: string;
  population: number;
  region: string;
  subregion: string;
  topLevelDomain: string[];
};
export type ResponseBody = {
  borders: string[];
  capital: string;
  currenciesName: string[];
  flag: string;
  languagesName: string[];
  name: string;
  nativeName: string;
  population: number;
  region: string;
  subregion: string;
  topLevelDomain: string[];
};
