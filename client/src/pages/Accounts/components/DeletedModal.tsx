import React, {
  Dispatch, FC, FormEvent, SetStateAction, useState,
} from 'react';

import {
  Button, Input, Modal, Space, Typography,
} from 'antd';

import { IAccount } from '../../../services/accounts/types';

const { Text } = Typography;

interface Props {
  isOpened: boolean;
  setIsOpened: Dispatch<SetStateAction<boolean>>;
  deletedItem: IAccount | null;
  setDeletedItem: Dispatch<SetStateAction<IAccount | null>>;
  removeItem: () => void;
}

const DeletedModal: FC<Props> = ({
  isOpened,
  setIsOpened,
  deletedItem,
  setDeletedItem,
  removeItem,
}) => {
  const [deleteButtonDisabled, setDeleteButtonDisabled] = useState<boolean>(true);
  const [usernameChecker, setUsernameChecker] = useState<string>('');

  const closeModal = (): void => {
    setIsOpened(false);
    setDeletedItem(null);
    setUsernameChecker('');
    setDeleteButtonDisabled(true);
  };

  return (
    <Modal
      title="Remove user"
      open={isOpened}
      onCancel={closeModal}
      footer={[
        <Button
          key="back"
          onClick={closeModal}
        >
          Cancel
        </Button>,
        <Button
          key="submit"
          type="primary"
          onClick={removeItem}
          disabled={deleteButtonDisabled}
        >
          Submit
        </Button>,
      ]}
    >
      <Space direction="vertical" style={{ width: '100%' }}>
        <Text type="danger">
          Please input username to be sure will be deleted
        </Text>

        <Input
          placeholder="Enter username of deleted account"
          value={usernameChecker}
          onChange={(e: FormEvent): void => {
            const target = e.target as HTMLInputElement;
            setUsernameChecker(target.value);
            setDeleteButtonDisabled(target.value !== deletedItem?.username);
          }}
        />
      </Space>
    </Modal>
  );
};

export default DeletedModal;
