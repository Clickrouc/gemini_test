import React, { FC } from 'react';
import { ApiProvider } from '@reduxjs/toolkit/dist/query/react';
import {
  BrowserRouter as Router, Routes, Route, Navigate,
} from 'react-router-dom';

import { apiSlice } from './features/api/apiSlice';

import BasicLayout from './components/BasicLayout';
import Accounts from './pages/Accounts';

const App: FC = () => (
  <ApiProvider api={apiSlice}>
    <Router>
      <BasicLayout>
        <Routes>
          <Route path='/' element={<Navigate to={'/accounts'} />} />
          <Route path='/accounts/*' element={<Accounts />} />
        </Routes>
      </BasicLayout>
    </Router>
  </ApiProvider>
);

export default App;
