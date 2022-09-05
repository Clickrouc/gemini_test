import React, { FC } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import List from './subpages/List';

const Accounts: FC = () => (
  <Routes>
    <Route path="" element={<Navigate to="/accounts/list" />} />
    <Route path="list" element={<List />} />
  </Routes>
);

export default Accounts;
