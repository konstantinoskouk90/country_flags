import { normalizeString } from './normalize-string';
import { Api } from 'types';

export function sortByNameAscending(data: Api.GetAllCountries.ResponseBody) {
  return data.sort((a, b) =>
    normalizeString(a.name) > normalizeString(b.name) ? 1 : -1,
  );
}

export function sortByNameDescending(data: Api.GetAllCountries.ResponseBody) {
  return data.sort((a, b) =>
    normalizeString(b.name) > normalizeString(a.name) ? 1 : -1,
  );
}

export function sortByPopulationMost(data: Api.GetAllCountries.ResponseBody) {
  return data.sort((a, b) => b.population - a.population);
}

export function sortByPopulationLess(data: Api.GetAllCountries.ResponseBody) {
  return data.sort((a, b) => a.population - b.population);
}
