import { Input } from '@mui/material';

type CustomTextFieldProps = {
  id: string;
  name: string;
  dataTestId: string;

  disabled?: boolean;
  hasError?: boolean;
  inputPropsStyle?: Record<string, unknown>;
  label?: string;
  maxRows?: number;
  multiline?: boolean;
  pattern?: string;
  placeholder?: string;
  shrink?: boolean;
  readOnly?: boolean;
  rows?: number;
  style?: Record<string, unknown>;
  type?: string;
  value?: string | number | null;
  variant?: 'filled' | 'outlined' | 'standard';
  onBlur?: any;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onPaste?: (e: React.ClipboardEvent<HTMLInputElement>) => void;
};

const CustomTextField: React.FC<CustomTextFieldProps> = ({
  id,
  dataTestId,
  name,
  disabled,
  hasError,
  inputPropsStyle,
  maxRows,
  multiline,
  pattern,
  placeholder,
  readOnly,
  rows,
  type,
  value,
  style,
  onBlur,
  onChange,
  onFocus,
  onKeyDown,
  onPaste,
}) => {
  return (
    <Input
      id={id}
      name={name}
      multiline={multiline}
      placeholder={placeholder}
      rows={rows}
      maxRows={maxRows}
      type={type}
      size="small"
      disabled={disabled}
      disableUnderline={true}
      value={value}
      onBlur={onBlur}
      onChange={onChange}
      onFocus={onFocus}
      onKeyDown={onKeyDown}
      onPaste={onPaste}
      error={hasError}
      inputProps={{
        'data-testid': dataTestId,
        readOnly,
        pattern,
        style: {
          ...inputPropsStyle,
        },
      }}
      style={{
        ...style,
      }}
    />
  );
};

export default CustomTextField;
