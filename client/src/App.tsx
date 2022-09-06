import React, { FC } from 'react';
import {
  BrowserRouter as Router, Routes, Route, Navigate,
} from 'react-router-dom';
import BasicLayout from './components/BasicLayout';
import Accounts from './pages/Accounts';

const App: FC = () => (
  <Router>
    <BasicLayout>
      <Routes>
        <Route path='/' element={<Navigate to={'/accounts'} />} />
        <Route path='/accounts/*' element={<Accounts />} />
      </Routes>
    </BasicLayout>
  </Router>
);

export default App;
