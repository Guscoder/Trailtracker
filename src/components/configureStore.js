import { applyMiddleware, createStore, compose } from 'redux';
import { verifyAuth } from '../actions/';
import rootReducer from '../reducers';
import thunk from 'redux-thunk';

const composeEnhancers =
  (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      trace: true,
      traceLimit: 25,
    })) ||
  compose;

export default function configureStore(persistedState) {
  const store = createStore(
    rootReducer,
    persistedState,
    composeEnhancers(applyMiddleware(thunk))
  );
  store.dispatch(verifyAuth());
  return store;
}
