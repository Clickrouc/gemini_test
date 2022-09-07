import React, { FC } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

import {
  Form, Input, Button, Space, Typography, message,
} from 'antd';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';

import { useRegistrationMutation } from '../../../services/auth/api';
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

const Register: FC = () => {
  const navigate = useNavigate();

  const [register] = useRegistrationMutation();

  const handleSubmit = (values: any) => {
    register(values).then((res: any) => {
      if (res.error) return message.error(convertError(res.error));
      navigate('/auth/login');
      return message.success('User is created');
    });
  };

  return (
    <Styled.Container>
      <Typography.Title>
        Registration
      </Typography.Title>

      <Form onFinish={handleSubmit}>
        <Form.Item
          name="name"
          rules={[
            {
              required: true,
              message: 'Please input your name!',
            },
          ]}
        >
          <Input prefix={<UserOutlined />} placeholder="Username" />
        </Form.Item>

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
          <Input prefix={<MailOutlined />} placeholder="Mail" />
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
              Submit
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </Styled.Container>
  );
};

export default Register;
