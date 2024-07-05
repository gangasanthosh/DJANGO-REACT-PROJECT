
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import './App.css';
import { persistor, store } from './redux/store/store';
import MainRoutes from './routes/router';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <MainRoutes />
        </Router>
      </PersistGate>
    </Provider>
  );
};

export default App;
