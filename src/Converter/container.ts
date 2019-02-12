import { connect } from 'react-redux';
import { fetchCurrencies, getCurrenciesWithout } from '../currencies';
import { fetchRates, getRate, getLatestTimestamp } from '../rates';
import { setBaseCurrency, getBaseCurency } from '../user';
import { getError } from '../ui';
import { RootState } from '../types';
import Converter from './presenter';

const mapStateToProps = (state: RootState) => ({
  rate: (currency: string) => getRate(state, currency),
  baseCurrency: getBaseCurency(state),
  currenciesFrom: getCurrenciesWithout(state),
  currenciesTo: getCurrenciesWithout(state, getBaseCurency(state)),
  timestamp: getLatestTimestamp(state),
  hasError: getError(state)
});

const mapDispatchToProps = {
  fetchCurrencies,
  fetchRates,
  setBaseCurrency
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Converter);
