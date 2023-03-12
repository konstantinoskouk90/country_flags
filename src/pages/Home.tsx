import { styled } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { AxiosError } from 'axios';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import CountryCard from 'components/pages/home/country-card';
import SearchInput from 'components/pages/home/search-input';
import SelectDropdown from 'components/pages/home/select-dropdown';
import ApiService from 'services/api';
import { regionOptions, sortOptions } from 'utils/data';
import { normalizeString } from 'utils/normalize-string';
import { Api } from 'types';
import { Region, Sort } from 'utils/enums';
import {
  sortByNameAscending,
  sortByNameDescending,
  sortByPopulationLess,
  sortByPopulationMost,
} from 'utils/sorting-functions';

const HomeOuterContainer = styled('section')({
  width: '100%',
});

const HomeInnerContainer = styled('div')({
  margin: '0 auto',
  maxWidth: '1440px',
  padding: '0 48px',
});

const SearchInputContainer = styled('section')(({ theme }) => ({
  alignItems: 'center',
  display: 'flex',
  justifyContent: 'space-between',
  marginTop: '48px',
  [theme.breakpoints.down(1076)]: {
    flexDirection: 'column',
  },
}));

const SearchInputWrapper = styled('div')(({ theme }) => ({
  maxWidth: '500px',
  width: '100%',
  [theme.breakpoints.down(1076)]: {
    maxWidth: '100%',
  },
}));

const SortingAndFiltering = styled('div')(({ theme }) => ({
  columnGap: '24px',
  display: 'flex',
  [theme.breakpoints.down(1076)]: {
    flexDirection: 'column',
    marginTop: '20px',
    rowGap: '20px',
    width: '100%',
  },
}));

const FilterByRegionLabel = styled('div')({
  fontSize: '14px',
  marginBottom: '4px',
});

const CountryCardContainer = styled('div')(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'auto auto auto auto',
  justifyContent: 'space-between',
  marginTop: '48px',
  rowGap: '48px',
  width: '100%',
  [theme.breakpoints.down(1376)]: {
    gridTemplateColumns: 'auto auto auto',
  },
  [theme.breakpoints.down(1076)]: {
    columnGap: '48px',
    gridTemplateColumns: 'auto auto',
    justifyContent: 'center',
  },
  [theme.breakpoints.down(768)]: {
    gridTemplateColumns: 'auto',
  },
}));

const StyledLink = styled(Link)(({ theme: { palette } }) => ({
  color: palette.primary.main,
  textDecoration: 'none',
}));

export const InfoContainer = styled('section')({
  alignItems: 'center',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  width: '100%',
});

export const InfoText = styled('div')(({ theme: { palette } }) => ({
  color: palette.secondary.main,
  marginTop: '16px',
}));

export const StyledCircularProgress = styled(CircularProgress)(
  ({ theme: { palette } }) => ({
    color: palette.secondary.main,
  }),
);

