import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { productsReducer } from '../features/products/productsSlice';
import { categoriesReducer } from '../features/categories/categoriesSlice';
import storage from 'redux-persist/lib/storage';
import {persistReducer} from 'redux-persist';
import { FLUSH, PAUSE, PERSIST, REHYDRATE, PURGE, REGISTER } from 'redux-persist/es/constants';
import persistStore from 'redux-persist/es/persistStore';

const usersPersistConfig = {
  key: 'shop:users',
  storage: storage,
  whitelist: ['user'],

};
const rootReducer = combineReducers({
  users: persistReducer(usersPersistConfig, usersReducer)
});
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, PAUSE, PERSIST, REHYDRATE, PURGE, REGISTER]
    }
  })
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;