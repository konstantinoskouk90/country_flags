import { render, screen } from '@testing-library/react';
import CountryCard from 'components/pages/home/country-card';
import provideTheme from 'tests/utils/provide-theme';

it('CountryCard correctly renders all data based on props passed in', () => {
  render(
    provideTheme(
      <CountryCard
        capital="London"
        flag="uk.svg"
        name="The United Kingdom"
        population={68000000}
        region="Europe"
      />,
    ),
  );

  expect(screen.getByTestId('country-card-container')).toBeInTheDocument();

  expect(screen.getByTestId('country-card-capital')).toHaveTextContent(
    /^London$/,
  );
  expect(screen.getByTestId('country-card-image')).toHaveAttribute(
    'src',
    'uk.svg',
  );
  expect(screen.getByTestId('country-card-name')).toHaveTextContent(
    /^The United Kingdom$/,
  );
  expect(screen.getByTestId('country-card-population')).toHaveTextContent(
    /^68000000$/,
  );
  expect(screen.getByTestId('country-card-region')).toHaveTextContent(
    /^Europe$/,
  );
});

it('CountryCard correctly renders all data based on props passed in and does not render capital component', () => {
  render(
    provideTheme(
      <CountryCard
        capital=""
        flag="uk.svg"
        name="The United Kingdom"
        population={68000000}
        region="Europe"
      />,
    ),
  );

  expect(screen.getByTestId('country-card-container')).toBeInTheDocument();

  expect(
    screen.queryByTestId('country-card-capital-container'),
  ).not.toBeInTheDocument();
  expect(screen.getByTestId('country-card-image')).toHaveAttribute(
    'src',
    'uk.svg',
  );
  expect(screen.getByTestId('country-card-name')).toHaveTextContent(
    /^The United Kingdom$/,
  );
  expect(screen.getByTestId('country-card-population')).toHaveTextContent(
    /^68000000$/,
  );
  expect(screen.getByTestId('country-card-region')).toHaveTextContent(
    /^Europe$/,
  );
});
