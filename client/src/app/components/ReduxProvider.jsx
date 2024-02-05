"use client"
import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from "@/app/redux/store"; 

// this will redux provider
const ReduxProvider = ({ children }) => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <div className="wrapper">
          {children}
        </div>
      </PersistGate>
    </Provider>
  );
};

export default ReduxProvider;
