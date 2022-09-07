import React, { FC } from 'react';
import {
  BrowserRouter as Router, Routes, Route, Navigate, Outlet,
} from 'react-router-dom';
import { Provider } from 'react-redux';

import store from './services/store';

import BasicLayout from './components/BasicLayout';

import Auth from './pages/Auth';
import Accounts from './pages/Accounts';

import { useGetAccountsQuery } from './services/accounts/api';

const CheckPermissions: FC = () => {
  const { isError } = useGetAccountsQuery({});
  const token = localStorage.getItem('accessToken');

  if (isError || !token) {
    return <Navigate to="/auth/login" />;
  }

  return <Outlet />;
};

const App: FC = () => (
  <Provider store={store}>
    <Router>
      <Routes>
          <Route element={<CheckPermissions />}>
            <Route element={<BasicLayout />}>
              <Route path='/' element={<Navigate to={'/accounts'} />} />
              <Route path='/accounts/*' element={<Accounts />} />
            </Route>
          </Route>
        <Route path='/auth/*' element={<Auth />} />
      </Routes>
    </Router>
  </Provider>
);

export default App;
