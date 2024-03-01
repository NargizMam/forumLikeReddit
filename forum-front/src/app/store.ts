import {combineReducers, configureStore} from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import {persistReducer} from 'redux-persist';
import {FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE} from 'redux-persist/es/constants';
import persistStore from 'redux-persist/es/persistStore';
import {usersReducer} from "../features/users/usersSlice.ts";
import {postsReducer} from "../features/posts/postSlice.ts";
import {commentsReducer} from "../features/comments/commentsSlice.ts";

const usersPersistConfig = {
  key: 'shop:users',
  storage: storage,
  whitelist: ['user'],

};
const rootReducer = combineReducers({
  comments: commentsReducer,
  posts: postsReducer,
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

export const persist = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;