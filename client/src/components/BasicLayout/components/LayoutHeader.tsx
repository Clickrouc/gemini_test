import React, { FC } from 'react';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

import {
  Button, Layout, Menu, message,
} from 'antd';
import { LogoutOutlined } from '@ant-design/icons';

import logo from '../../../assets/logo.png';
import { useLogoutMutation } from '../../../services/auth/api';
import { accountsApi } from '../../../services/accounts/api';
import { proxiesApi } from '../../../services/proxies/api';

import { convertError } from '../../../utils';

const { Header } = Layout;

const Styled = {
  HeaderContainer: styled.div`
    display: flex;
    align-items: center;
    gap: 16px;
  `,

  Logo: styled.img`
    flex-shrink: 0;
    display: block;
    height: 32px;
  `,

  Menu: styled(Menu)`
    flex-grow: 1;
  `,

  Logout: styled(Button)`
    flex-shrink: 0;
  `,
};

const LayoutHeader: FC = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const [logoutMethod] = useLogoutMutation();

  const logout = () => {
    logoutMethod({
      refreshToken: localStorage.getItem('refreshToken'),
    }).then((res: any) => {
      if (res.error) return message.error(convertError(res.error));
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      dispatch(accountsApi.util.resetApiState());
      dispatch(proxiesApi.util.resetApiState());
      navigate('/auth/login');
      return null;
    });
  };

  return (
    <Header>
      <Styled.HeaderContainer>
        <RouterLink to="/">
          <Styled.Logo src={logo} alt="logo" />
        </RouterLink>

        <Styled.Menu
          theme='dark'
          mode='horizontal'
          defaultSelectedKeys={['2']}
          items={[
            {
              key: 'accounts',
              label: 'Accounts',
            },
          ]}
          selectedKeys={[location.pathname.split('/')[1]]}
        />

        <Styled.Logout
          type="primary"
          danger
          shape="circle"
          icon={<LogoutOutlined />}
          onClick={logout}
        />
      </Styled.HeaderContainer>
    </Header>
  );
};

export default LayoutHeader;
