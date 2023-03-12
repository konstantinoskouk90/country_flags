export type RequestParams = { codes: string[] };
export type RequestQuery = void;
export type RequestPayload = void;
export type FullResponseBody = Array<{
  alpha3Code: string;
  name: string;
  independent: boolean;
}>;
export type ResponseBody = Array<{
  alpha3Code: string;
  name: string;
}>;
