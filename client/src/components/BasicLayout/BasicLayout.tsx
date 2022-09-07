import React, { FC } from 'react';
import styled from 'styled-components';

import { Layout, Typography } from 'antd';

import { Outlet } from 'react-router-dom';
import LayoutHeader from './components/LayoutHeader';

const { Content, Footer } = Layout;
const { Text, Link } = Typography;

const Styled = {
  Layout: styled(Layout)`
    display: flex;
    flex-direction: column;
    min-height: 100%;
  `,
};

const BasicLayout: FC = () => (
  <Styled.Layout>
    <LayoutHeader />

    <Content>
      <Outlet />
    </Content>

    <Footer>
      <Text>
        Created by <Link href='https://github.com/clickrouc' target='_blank'>
        @clickrouc
      </Link>
      </Text>
    </Footer>
  </Styled.Layout>
);

export default BasicLayout;
