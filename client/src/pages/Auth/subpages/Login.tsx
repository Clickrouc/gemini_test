import React, { FC } from 'react';
import styled from 'styled-components';

import {
  Form, Input, Button, Space, Typography, message,
} from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { useSignInMutation } from '../../../services/auth/api';
import { convertError } from '../../../utils';

const Styled = {
  Container: styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: center;
    align-items: center;
  `,
};

const Login: FC = () => {
  const navigate = useNavigate();

  const [login] = useSignInMutation();

  const handleSubmit = (values: any) => {
    login(values).then((res: any) => {
      if (res.error) return message.error(convertError(res.error));
      localStorage.setItem('accessToken', res.data.tokens.access.token);
      localStorage.setItem('refreshToken', res.data.tokens.refresh.token);
      navigate('/accounts');
      return null;
    });
  };

  return (
    <Styled.Container>
      <Typography.Title>
        Login
      </Typography.Title>

      <Form onFinish={handleSubmit}>
        <Form.Item
          name="email"
          rules={[
            {
              type: 'email',
              message: 'The input is not valid E-mail!',
            },
            {
              required: true,
              message: 'Please input your email!',
            },
          ]}
        >
          <Input prefix={<UserOutlined />} placeholder="Username" />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your Password!',
            },
          ]}
        >
          <Input.Password
            prefix={<LockOutlined />}
            placeholder="Password"
          />
        </Form.Item>

        <Form.Item>
          <Space direction="vertical" align="center" style={{ width: '100%' }}>
            <Button type="primary" htmlType="submit">
              Log in
            </Button>

            <Typography.Text>
              Or <Link to="/auth/register">register now!</Link>
            </Typography.Text>
          </Space>
        </Form.Item>
      </Form>
    </Styled.Container>
  );
};

export default Login;
