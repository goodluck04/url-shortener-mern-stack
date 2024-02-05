import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userSlice from './features/user/userSlice';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// created redux store and persisted user 
const rootReducer = combineReducers({ user: userSlice });

const persistConfig = {
  key: 'root',
  storage,
  version: 1,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
    
});

export const persistor = persistStore(store);