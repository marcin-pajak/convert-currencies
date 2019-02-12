import { applyMiddleware, createStore, combineReducers } from 'redux';
import { combineEpics, createEpicMiddleware } from 'redux-observable';
import { ajax } from 'rxjs/ajax';
import currencies, { currenciesEpics } from './currencies';
import rates, { ratesEpics } from './rates';
import ui from './ui';
import user from './user';

export const epicService = { getJSON: ajax.getJSON };
const epicMiddleware = createEpicMiddleware({
  dependencies: epicService
});
const create = () => {
  const rootReducer = combineReducers({ currencies, rates, user, ui });
  const rootEpic = combineEpics(...currenciesEpics, ...ratesEpics);

  const store = createStore(rootReducer, applyMiddleware(epicMiddleware));

  epicMiddleware.run(rootEpic);

  return store;
};

export default create;
