export type RequestParams = void;
export type RequestQuery = void;
export type RequestPayload = void;
export type FullResponseBody = Array<{
  alpha3Code: string;
  flag: string;
  capital: string;
  name: string;
  population: number;
  region: string;
  independent: boolean;
}>;
export type ResponseBody = Array<{
  alpha3Code: string;
  flag: string;
  capital: string;
  name: string;
  population: number;
  region: string;
}>;
