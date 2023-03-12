import { styled, useTheme, Theme } from '@mui/material/styles';
import { Search } from '@mui/icons-material';
import React from 'react';
import CustomTextField from 'components/text-field';

const SearchInputContainer = styled('div')(({ theme: { palette } }) => ({
  borderRadius: '4px',
  border: `1px solid ${palette.secondary.light}`,
  display: 'flex',
  height: '45px',
  position: 'relative',
  width: '100%',
}));

const SearchBookIconWrapper = styled('div')({
  alignItems: 'center',
  display: 'flex',
  justifyContent: 'center',
  width: '55px',
});

const StyledSearchIcon = styled(Search)(
  ({
    isdisabled,
    theme: { palette },
  }: {
    isdisabled: number;
    theme: Theme;
  }) => ({
    color: !isdisabled ? palette.secondary.light : palette.disabled.main,
  }),
);

type SearchInputProps = {
  value: string;
  onChange: (searchTerm: string) => void;

  disabled?: boolean;
};

const SearchInput: React.FC<SearchInputProps> = ({
  disabled,
  value,
  onChange,
}) => {
  const theme = useTheme();

  return (
    <SearchInputContainer>
      <SearchBookIconWrapper>
        <StyledSearchIcon isdisabled={disabled ? 1 : 0} theme={theme} />
      </SearchBookIconWrapper>
      <CustomTextField
        dataTestId="search-input-field"
        disabled={disabled}
        id="search-input"
        name="searchInput"
        placeholder="Search for a country by name..."
        onChange={e => onChange(e.target.value)}
        value={value}
        inputPropsStyle={{
          fontSize: '14px',
        }}
        style={{ width: '100%' }}
      />
    </SearchInputContainer>
  );
};

export default SearchInput;
