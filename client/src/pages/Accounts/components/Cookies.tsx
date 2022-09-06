import React, { FC } from 'react';

import {
  Button, Checkbox, Divider, Form, Input,
} from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

interface Props {
  fieldKey: number;
}

const Cookies: FC<Props> = ({ fieldKey }) => (
  <Form.List name={[fieldKey, 'cookies']}>
    {(fields, { add, remove }) => (
      <>
        {fields.map((field) => (
          <div key={`${field.key}`} style={{ display: 'flex', flexDirection: 'column' }}>
            <Divider />

            <Button
              type="default"
              danger
              onClick={() => { remove(field.name); }}
              style={{
                margin: '0 0 16px auto',
              }}
              icon={<DeleteOutlined />}
              shape="circle"
              title="Remove cookie"
            />

            <Form.Item
              {...field}
              key="name"
              label="Name"
              name={[field.name, 'name']}
              rules={[{ required: true, message: 'Missing cookie name' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              {...field}
              key="value"
              label="Value"
              name={[field.name, 'value']}
              rules={[{ required: true, message: 'Missing cookie value' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              {...field}
              key="path"
              label="Path"
              name={[field.name, 'path']}
            >
              <Input />
            </Form.Item>

            <Form.Item
              {...field}
              key="expires"
              label="Expiration time"
              name={[field.name, 'expires']}
            >
              <Input />
            </Form.Item>

            <Form.Item
              {...field}
              key="secure"
              name={[field.name, 'secure']}
              valuePropName="checked"
              wrapperCol={{ offset: 8, span: 16 }}
            >
              <Checkbox>
                Secure
              </Checkbox>
            </Form.Item>
          </div>
        ))}

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button
            type="default"
            onClick={() => { add(); }}
          >
            Add cookie
          </Button>
        </Form.Item>
      </>
    )}
  </Form.List>
);

export default Cookies;
