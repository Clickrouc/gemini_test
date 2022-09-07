import React, { FC, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import {
  Button, Form, Input, message, Modal, Select,
} from 'antd';

import { IAccount, ICookie } from '../../../../services/accounts/types';
import { useUpdateAccountMutation } from '../../../../services/accounts/api';
import Domains from './components/Domains';
import { cookieConverter, convertError } from '../../../../utils';
import { useGetProxiesQuery } from '../../../../services/proxies/api';
import { IProxy } from '../../../../services/proxies/types';

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
  disabled: boolean;
}

interface Props {
  accounts: IAccount[];
}

const EditModal: FC<Props> = ({ accounts }) => {
  const [form] = Form.useForm();

  const params = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState<IAccount | null>(null);
  const [isLoading, setLoading] = useState<boolean>(false);

  const [createAccount] = useUpdateAccountMutation();
  const { data: proxies } = useGetProxiesQuery({});

  useEffect(() => {
    form.setFieldsValue({
      proxies: [],
      cookies: [],
    });
  }, [form]);

  useEffect(() => {
    if (!params.id) navigate('/accounts/edit/new');
    if (params.id === 'new') return;
    setData(accounts.find((item) => item.id === params.id) || null);
  }, [accounts, navigate, params.id]);

  useEffect(() => {
    if (!data) return;

    form.setFieldsValue({
      id: data?.id,
      username: data?.username,
      password: data?.password,
      proxies: data?.proxies || [],
      userAgent: data?.userAgent,
      cookies: (Object.keys(data?.cookies || {})).map((key) => ({
        name: key,
        cookies: data?.cookies[key],
      })),
      disabled: data?.disabled ? data.disabled : false,
    });
  }, [data, form]);

  const onFinish = (values: IFields) => {
    const cookies: { [key: string]: ICookie } = {};
    values.cookies.forEach((cookie) => {
      cookies[cookie.name] = cookie.cookies;
    });
    const request = {
      ...values,
      cookies: cookieConverter(cookies),
    };

    setLoading(true);
    createAccount(request).then((res: any) => {
      setLoading(false);
      if (res.error) return message.error(convertError(res.error));
      message.success('Account has been updated successfully');
      navigate('/accounts');
      return null;
    });
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
            form.validateFields().then(onFinish);
          }}
          loading={isLoading}
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
        <Form.Item name="id" noStyle>
          <Input type="hidden" />
        </Form.Item>

        <Form.Item name="disabled" noStyle>
          <Input type="hidden" />
        </Form.Item>

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
            {(proxies?.results || []).map((proxy: IProxy) => (
              <Select.Option key={proxy.id} value={proxy.name}>
                {proxy.name}
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
