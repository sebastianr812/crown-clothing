import React from 'react';
// import ReactDOM from 'react-dom/client';
// import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { render } from 'react-dom';

import App from './App';

import { Provider } from 'react-redux';
import { store, persistor } from './store/store';

import { PersistGate } from 'redux-persist/integration/react';
import { Elements } from '@stripe/react-stripe-js';
import { stripePromise } from './utils/stripe/stripe.utils';

import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import './index.scss';

// const root = ReactDOM.createRoot(document.getElementById('root'));

const rootElement = document.getElementById('root');

render(
  <React.StrictMode>
    <Provider loading={null} store={store}>
      <PersistGate persistor={persistor}>
        <BrowserRouter>
          <Elements stripe={stripePromise}  >
            <App />
          </Elements>
        </BrowserRouter>
      </PersistGate>
    </Provider>

  </React.StrictMode>,
  rootElement
);

serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
