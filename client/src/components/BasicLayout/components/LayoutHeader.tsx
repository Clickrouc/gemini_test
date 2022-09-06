import React, { FC } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import styled from 'styled-components';

import { Layout, Menu } from 'antd';

import logo from '../../../assets/logo.png';

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
};

const LayoutHeader: FC = () => {
  const location = useLocation();

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
      </Styled.HeaderContainer>
    </Header>
  );
};

export default LayoutHeader;
