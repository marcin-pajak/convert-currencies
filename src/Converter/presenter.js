import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import CalculatorFrom from '../components/CalculatorFrom';
import CalculatorTo from '../components/CalculatorTo';
import CurrencyInfo from '../components/CurrencyInfo';
import { convertAmount, toDateFromTimestamp } from '../common/helpers';

const Converter = props => {
  const [amountFrom, setAmountFrom] = useState(0);
  const [currencyTo, setCurrencyTo] = useState('USD');
  const rate = props.rate(currencyTo);
  const error =
    props.hasError && "Couldn't load this currency, please try another one.";

  useEffect(() => {
    props.fetchCurrencies();
  }, []);

  useEffect(() => {
    props.fetchRates(props.baseCurrency);
  }, [props.baseCurrency]);

  if (!props.currenciesFrom.length) {
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
            onChangeAmount={amount => setAmountFrom(amount)}
            onChangeCurrency={currency => props.setBaseCurrency(currency)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <CalculatorTo
            currencies={props.currenciesTo}
            currency={currencyTo}
            convertedAmount={convertAmount(amountFrom, rate)}
            onChangeCurrency={currency => setCurrencyTo(currency)}
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
