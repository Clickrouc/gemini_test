import { configureStore } from '@reduxjs/toolkit';
import { accountsApi } from './accounts/api';
import { authApi } from './auth/api';
import { proxiesApi } from './proxies/api';

const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [accountsApi.reducerPath]: accountsApi.reducer,
    [proxiesApi.reducerPath]: proxiesApi.reducer,
  },
  // @ts-ignore
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(
    authApi.middleware,
    accountsApi.middleware,
    proxiesApi.middleware,
  ),
  devTools: process.env.NODE_ENV === 'development',
});

export default store;
