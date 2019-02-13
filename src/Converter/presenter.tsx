import React, { useEffect, useState, FunctionComponent } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import CalculatorFrom from '../components/CalculatorFrom';
import CalculatorTo from '../components/CalculatorTo';
import CurrencyInfo from '../components/CurrencyInfo';
import { convertAmount, toDateFromTimestamp } from '../common/helpers';
import { CurrencyOption } from '../types';

export type ConverterProps = {
  hasError: boolean;
  baseCurrency: string;
  rate: Function;
  currenciesFrom: CurrencyOption[];
  currenciesTo: CurrencyOption[];
  timestamp: number;
  fetchRates: Function;
  fetchCurrencies: Function;
  setBaseCurrency: Function;
};

const Converter: FunctionComponent<ConverterProps> = props => {
  const [amountFrom, setAmountFrom] = useState(0);
  const [currencyTo, setCurrencyTo] = useState('USD');
  const rate = props.rate(currencyTo);
  const error =
    props.hasError && "Couldn't load this currency, please try another one.";

  useEffect(() => {
    props.fetchCurrencies();
    props.fetchRates();
  }, []);

  if (!props.currenciesFrom.length || !rate) {
    return <CircularProgress />;
  }

  return (
    <>
      <Typography variant="h3" component="h1" gutterBottom>
        Currency Converter
      </Typography>
      <Grid container spacing={24}>
        <Grid item xs={12} sm={6}>
          <CalculatorFrom
            currencies={props.currenciesFrom}
            currency={props.baseCurrency}
            onChangeAmount={(amount: number) => setAmountFrom(amount)}
            onChangeCurrency={(currency: string) =>
              props.setBaseCurrency(currency)
            }
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <CalculatorTo
            currencies={props.currenciesTo}
            currency={currencyTo}
            convertedAmount={convertAmount(amountFrom, rate)}
            onChangeCurrency={(currency: string) => setCurrencyTo(currency)}
            error={error}
          />
        </Grid>
        <Grid item xs={12}>
          <CurrencyInfo
            baseCurrency={props.baseCurrency}
            rate={rate || '?'}
            targetCurrency={currencyTo}
            date={toDateFromTimestamp(props.timestamp)}
            error={error}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default Converter;
