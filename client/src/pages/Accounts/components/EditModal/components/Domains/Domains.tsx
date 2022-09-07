import React, { FC } from 'react';

import {
  Button, Form, Input, Divider,
} from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

import Cookies from './components/Cookies';

const Domains: FC = () => (
  <Form.List name="cookies">
    {(fields, { add, remove }) => (
      <>
        {fields.map((field) => (
          <div key={field.key} style={{ display: 'flex', flexDirection: 'column' }}>
            <Divider style={{ borderTop: '1px solid black' }} />

            <Button
              type="primary"
              danger
              onClick={() => { remove(field.name); }}
              style={{
                margin: '0 0 24px auto',
              }}
              icon={<DeleteOutlined />}
              shape="circle"
              size="middle"
              title="Remove domain"
            />

            <Form.Item
              {...field}
              label="Domain"
              name={[field.name, 'name']}
              rules={[{ required: true, message: 'Missing domain name' }]}
            >
              <Input />
            </Form.Item>

            <Cookies fieldKey={field.name} />
          </div>
        ))}

        <Divider style={{ borderTop: '1px solid black' }} />

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button
            type="primary"
            onClick={() => { add(); }}
          >
            Add domain
          </Button>
        </Form.Item>
      </>
    )}
  </Form.List>
);

export default Domains;
