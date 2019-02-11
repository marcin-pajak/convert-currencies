import React from 'react';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

const CurrencySelect = ({ currencies, ...props }) => (
  <TextField select={true} {...props}>
    {currencies.map(option => (
      <MenuItem key={option.value} value={option.value}>
        {option.label}
      </MenuItem>
    ))}
  </TextField>
);

export default CurrencySelect;
