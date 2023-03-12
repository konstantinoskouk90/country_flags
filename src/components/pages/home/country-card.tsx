import { styled } from '@mui/material/styles';
import React from 'react';

const CountryCardContainer = styled('div')(({ theme: { palette } }) => ({
  backgroundColor: palette.tertiary.main,
  borderRadius: '2px',
  boxShadow: `0 1px 2px ${palette.secondary.light}, 0 0px 2px ${palette.secondary.main}`,
  height: '400px',
  display: 'flex',
  flexDirection: 'column',
  width: '300px',
}));

const CountryCardImage = styled('img')(({ theme: { palette } }) => ({
  borderBottom: `1px solid ${palette.tertiary.dark}`,
  borderRadius: '2px',
  height: '200px',
  objectFit: 'cover',
  width: '300px',
}));

const CountryCardInfo = styled('div')({
  padding: '24px',
});

const CountryName = styled('div')({
  fontSize: '17px',
  fontWeight: 800,
  marginBottom: '20px',
});

const DetailsContainer = styled('div')({
  display: 'flex',
});

const DetailsLabel = styled('div')({
  fontSize: '14px',
  fontWeight: 600,
  marginBottom: '10px',
});

const DetailsText = styled('div')({
  fontSize: '14px',
  marginBottom: '10px',
});

type CountryCardProps = {
  capital: string;
  flag: string;
  name: string;
  population: number;
  region: string;
};

const CountryCard: React.FC<CountryCardProps> = ({
  capital,
  flag,
  name,
  population,
  region,
}) => (
  <CountryCardContainer data-testid="country-card-container">
    <CountryCardImage src={flag} alt={name} data-testid="country-card-image" />
    <CountryCardInfo>
      <CountryName data-testid="country-card-name">{name}</CountryName>
      <DetailsContainer>
        <DetailsLabel>Population:</DetailsLabel>
        <DetailsText data-testid="country-card-population">
          &nbsp;&nbsp;{population}
        </DetailsText>
      </DetailsContainer>
      <DetailsContainer>
        <DetailsLabel>Region:</DetailsLabel>
        <DetailsText data-testid="country-card-region">
          &nbsp;&nbsp;{region}
        </DetailsText>
      </DetailsContainer>
      {capital && (
        <DetailsContainer data-testid="country-card-capital-container">
          <DetailsLabel>Capital:</DetailsLabel>
          <DetailsText data-testid="country-card-capital">
            &nbsp;&nbsp;{capital}
          </DetailsText>
        </DetailsContainer>
      )}
    </CountryCardInfo>
  </CountryCardContainer>
);

export default CountryCard;
