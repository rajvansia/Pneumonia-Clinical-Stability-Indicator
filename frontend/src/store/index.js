import 'babel-polyfill';
import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { browserHistory } from 'react-router';
import { routerMiddleware } from 'react-router-redux';
import rootReducer from '../reducers';
import persistState, { mergePersistedState } from 'redux-localstorage';
import debounce from 'redux-localstorage-debounce';
import* as actions from '../actions'
import rootSaga from '../sagas'; // TODO: Next step

//  Returns the store instance
// It can  also take initialState argument when provided
const configureStore = () => {
  const sagaMiddleware = createSagaMiddleware();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  return {
    ...createStore(
      rootReducer, composeEnhancers(),
      applyMiddleware(sagaMiddleware),actions.PATIENT_SELECTED,
    ),

    runSaga: sagaMiddleware.run(rootSaga)

  };
};

export default configureStore;
