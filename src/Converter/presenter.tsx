import React, { useEffect, useState, FunctionComponent } from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import CalculatorFrom from '../components/CalculatorFrom';
import CalculatorTo from '../components/CalculatorTo';
import CurrencyInfo from '../components/CurrencyInfo';
import CurrencyStats from '../components/CurrencyStats';
import Error from '../components/Error';
import { convertAmount, toDateFromTimestamp } from '../common/helpers';
import { CurrencyOption } from '../types';

export type ConverterProps = {
  hasError: boolean;
  baseCurrency: string;
  targetCurrency: string;
  rate: number;
  currenciesFrom: CurrencyOption[];
  currenciesTo: CurrencyOption[];
  timestamp: number;
  fetchRates: Function;
  fetchCurrencies: Function;
  setBaseCurrency: Function;
  setTargetCurrency: Function;
  points: any[];
};

const Converter: FunctionComponent<ConverterProps> = props => {
  const [amountFrom, setAmountFrom] = useState(0);
  const error =
    props.hasError && "Couldn't load this currency, please try another one.";

  useEffect(() => {
    props.fetchCurrencies();
    props.fetchRates();
  }, []);

  if (!props.currenciesFrom.length || !props.rate) {
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
            currency={props.targetCurrency}
            convertedAmount={convertAmount(amountFrom, props.rate)}
            onChangeCurrency={(currency: string) =>
              props.setTargetCurrency(currency)
            }
            error={error}
          />
        </Grid>
        <Grid item xs={12}>
          <Card>
            <div className="u-positionRelative">
              <CardContent>
                <CurrencyInfo
                  baseCurrency={props.baseCurrency}
                  rate={props.rate}
                  targetCurrency={props.targetCurrency}
                  date={toDateFromTimestamp(props.timestamp)}
                />
                <CurrencyStats
                  baseCurrency={props.baseCurrency}
                  targetCurrency={props.targetCurrency}
                  points={props.points}
                />
                {error && <Error>{error}</Error>}
              </CardContent>
            </div>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default Converter;
