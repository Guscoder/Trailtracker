import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore, combineReducers, compose } from 'redux';
import App from './components/App';
import rootReducer from './reducers';
import thunk from 'redux-thunk';
import 'bootstrap/dist/css/bootstrap.min.css';

// import { ReactReduxFirebaseProvider, getFirebase } from "react-redux-firebase";
// import { createFirestoreInstance, getFirestore } from "redux-firestore";
// import { firebase, firebaseConfig } from "./firebaseConfig";

const composeEnhancers =
  (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      trace: true,
      traceLimit: 25,
    })) ||
  compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
