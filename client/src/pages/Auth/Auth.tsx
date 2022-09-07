import React, { FC } from 'react';
import {
  Routes, Route, Navigate,
} from 'react-router-dom';
import styled from 'styled-components';

import { Layout } from 'antd';

import Login from './subpages/Login';
import Register from './subpages/Register';
import { useGetAccountsQuery } from '../../services/accounts/api';

const Styled = {
  Layout: styled(Layout)`
    display: flex;
    flex-direction: column;
    min-height: 100%;
  `,
};

const Auth: FC = () => {
  const { isError } = useGetAccountsQuery({});
  const token = localStorage.getItem('accessToken');

  if (isError) {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  }

  if (!isError && token) {
    return <Navigate to="/accounts" />;
  }

  return (
  <Styled.Layout>
    <Routes>
      <Route path="/" element={<Navigate to="/auth/login" />} />
      <Route path="login" element={<Login />}/>
      <Route path="register" element={<Register />} />
    </Routes>
  </Styled.Layout>
  );
};

export default Auth;
