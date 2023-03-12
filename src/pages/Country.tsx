import { styled } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { AxiosError } from 'axios';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { InfoContainer, InfoText, StyledCircularProgress } from './Home';
import ApiService from 'services/api';
import { Api } from 'types';
import { theme } from 'styles/theme';

const CountryOuterContainer = styled('section')({
  width: '100%',
});

const CountryInnerContainer = styled('div')({
  margin: '0 auto',
  maxWidth: '1440px',
  padding: '0 48px',
});

const AllCountriesButtonContainer = styled('div')({
  margin: '64px 0',
  [theme.breakpoints.down('md')]: {
    marginTop: '40px',
    marginBottom: '64px',
  },
});

const AllCountriesButton = styled('a')(({ theme: { palette } }) => ({
  alignItems: 'center',
  border: `1px solid ${palette.secondary.light}`,
  borderRadius: '4px',
  color: palette.primary.main,
  display: 'flex',
  fontSize: '14px',
  padding: '10px',
  textDecoration: 'none',
  width: '135px',
  ':hover': {
    textDecoration: 'underline',
  },
}));

const ArrowBackIconWrapper = styled('div')({
  alignItems: 'center',
  display: 'flex',
});

const AllCountriesText = styled('div')({
  alignItems: 'center',
  display: 'flex',
  marginLeft: '4px',
});

const CountryDetailsGrid = styled('section')(({ theme }) => ({
  display: 'grid',
  gridAutoColumns: '1fr 1fr',
  gridAutoFlow: 'column',
  [theme.breakpoints.down('lg')]: {
    fontSize: '22px',
    gridAutoFlow: 'row',
  },
}));

const CountryDetailsFlag = styled('section')({
  alignItems: 'center',
  display: 'flex',
  justifyContent: 'flex-start',
});

const CountryDetailsFlagImage = styled('img')(({ theme }) => ({
  border: `1px solid ${theme.palette.primary.main}`,
  maxHeight: '100%',
  maxWidth: '100%',
}));

const CountryDetailsInfo = styled('section')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  paddingLeft: '80px',
  width: '100%',
  [theme.breakpoints.down('lg')]: {
    justifyContent: 'flex-start',
    marginTop: '36px',
    paddingLeft: 0,
  },
}));

const CountryName = styled('div')(({ theme }) => ({
  display: 'flex',
  fontSize: '28px',
  fontWeight: 800,
  justifyContent: 'flex-start',
  [theme.breakpoints.down('xl')]: {
    fontSize: '26px',
  },
  [theme.breakpoints.down('lg')]: {
    fontSize: '24px',
  },
}));

const CountryExtraDetails = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'flex-start',
  marginTop: '32px',
  width: '100%',
  [theme.breakpoints.down('xl')]: {
    marginTop: '26px',
  },
  [theme.breakpoints.down('lg')]: {
    flexDirection: 'column',
    marginTop: '22px',
    rowGap: '24px',
  },
  [theme.breakpoints.down('md')]: {
    marginTop: '18px',
  },
}));

const CountryExtraDetailsColumn = styled('div')(({ theme }) => ({
  alignItems: 'flex-start',
  display: 'flex',
  flexDirection: 'column',
  rowGap: '12px',
  width: '100%',
  [theme.breakpoints.down('xl')]: {
    marginTop: '10px',
  },
  [theme.breakpoints.down('lg')]: {
    marginTop: '8px',
  },
  [theme.breakpoints.down('md')]: {
    marginTop: '6px',
  },
}));

const CountryExtraDetail = styled('div')(({ theme }) => ({
  display: 'flex',
  fontSize: '16px',
  [theme.breakpoints.down('lg')]: {
    fontSize: '15px',
  },
  [theme.breakpoints.down('md')]: {
    fontSize: '14px',
  },
}));

const CountryExtraDetailLabel = styled('div')({
  fontWeight: 600,
});

const BorderCountriesContainer = styled('section')(({ theme }) => ({
  alignItems: 'center',
  columnGap: '8px',
  display: 'flex',
  marginTop: '48px',
  width: '100%',
  [theme.breakpoints.down('xl')]: {
    marginTop: '40px',
  },
  [theme.breakpoints.down('lg')]: {
    marginTop: '36px',
  },
  [theme.breakpoints.down('md')]: {
    alignItems: 'flex-start',
    flexDirection: 'column',
    marginTop: '32px',
    rowGap: '8px',
  },
}));

const BorderCountriesLabel = styled('div')(({ theme }) => ({
  fontSize: '16px',
  fontWeight: 600,
  minWidth: '135px',
  [theme.breakpoints.down('xl')]: {
    fontSize: '15px',
    minWidth: '115px',
  },
  [theme.breakpoints.down('lg')]: {
    fontSize: '14px',
    minWidth: '100px',
  },
  [theme.breakpoints.down('md')]: {
    minWidth: '85px',
  },
}));

const BorderCountriesNameList = styled('ol')({
  columnGap: '12px',
  display: 'flex',
  flexWrap: 'wrap',
  listStyleType: 'none',
  margin: 0,
  padding: 0,
  rowGap: '12px',
});

const BorderCountryNameLink = styled('a')({
  color: theme.palette.primary.main,
  textDecoration: 'none',
});

