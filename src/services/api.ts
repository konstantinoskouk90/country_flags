import { Api } from 'types';
import HttpService from './http';

const API_BASE_URL = 'https://restcountries.com';
const API_VERSION = 'v2';

class ApiService {
  static async getAllCountries(): Promise<Api.GetAllCountries.ResponseBody> {
    const { body: fullResponse } =
      await HttpService.request<Api.GetAllCountries.FullResponseBody>({
        url: `${API_BASE_URL}/${API_VERSION}/all?fields=alpha3Code,capital,flag,name,population,region`,
        method: 'GET',
      });

    const response = fullResponse.map(country => {
      const { alpha3Code, independent, ...remaining } = country;

      return {
        ...remaining,
        alpha3Code: alpha3Code.toLowerCase(),
      };
    });

    return response;
  }

  static async getCountryByAlpha3Code(
    params: Api.GetCountryAlpha3Code.RequestParams,
  ): Promise<Api.GetCountryAlpha3Code.ResponseBody> {
    const { body: countryData } =
      await HttpService.request<Api.GetCountryAlpha3Code.FullResponseBody>({
        url: `${API_BASE_URL}/${API_VERSION}/alpha/${params.alpha3Code}?fields=borders,capital,currencies,flag,languages,name,nativeName,population,region,subregion,topLevelDomain`,
        method: 'GET',
      });

    const { currencies, languages, ...remaining } = countryData;

    return {
      ...remaining,
      currenciesName: currencies.map(currency => currency.name),
      languagesName: languages.map(language => language.name),
    };
  }

  static async getCountriesNameByAlpha3Code(
    params: Api.GetCountriesNameByAlpha3Code.RequestParams,
  ): Promise<Api.GetCountriesNameByAlpha3Code.ResponseBody> {
    const { body: fullResponse } =
      await HttpService.request<Api.GetCountriesNameByAlpha3Code.FullResponseBody>(
        {
          url: `${API_BASE_URL}/${API_VERSION}/alpha?codes=${params.codes.join(
            ',',
          )}?fields=name,alpha3Code`,
          method: 'GET',
        },
      );

    const response = fullResponse.map(country => {
      const { alpha3Code, independent, ...remaining } = country;

      return {
        ...remaining,
        alpha3Code: alpha3Code.toLowerCase(),
      };
    });

    return response;
  }
}

export default ApiService;
