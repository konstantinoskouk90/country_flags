import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SearchInput from 'components/pages/home/search-input';
import provideTheme from 'tests/utils/provide-theme';

it('Search Input registers user input and calls the onChange function the right number of times, once per keypress', () => {
  const onChangeMock = jest.fn();

  render(provideTheme(<SearchInput onChange={onChangeMock} value="" />));

  const input = screen.getByTestId('search-input-field');

  userEvent.type(input, 'The United Kingdom');

  expect(onChangeMock).toHaveBeenCalledTimes(18);
});
