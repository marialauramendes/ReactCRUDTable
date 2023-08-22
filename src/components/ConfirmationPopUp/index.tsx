import React, { ReactElement, useState } from 'react';
import { Popconfirm } from 'antd';

type Props = {
  title: string;
  description: string;
  open: boolean;
  close: () => void;
  confirm: () => void;
  children: ReactElement;
};

function ConfirmationPopUp({ title, description, open, close, confirm, children }: Props) {
  const [confirmLoading, setConfirmLoading] = useState(false);

  const handleOk = () => {
    setConfirmLoading(true);
    confirm();
    setTimeout(() => {
      close();
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    close();
  };

  return (
    <Popconfirm
      title={title}
      description={description}
      open={open}
      onConfirm={handleOk}
      okButtonProps={{ loading: confirmLoading }}
      onCancel={handleCancel}
    >
      {children}
    </Popconfirm>
  );
}

export { ConfirmationPopUp };
