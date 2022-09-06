import React, { FC, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import {
  Button, Form, Input, Modal, Select,
} from 'antd';

import {
  accounts, IAccount, ICookie, proxies,
} from '../../mock';

import Domains from './components/Domains';

interface IFieldsCookie {
  name: string;
  cookies: ICookie;
}

interface IFields {
  username: string;
  password: string;
  proxies?: string[];
  userAgent?: string;
  cookies: IFieldsCookie[];
}

const EditModal: FC = () => {
  const [form] = Form.useForm();

  const params = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState<IAccount | null>(null);

  useEffect(() => {
    if (!params.id) navigate('/accounts/edit/new');
    if (params.id === 'new') return;
    setData(accounts.find((item) => item._id === params.id) || null);
  }, []);

  useEffect(() => {
    if (!data) return;

    form.setFieldsValue({
      username: data?.username,
      password: data?.password,
      proxies: data?.proxies || [],
      userAgent: data?.userAgent,
      cookies: (Object.keys(data?.cookies || {})).map((key) => ({
        name: key,
        cookies: data?.cookies[key],
      })),
    });
  }, [data]);

  const onFinish = (values: IFields) => {
    const cookies: { [key: string]: ICookie } = {};
    values.cookies.forEach((cookie) => {
      cookies[cookie.name] = cookie.cookies;
    });
    const request = {
      ...values,
      cookies,
    };

    // TODO: Need to create method for saving account
    console.log('Success:', request);
  };

  return (
    <Modal
      title="Edit account"
      open={true}
      onCancel={() => {
        navigate('/accounts');
      }}
      footer={[
        <Button
          key="back"
          onClick={() => {
            navigate('/accounts');
          }}
        >
          Cancel
        </Button>,
        <Button
          key="submit"
          type="primary"
          onClick={() => {
            form
              .validateFields()
              .then((values) => {
                form.resetFields();
                onFinish(values);
              })
              .catch((info) => {
                console.log('Validate Failed:', info);
              });
          }}
        >
          Submit
        </Button>,
      ]}
    >
      <Form
        form={form}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        size="small"
        onFinish={onFinish}
        scrollToFirstError
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: 'Please input username!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input password!' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          label="User Agent"
          name="userAgent"
        >
          <Input.TextArea
            autoSize={{ minRows: 3, maxRows: 8 }}
          />
        </Form.Item>

        <Form.Item
          label="Proxies"
          name="proxies"
        >
          <Select
            mode="multiple"
            allowClear
            placeholder="Please select"
          >
            {proxies.map((proxy, index) => (
              <Select.Option key={index} value={proxy.label}>
                {proxy.label}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Domains />
      </Form>
    </Modal>
  );
};

export default EditModal;
