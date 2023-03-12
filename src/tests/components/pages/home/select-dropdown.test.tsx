import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SelectDropdown from 'components/pages/home/select-dropdown';
import provideTheme from 'tests/utils/provide-theme';

it('Select dropdown registers user click and calls displays popup with 2 options', () => {
  const options = [
    {
      key: 'a',
      name: 'a',
      value: 'a',
    },
    {
      key: 'b',
      name: 'b',
      value: 'b',
    },
  ];

  const onChangeMock = jest.fn();

  render(
    provideTheme(
      <SelectDropdown
        dataTestId="select-dropdown"
        onChange={onChangeMock}
        options={options}
        value=""
      />,
    ),
  );

  const select = screen.getByTestId('select-dropdown');

  userEvent.click(select);

  expect(screen.getByTestId('select-dropdown-0')).toBeInTheDocument();
  expect(screen.getByTestId('select-dropdown-1')).toBeInTheDocument();
});

it('Select dropdown registers user click which displays the dropdown and selection of the 2nd dropdown option', () => {
  const options = [
    {
      key: 'a',
      name: 'a',
      value: 'a',
    },
    {
      key: 'b',
      name: 'b',
      value: 'b',
    },
  ];

  const onChangeMock = jest.fn();

  render(
    provideTheme(
      <SelectDropdown
        dataTestId="select-dropdown"
        onChange={onChangeMock}
        options={options}
        value=""
      />,
    ),
  );

  const select = screen.getByTestId('select-dropdown');

  userEvent.click(select);

  const option1 = screen.getByTestId('select-dropdown-0');
  const option2 = screen.getByTestId('select-dropdown-1');

  expect(option1).toBeInTheDocument();
  expect(option2).toBeInTheDocument();

  userEvent.click(option2);

  expect(onChangeMock).toHaveBeenCalledTimes(1);
});
