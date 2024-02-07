"use client"
import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./features/api/apiSlice";
import authSlice from "./features/auth/authSlice";
import { useSelector } from "react-redux";

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authSlice,
    },
    devTools: true, // letter make it false
    middleware: (getDefaultMiddeware) => getDefaultMiddeware().concat(apiSlice.middleware)
});

// function on every page load or refresh
const initializeApp = async () => {
    await store.dispatch(apiSlice.endpoints.loadUser.initiate({}, { forceRefetch: true }));
}

initializeApp();