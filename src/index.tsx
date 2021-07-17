import React from 'react';
import ReactDOM from 'react-dom';
import './styles/reset.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';

// store
import { Provider } from 'react-redux';
import store from './redux/configureStore';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);

reportWebVitals();
