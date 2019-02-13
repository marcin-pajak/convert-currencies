import { connect } from 'react-redux';
import { fetchCurrencies, getCurrenciesWithout } from '../currencies';
import {
  fetchRates,
  getLatestTimestamp,
  getLast30Rates,
  getRateMemo
} from '../rates';
import {
  setBaseCurrency,
  getBaseCurency,
  getTargetCurrency,
  setTargetCurrency
} from '../user';
import { getError } from '../ui';
import { RootState } from '../types';
import Converter from './presenter';

const mapStateToProps = (state: RootState) => ({
  rate: getRateMemo(state),
  baseCurrency: getBaseCurency(state),
  targetCurrency: getTargetCurrency(state),
  currenciesFrom: getCurrenciesWithout(state),
  currenciesTo: getCurrenciesWithout(state, getBaseCurency(state)),
  timestamp: getLatestTimestamp(state),
  hasError: getError(state),
  points: getLast30Rates(state)
});

const mapDispatchToProps = {
  fetchCurrencies,
  fetchRates,
  setBaseCurrency,
  setTargetCurrency
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Converter);
