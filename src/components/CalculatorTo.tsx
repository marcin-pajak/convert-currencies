import React, { SFC } from 'react';
import CurrencySelect from './CurrencySelect';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Error from './Error';
import { CurrencyOption } from '../types';

export type CalculatorToProps = {
  currency: string;
  currencies: CurrencyOption[];
  convertedAmount: string;
  error: boolean | string;
  onChangeCurrency: Function;
};

const CalculatorTo: SFC<CalculatorToProps> = props => (
  <Card>
    <div className="u-positionRelative">
      <CardContent>
        <Typography variant="h5" component="h2" gutterBottom>
          To {props.currency}
        </Typography>
        <CurrencySelect
          label="Target currency"
          value={props.currency}
          onChange={(event: React.FormEvent<HTMLSelectElement>) =>
            props.onChangeCurrency((event.target as HTMLSelectElement).value)
          }
          currencies={props.currencies}
          className="u-width50"
        />
        <TextField
          label="Amount"
          value={props.convertedAmount}
          className="u-width50"
          inputProps={{
            readOnly: true,
            className: 'u-fontBold'
          }}
        />
        {props.error && <Error>{props.error}</Error>}
      </CardContent>
    </div>
  </Card>
);

export default CalculatorTo;
