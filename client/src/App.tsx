import type { FC } from 'react';

import React from 'react';
import {
  BrowserRouter as Router, Routes, Route, Navigate,
} from 'react-router-dom';
import styled from 'styled-components';

import { Layout, Menu, Typography } from 'antd';
import Users from './pages/Users';

const { Content, Footer, Header } = Layout;
const { Text, Link } = Typography;

const Styled = {
  Layout: styled(Layout)`
    min-height: 100vh;
  `,

  Container: styled.div`
    padding: 24px 50px;
  `,
};

const App: FC = () => (
    <Styled.Layout>
        <Header>
            <Menu
                theme='dark'
                mode='horizontal'
                defaultSelectedKeys={['2']}
                items={[
                  {
                    key: 'users',
                    label: 'Users',
                  },
                ]}
            />
        </Header>

        <Content>
            <Styled.Container>
                <Router>
                    <Routes>
                        <Route path='/' element={<Navigate to={'/users'} />} />
                        <Route path='/users' element={<Users />} />
                    </Routes>
                </Router>
            </Styled.Container>
        </Content>

        <Footer>
            <Text>Created by <Link href='https://github.com/clickrouc' target='_blank'>@clickrouc</Link></Text>
        </Footer>
    </Styled.Layout>
);

export default App;
