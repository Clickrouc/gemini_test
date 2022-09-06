import React, { FC, ReactNode } from 'react';
import styled from 'styled-components';

import { Layout, Typography } from 'antd';

import LayoutHeader from './components/LayoutHeader';

const { Content, Footer } = Layout;
const { Text, Link } = Typography;

const Styled = {
  Layout: styled(Layout)`
    min-height: 100vh;
  `,
};

interface Props {
  children: ReactNode
}

const BasicLayout: FC<Props> = ({ children }) => (
  <Styled.Layout>
    <LayoutHeader />

    <Content>
      {children}
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
