import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
//________ ROUTER _________
import {
  BrowserRouter as Router
} from "react-router-dom";
//________ REDUX _________
import {applyMiddleware, compose, createStore} from "redux";
import rootReducer from './storage/reducers/rootReducer'
import {Provider} from "react-redux";
import thunk from "redux-thunk";
// ______________ DEV TOOLS INIT _______________
const composeEnhancers =
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
        : compose;
// ______________ STORE INIT _______________
const store = createStore(
    rootReducer,
    composeEnhancers(
        applyMiddleware(
            thunk,
            // logger
        )
    )
);


const app = (
    <Provider store={store}>
      <Router>
        <App/>
      </Router>
    </Provider>
);


ReactDOM.render(app, document.getElementById('root'));
serviceWorker.unregister();
