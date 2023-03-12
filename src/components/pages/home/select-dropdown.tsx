import { FormControl, MenuItem, Select, styled } from '@mui/material';

const StyledFormControl = styled(FormControl)({
  width: '100%',
});

const StyledSelect = styled(Select)(({ theme: { palette } }) => ({
  border: `1px solid ${palette.tertiary.main}`,
  fontSize: '15px',
  height: '35px',
  minWidth: '200px',
  '> .MuiSelect-icon': {
    color: palette.primary.main,
  },
  '> .MuiSelect-standard': {
    color: palette.primary.main,
  },
}));

const StyledMenuItem = styled(MenuItem)({
  fontSize: '15px',
});

type SelectDropdownProps = {
  dataTestId: string;
  value: string | number;
  onChange: (value: any) => void;
  options: SelectDropdownOption[];

  disabled?: boolean;
};

export type SelectDropdownOption = {
  key: string;
  name: string;
  value: string | number;
};

interface SelectDisplayProps extends React.HTMLAttributes<HTMLDivElement> {
  'data-testid'?: string;
}

const SelectDropdown: React.FC<SelectDropdownProps> = ({
  dataTestId,
  value,
  options,
  onChange,
  disabled,
}) => {
  return (
    <StyledFormControl>
      <StyledSelect
        SelectDisplayProps={{ 'data-testid': dataTestId } as SelectDisplayProps}
        value={value}
        onChange={e => onChange(e.target.value as string)}
        disabled={disabled}
      >
        {options.map((option: SelectDropdownOption, index) => (
          <StyledMenuItem
            data-testid={`${dataTestId}-${index}`}
            key={option.key}
            value={option.value}
          >
            {option.name}
          </StyledMenuItem>
        ))}
      </StyledSelect>
    </StyledFormControl>
  );
};

export default SelectDropdown;
