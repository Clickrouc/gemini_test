import React, { FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import {
  Button, Checkbox, Col, Row, Space, Switch, Table, Tag,
} from 'antd';
import { DeleteOutlined, EditOutlined, PlusCircleOutlined } from '@ant-design/icons';

import DeletedModal from './components/DeletedModal';

// TODO: Need to fetch data from server
import data, { IAccount } from '../../mock';
import bp from '../../../../services/breakpoints';

const Styled = {
  Header: styled.div`
    padding: 24px 24px 0;
    
    @media(min-width: ${bp.tabletL}) {
      padding: 24px 48px 0;
    }
  `,

  TableContainer: styled.div`
    max-width: 100%;
    overflow: auto;
  `,
};

const List: FC = () => {
  const [deletedItem, setDeletedItem] = useState<IAccount | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [showedPasswords, setShowedPasswords] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    if (!data) return;
    setShowedPasswords({});

    data.forEach((item) => {
      setShowedPasswords({
        ...showedPasswords,
        [item._id]: false,
      });
    }, []);
  }, data);

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
      render: (_: any, { _id, password } : { _id: string, password: string }) => (
        <>
          {showedPasswords[_id] ? password : '*****'}<br />
          <Checkbox
            checked={showedPasswords[_id]}
            onChange={(e) => {
              setShowedPasswords({
                ...showedPasswords,
                [_id]: e.target.checked,
              });
            }}
          >
            show password
          </Checkbox>
        </>
      ),
    },
    {
      title: 'Switch',
      dataIndex: 'disabled',
      key: 'disabled',
      render: (_: any, { disabled } : { disabled: boolean }) => (
        <Switch defaultChecked={!disabled} onChange={toggleAccount} />
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
    <Styled.Header>
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
    </Styled.Header>

    <Styled.TableContainer>
      <Table
        dataSource={data}
        columns={columns}
        pagination={false}
        rowKey="_id"
        expandable={{
          expandedRowRender: (record) => (
            <Space direction="vertical" style={{ width: '100%' }}>
              {record.userAgent && (
                <Row>
                  <Col span={4}>
                    <b>User Agent:</b>
                  </Col>

                  <Col span={20}>
                    {record.userAgent}
                  </Col>
                </Row>
              )}

              {record.proxies?.length && (
                <Row>
                  <Col span={4}>
                    <b>Proxies:</b>
                  </Col>

                  <Col span={20}>
                    {record.proxies.map((proxy, index) => (
                      <Tag key={index}>{proxy}</Tag>
                    ))}
                  </Col>
                </Row>
              )}
            </Space>
          ),
        }}
        style={{ minWidth: '720px' }}
      />
    </Styled.TableContainer>

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
