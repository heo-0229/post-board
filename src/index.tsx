import React from 'react';
import ReactDOM from 'react-dom';
import './styles/reset.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';

// store
import { Provider } from 'react-redux';
import store from './redux/configureStore';
// persist
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';

const persistor = persistStore(store);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);

reportWebVitals();
