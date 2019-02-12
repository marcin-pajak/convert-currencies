import React, { SFC, ChangeEvent } from 'react';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import { CurrencyOption } from '../types';

export type CurrencySelectProps = {
  currencies: CurrencyOption[];
  className?: string;
  label?: string;
  onChange: (event: ChangeEvent<HTMLSelectElement>) => any;
  //onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  //onChange: (value: string) => void;
  //onChange?: React.FormEvent<HTMLSelectElement>;
  // onChange?: ChangeEvent<HTMLSelectElement>;
  value: string;
};

const CurrencySelect: SFC<CurrencySelectProps> = ({
  currencies,
  className,
  label,
  onChange,
  value
}) => (
  <TextField
    select={true}
    label={label}
    className={className}
    onChange={onChange}
    value={value}
  >
    {currencies.map(option => (
      <MenuItem key={option.value} value={option.value}>
        {option.label}
      </MenuItem>
    ))}
  </TextField>
);

export default CurrencySelect;
