import { Region, Sort } from './enums';

export const sortOptions = [
  {
    key: Sort.NameAscending,
    name: 'Name (A-Z)',
    value: Sort.NameAscending,
  },
  {
    key: Sort.NameDescending,
    name: 'Name (Z-A)',
    value: Sort.NameDescending,
  },
  {
    key: Sort.PopulationMost,
    name: 'Population (Most)',
    value: Sort.PopulationMost,
  },
  {
    key: Sort.PopulationLess,
    name: 'Population (Less)',
    value: Sort.PopulationLess,
  },
];

export const regionOptions = [
  {
    key: Region.All,
    name: Region.All,
    value: Region.All,
  },
  {
    key: Region.Africa,
    name: Region.Africa,
    value: Region.Africa,
  },
  {
    key: Region.Americas,
    name: Region.Americas,
    value: Region.Americas,
  },
  {
    key: Region.Asia,
    name: Region.Asia,
    value: Region.Asia,
  },
  {
    key: Region.Europe,
    name: Region.Europe,
    value: Region.Europe,
  },
  {
    key: Region.Oceania,
    name: Region.Oceania,
    value: Region.Oceania,
  },
];