const BorderCountryName = styled('li')({
  border: `1px solid ${theme.palette.secondary.light}`,
  borderRadius: '4px',
  fontSize: '14px',
  padding: '3px 6px',
});

function Country() {
  const params = useParams();

  const [borderCountriesNames, setBorderCountriesNames] =
    useState<Api.GetCountriesNameByAlpha3Code.ResponseBody>();

  // NOTE: useQuery runs before useEffect
  const { data, isLoading } = useQuery<
    Api.GetCountryAlpha3Code.ResponseBody,
    AxiosError
  >(
    ['getCountryByAlpha3Code', params.id],
    () =>
      ApiService.getCountryByAlpha3Code({ alpha3Code: params.id as string }),
    {
      enabled: !!params.id,
      onSuccess: async data => {
        // When a country has border countries, make an additional call to fetch their names using their country code
        if (data.borders.length > 0) {
          await ApiService.getCountriesNameByAlpha3Code({
            codes: data.borders,
          }).then(data => {
            setBorderCountriesNames(data);
          });

          return;
        }

        setBorderCountriesNames([]);
      },
    },
  );

  return (
    <CountryOuterContainer>
      <CountryInnerContainer>
        <AllCountriesButtonContainer>
          <AllCountriesButton href="/">
            <ArrowBackIconWrapper>
              <ArrowBackIcon />
            </ArrowBackIconWrapper>
            <AllCountriesText>All Countries</AllCountriesText>
          </AllCountriesButton>
        </AllCountriesButtonContainer>
        {data && borderCountriesNames && (
          <CountryDetailsGrid>
            <CountryDetailsFlag>
              <CountryDetailsFlagImage src={data?.flag} alt={data?.name} />
            </CountryDetailsFlag>
            <CountryDetailsInfo>
              <CountryName>{data?.name}</CountryName>
              <CountryExtraDetails>
                <CountryExtraDetailsColumn>
                  <CountryExtraDetail>
                    <CountryExtraDetailLabel>
                      Native Name:&nbsp;
                    </CountryExtraDetailLabel>
                    <div>{data?.nativeName}</div>
                  </CountryExtraDetail>
                  <CountryExtraDetail>
                    <CountryExtraDetailLabel>
                      Population:&nbsp;
                    </CountryExtraDetailLabel>
                    <div>{data?.population}</div>
                  </CountryExtraDetail>
                  <CountryExtraDetail>
                    <CountryExtraDetailLabel>
                      Region:&nbsp;
                    </CountryExtraDetailLabel>
                    <div>{data?.region}</div>
                  </CountryExtraDetail>
                  <CountryExtraDetail>
                    <CountryExtraDetailLabel>
                      Subregion:&nbsp;
                    </CountryExtraDetailLabel>
                    <div>{data?.subregion}</div>
                  </CountryExtraDetail>
                  {data?.capital && (
                    <CountryExtraDetail>
                      <CountryExtraDetailLabel>
                        Capital:&nbsp;
                      </CountryExtraDetailLabel>
                      <div>{data?.capital}</div>
                    </CountryExtraDetail>
                  )}
                </CountryExtraDetailsColumn>
                <CountryExtraDetailsColumn>
                  <CountryExtraDetail>
                    <CountryExtraDetailLabel>
                      Top Level Domain:&nbsp;
                    </CountryExtraDetailLabel>
                    <div>{data?.topLevelDomain.join(', ')}</div>
                  </CountryExtraDetail>
                  {data?.currenciesName?.length > 0 && (
                    <CountryExtraDetail>
                      <CountryExtraDetailLabel>
                        Currencies:&nbsp;
                      </CountryExtraDetailLabel>
                      <div>{data?.currenciesName.join(', ')}</div>
                    </CountryExtraDetail>
                  )}
                  <CountryExtraDetail>
                    <CountryExtraDetailLabel>
                      Languages:&nbsp;
                    </CountryExtraDetailLabel>
                    <div>{data?.languagesName.join(', ')}</div>
                  </CountryExtraDetail>
                </CountryExtraDetailsColumn>
              </CountryExtraDetails>
              {borderCountriesNames && borderCountriesNames.length > 0 && (
                <BorderCountriesContainer>
                  <BorderCountriesLabel>
                    Border Countries:&nbsp;
                  </BorderCountriesLabel>
                  {
                    <BorderCountriesNameList>
                      {borderCountriesNames.map(({ alpha3Code, name }) => {
                        return (
                          <BorderCountryNameLink
                            key={alpha3Code}
                            href={`/countries/${alpha3Code}`}
                          >
                            <BorderCountryName>{name}</BorderCountryName>
                          </BorderCountryNameLink>
                        );
                      })}
                    </BorderCountriesNameList>
                  }
                </BorderCountriesContainer>
              )}
            </CountryDetailsInfo>
          </CountryDetailsGrid>
        )}
        {isLoading && (
          <InfoContainer>
            <StyledCircularProgress size={32} />
            <InfoText>Loading</InfoText>
          </InfoContainer>
        )}
        {!data && !borderCountriesNames && !isLoading && (
          <InfoContainer>
            <InfoText>Could not retrieve country data..</InfoText>
          </InfoContainer>
        )}
      </CountryInnerContainer>
    </CountryOuterContainer>
  );
}

export default Country;
