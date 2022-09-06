import React, { FC } from 'react';
import {
  BrowserRouter as Router, Routes, Route, Navigate, Link as RouterLink,
} from 'react-router-dom';
import styled from 'styled-components';

import {
  Layout, Menu, Typography,
} from 'antd';

import logo from './assets/logo.png';

import Accounts from './pages/Accounts';

const { Content, Footer, Header } = Layout;
const { Text, Link } = Typography;

const Styled = {
  Layout: styled(Layout)`
    min-height: 100vh;
  `,

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
};

const App: FC = () => (
  <Router>
    <Styled.Layout>
      <Header>
        <Styled.HeaderContainer>
          <RouterLink to="/">
            <Styled.Logo src={logo} alt="logo" />
          </RouterLink>
          <Menu
            theme='dark'
            mode='horizontal'
            defaultSelectedKeys={['2']}
            items={[
              {
                key: 'users',
                label: 'Accounts',
              },
            ]}
            style={{ flexGrow: 1 }}
          />
        </Styled.HeaderContainer>
      </Header>

      <Content>
            <Routes>
              <Route path='/' element={<Navigate to={'/accounts'} />} />
              <Route path='/accounts/*' element={<Accounts />} />
            </Routes>
      </Content>

      <Footer>
        <Text>
          Created by <Link href='https://github.com/clickrouc' target='_blank'>
            @clickrouc
          </Link>
        </Text>
      </Footer>
    </Styled.Layout>
  </Router>
);

export default App;
