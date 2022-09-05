import React, { FC, useState } from 'react';
import { Link } from 'react-router-dom';

import {
  Button, Col, Row, Space, Switch, Table,
} from 'antd';
import { DeleteOutlined, EditOutlined, PlusCircleOutlined } from '@ant-design/icons';

// TODO: Need to fetch data from server
import data, { IAccount } from '../../mock';
import DeletedModal from './components/DeletedModal';

const List: FC = () => {
  const [deletedItem, setDeletedItem] = useState<IAccount | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const removeItem = (): void => {
    console.log(deletedItem?._id);
    // TODO: Need to create method for removing account
  };

  const toggleAccount = (value: boolean): void => {
    console.log(value);
    // TODO: Need to create method for toggle account
  };

  const columns = [
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'Password',
      dataIndex: 'password',
      key: 'password',
    },
    {
      title: 'Switch',
      dataIndex: 'disabled',
      key: 'disabled',
      render: (_: any, { disabled } : { disabled: boolean }) => (
        <Switch defaultChecked={!disabled} onChange={toggleAccount}></Switch>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, item: IAccount) => (
        <Space>
          <Link to={`/accounts/edit/${item._id}`}>
            <Button type="text" icon={<EditOutlined />} />
          </Link>

          <Button
            type="text"
            icon={<DeleteOutlined />}
            onClick={() => {
              setDeletedItem(item);
              setIsModalOpen(true);
            }}
          />
        </Space>
      ),
    },
  ];

  return (
  <>
    <Row justify="space-between">
      <Col>
        <h1>Accounts</h1>
      </Col>

      <Col>
        <Link to="/accounts/edit/new">
          <Button type="primary" icon={<PlusCircleOutlined />}>
            Create
          </Button>
        </Link>
      </Col>
    </Row>

    <Table
      dataSource={data}
      columns={columns}
      pagination={false}
      rowKey="_id"
    />

    <DeletedModal
      isOpened={isModalOpen}
      setIsOpened={setIsModalOpen}
      deletedItem={deletedItem}
      setDeletedItem={setDeletedItem}
      removeItem={removeItem}
    />
  </>
  );
};

export default List;
