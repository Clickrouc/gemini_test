import React, {
  Dispatch, FC, SetStateAction,
} from 'react';

import { Button, Modal, Typography } from 'antd';

import { IAccount } from '../../../services/accounts/types';

const { Text } = Typography;

interface Props {
  isOpened: boolean;
  setIsOpened: Dispatch<SetStateAction<boolean>>;
  switchedItem: IAccount | null;
  setSwitchedItem: Dispatch<SetStateAction<IAccount | null>>;
  switchItem: () => void;
}

const SwitchModal: FC<Props> = ({
  isOpened,
  setIsOpened,
  switchedItem,
  setSwitchedItem,
  switchItem,
}) => {
  const closeModal = (): void => {
    setIsOpened(false);
    setSwitchedItem(null);
  };

  return (
    <Modal
      title="Switch user"
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
          onClick={switchItem}
        >
          Submit
        </Button>,
      ]}
    >
      <Text>
        Are you sure you want to
        {' '}
        {switchedItem?.disabled ? 'enable' : 'disable'}
        {' '}
        account?
      </Text>
    </Modal>
  );
};

export default SwitchModal;
