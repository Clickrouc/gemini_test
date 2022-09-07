import React, { FC, useEffect, useState } from 'react';
import {
  Link, Route, Routes,
} from 'react-router-dom';
import styled from 'styled-components';

import {
  Button, Checkbox, Col, message, Row, Space, Switch, Table, Tag,
} from 'antd';
import { DeleteOutlined, EditOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { ColumnsType } from 'antd/es/table';

import { IAccount, ICookie } from '../../services/accounts/types';
import bp from '../../services/breakpoints';

import EditModal from './components/EditModal/EditModal';
import DeletedModal from './components/DeletedModal';
import SwitchModal from './components/SwitchModal';
import {
  useDeleteAccountMutation,
  useGetAccountsQuery,
  useUpdateAccountMutation,
} from '../../services/accounts/api';
import { cookieConverter, convertError } from '../../utils';

const Styled = {
  Header: styled.div`
    padding: 24px 24px 0;
    
    @media(min-width: ${bp.tabletL}) {
      padding: 24px 48px 0;
    }
  `,

  TableContainer: styled.div`
    max-width: 100%;
    padding: 0 0 0 24px;
    
    overflow: auto;

    @media(min-width: ${bp.tabletP}) {
      padding: 0 24px;
    }

    @media(min-width: ${bp.tabletL}) {
      padding: 0 48px;
    }
  `,
};

const Accounts: FC = () => {
  const [deletedItem, setDeletedItem] = useState<IAccount | null>(null);
  const [isRemoveModalOpen, setIsRemoveModalOpen] = useState<boolean>(false);
  const [switchedItem, setSwitchedItem] = useState<IAccount | null>(null);
  const [isSwitchModalOpen, setIsSwitchModalOpen] = useState<boolean>(false);
  const [showedPasswords, setShowedPasswords] = useState<{ [key: string]: boolean }>({});
  const [accounts, setAccounts] = useState<IAccount[]>([]);

  const { data } = useGetAccountsQuery({});
  const [updateAccount] = useUpdateAccountMutation();
  const [deleteAccount] = useDeleteAccountMutation();

  useEffect(() => {
    if (!data) return;
    setShowedPasswords({});

    const arr: IAccount[] = [];
    const passwords: { [key: string]: boolean } = {};
    (data?.results || []).forEach((item: any) => {
      passwords[item.id] = false;
      arr.push({
        ...item,
        cookies: cookieConverter(item.cookies, true),
      });
    });

    setShowedPasswords(passwords);
    setAccounts(arr);
  }, [data]);

  const removeItem = (): void => {
    deleteAccount({
      accountId: deletedItem?.id,
    }).then((res: any) => {
      if (res.error) return message.error(convertError(res.error));
      setIsRemoveModalOpen(false);
      return message.success('Account has been deleted successfully');
    });
  };

  const switchItem = (): void => {
    const account: IAccount | undefined = accounts.find((item) => item.id === switchedItem?.id);
    if (account) {
      account.disabled = !account.disabled;
      updateAccount(account).then((res: any) => {
        if (res.error) return message.error(convertError(res.error));
        setIsSwitchModalOpen(false);
        return message.success('Account has been switched successfully');
      });
    } else {
      message.error('Something went wrong');
    }
  };

  const columns: ColumnsType<IAccount> = [
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
      sorter: (a, b) => {
        if (a.username < b.username) return -1;
        if (a.username > b.username) return 1;
        return 0;
      },
    },
    {
      title: 'Password',
      dataIndex: 'password',
      key: 'password',
      render: (_, { id, password }) => (
        <>
          {showedPasswords[id] ? password : '*****'}<br />
          <Checkbox
            checked={showedPasswords[id]}
            onChange={(e) => {
              setShowedPasswords({
                ...showedPasswords,
                [id]: e.target.checked,
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
      render: (_, item) => (
        <Switch
          checked={!item.disabled}
          onChange={() => {
            setSwitchedItem(item);
            setIsSwitchModalOpen(true);
          }}
        />
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, item) => (
        <Space>
          <Link to={`/accounts/edit/${item.id}`}>
            <Button type="text" icon={<EditOutlined />} />
          </Link>

          <Button
            type="text"
            icon={<DeleteOutlined />}
            onClick={() => {
              setDeletedItem(item);
              setIsRemoveModalOpen(true);
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
          dataSource={accounts || []}
          columns={columns}
          pagination={false}
          rowKey="id"
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

                {record.proxies?.length ? (
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
                ) : null}

                {Object.keys(record.cookies)?.length ? (
                  <Row>
                    <Col span={4}>
                      <b>Cookies:</b>
                    </Col>

                    <Col span={20}>
                      <ul>
                        {Object.keys(record.cookies).map((key) => (
                          <li key={key}>
                            {key}
                            {// @ts-ignore
                              record.cookies?.[key] && (
                                <ul>
                                  {// @ts-ignore
                                    (record.cookies?.[key] || [])
                                      .map((item: ICookie, index: number) => (
                                        <li key={index}>
                                          Name={item.name};{' '}
                                          Value={item.value};{' '}
                                          {item.path && (`Path: '${item.path}'; `)}
                                          {item.expires && (`Expires: ${item.expires}; `)}
                                          {item.secure && ('Secure; ')}
                                        </li>
                                      ))}
                                </ul>
                              )}
                          </li>
                        ))}
                      </ul>
                    </Col>
                  </Row>
                ) : null}
              </Space>
            ),
          }}
          style={{ minWidth: '720px' }}
        />
      </Styled.TableContainer>

      <DeletedModal
        isOpened={isRemoveModalOpen}
        setIsOpened={setIsRemoveModalOpen}
        deletedItem={deletedItem}
        setDeletedItem={setDeletedItem}
        removeItem={removeItem}
      />

      <SwitchModal
        isOpened={isSwitchModalOpen}
        setIsOpened={setIsSwitchModalOpen}
        switchedItem={switchedItem}
        setSwitchedItem={setSwitchedItem}
        switchItem={switchItem}
      />

      <Routes>
        <Route path="edit" element={<EditModal accounts={accounts || []} />}>
          <Route path=":id" element={<EditModal accounts={accounts || []} />} />
        </Route>
      </Routes>
    </>
  );
};

export default Accounts;