function Home() {
  const [searchInputValue, setSearchInputValue] = useState('');
  const [selectedSorting, setSelectedSorting] = useState(Sort.NameAscending);
  const [selectedRegion, setSelectedRegion] = useState(Region.All);
  const [originalCountryData, setOriginalCountryData] =
    useState<Api.GetAllCountries.ResponseBody>([]);
  const [filteredCountryData, setFilteredCountryData] =
    useState<Api.GetAllCountries.ResponseBody>([]);

  // NOTE: useQuery runs before useEffect
  const { isLoading } = useQuery<Api.GetAllCountries.ResponseBody, AxiosError>(
    'getAllCountries',
    () => ApiService.getAllCountries(),
    {
      onSuccess: data => {
        // Sort by name ascending after API call succeeds
        sortByNameAscending(data);

        // Then pass in to local state for later usage
        setOriginalCountryData(data);
        setFilteredCountryData(data);
      },
    },
  );

  const getSortingFunction = () => {
    switch (selectedSorting) {
      case Sort.NameAscending:
        return sortByNameAscending;
      case Sort.NameDescending:
        return sortByNameDescending;
      case Sort.PopulationMost:
        return sortByPopulationMost;
      case Sort.PopulationLess:
        return sortByPopulationLess;
      default:
        return sortByNameAscending;
    }
  };

  const onSearchChange = (value: string) => {
    setSearchInputValue(value);

    const sortingFunction = getSortingFunction();

    if (value) {
      // We search against all country data
      if (selectedRegion === Region.All) {
        setFilteredCountryData(
          sortingFunction(
            originalCountryData.filter(country =>
              normalizeString(country.name).startsWith(normalizeString(value)),
            ),
          ),
        );

        return;
      }

      // We search against the filtered region country data
      setFilteredCountryData(
        sortingFunction(
          originalCountryData
            .filter(country =>
              normalizeString(country.name).startsWith(normalizeString(value)),
            )
            .filter(country => country.region === selectedRegion),
        ),
      );

      return;
    }

    // When we have no search value we default back to the filtered region country data
    onRegionChange(selectedRegion);
  };

  const onSortingChange = (value: Sort) => {
    if (value === Sort.NameAscending) {
      const deepCloneFilteredData = [...filteredCountryData];
      setFilteredCountryData(sortByNameAscending(deepCloneFilteredData));

      return;
    }

    if (value === Sort.NameDescending) {
      const deepCloneFilteredData = [...filteredCountryData];
      setFilteredCountryData(sortByNameDescending(deepCloneFilteredData));

      return;
    }

    if (value === Sort.PopulationMost) {
      const deepCloneFilteredData = [...filteredCountryData];
      setFilteredCountryData(sortByPopulationMost(deepCloneFilteredData));

      return;
    }

    if (value === Sort.PopulationLess) {
      const deepCloneFilteredData = [...filteredCountryData];
      setFilteredCountryData(sortByPopulationLess(deepCloneFilteredData));

      return;
    }
  };

  const onRegionChange = (value: Region) => {
    const sortingFunction = getSortingFunction();

    // When we change the region we also clear the search input field
    setSearchInputValue('');

    setSelectedRegion(value);

    // We default back to the original country data if 'All' is selected
    // We always include the selected sorting
    if (value === Region.All) {
      setFilteredCountryData(sortingFunction(originalCountryData));

      return;
    }

    // We filter the original country data if an actual region has been selected
    // We always include the selected sorting
    setFilteredCountryData(
      sortingFunction(
        originalCountryData.filter(country => country.region === value),
      ),
    );
  };

  return (
    <HomeOuterContainer>
      <HomeInnerContainer>
        <SearchInputContainer>
          <SearchInputWrapper>
            <SearchInput
              value={searchInputValue}
              onChange={onSearchChange}
              disabled={isLoading}
            />
          </SearchInputWrapper>
          <SortingAndFiltering>
            <div>
              <FilterByRegionLabel>Sort</FilterByRegionLabel>
              <SelectDropdown
                dataTestId="sort-countries"
                options={sortOptions}
                value={selectedSorting}
                onChange={(value: Sort) => {
                  setSelectedSorting(value);
                  onSortingChange(value);
                }}
                disabled={isLoading}
              />
            </div>
            <div>
              <FilterByRegionLabel>Filter by region</FilterByRegionLabel>
              <SelectDropdown
                dataTestId="filter-countries"
                options={regionOptions}
                value={selectedRegion}
                onChange={onRegionChange}
                disabled={isLoading}
              />
            </div>
          </SortingAndFiltering>
        </SearchInputContainer>
        <CountryCardContainer>
          {filteredCountryData?.map(
            ({ alpha3Code, capital, flag, name, population, region }) => {
              return (
                <StyledLink key={alpha3Code} to={`/countries/${alpha3Code}`}>
                  <CountryCard
                    flag={flag}
                    capital={capital}
                    name={name}
                    population={population}
                    region={region}
                  />
                </StyledLink>
              );
            },
          )}
        </CountryCardContainer>
        {filteredCountryData.length === 0 && isLoading && (
          <InfoContainer>
            <StyledCircularProgress size={32} />
            <InfoText>Loading</InfoText>
          </InfoContainer>
        )}
        {filteredCountryData.length === 0 && !isLoading && (
          <InfoContainer>
            <InfoText>No results found..</InfoText>
          </InfoContainer>
        )}
      </HomeInnerContainer>
    </HomeOuterContainer>
  );
}

export default Home;
