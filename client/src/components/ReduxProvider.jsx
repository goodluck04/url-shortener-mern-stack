"use client";
import React from "react";
import { Provider } from "react-redux";
import { Toaster } from "./ui/toaster";
import { store } from "@/redux/store";

// this will redux provider
const ReduxProvider = ({ children }) => {
  return (
    <Provider store={store}>
      <>{children}</>
      <Toaster />
    </Provider>
  );
};

export default ReduxProvider;
