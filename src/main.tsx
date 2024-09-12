import React from 'react';
import ReactDOM from 'react-dom/client'; // Ensure you are using the new createRoot API for React 18
import { Provider } from 'react-redux';
import App from './App';
import { store } from './store/store';
import './App.css';

const rootElement = document.getElementById('root');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <Provider store={store}> {/* Wrap your App with Provider */}
      <App />
    </Provider>
  );
}
