import React, { SFC } from 'react';
import CurrencySelect from './CurrencySelect';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { CurrencyOption } from '../types';

export type CalculatorToProps = {
  currency: string;
  currencies: CurrencyOption[];
  onChangeAmount: Function;
  onChangeCurrency: Function;
};

const CalculatorFrom: SFC<CalculatorToProps> = props => (
  <Card>
    <CardContent>
      <Typography variant="h5" component="h2" gutterBottom>
        From {props.currency}
      </Typography>
      <TextField
        autoFocus={true}
        label="Amount"
        onChange={(event: React.ChangeEvent<HTMLInputElement>): void => {
          props.onChangeAmount(event.target.value);
        }}
        inputProps={{
          type: 'number',
          pattern: '^d+(.|,)d{2}$'
        }}
        className="u-width50"
      />
      <CurrencySelect
        label="Your currency"
        value={props.currency}
        onChange={(event: React.FormEvent<HTMLSelectElement>) =>
          props.onChangeCurrency((event.target as HTMLSelectElement).value)
        }
        currencies={props.currencies}
        className="u-width50"
      />
    </CardContent>
  </Card>
);

export default CalculatorFrom;
