import React, { useState, ReactElement } from 'react';
import { Modal, Form, Input, Button } from 'antd';
import { PostType } from '../../types';

type Props = {
  title: string;
  dataEdit: PostType;
  open: boolean;
  close: () => void;
  confirm: (values: PostType) => void;
  children: ReactElement;
};

function FormModal({ title, dataEdit, open, close, confirm, children }: Props) {
  const [confirmLoading, setConfirmLoading] = useState(false);

  const { TextArea } = Input;

  const onFinish = (values: PostType) => {
    setConfirmLoading(true);
    confirm(values);
    setTimeout(() => {
      close();
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    close();
  };

  return (
    <>
      {children}
      <Modal title={title} open={open} onCancel={handleCancel}>
        <Form layout="vertical" initialValues={dataEdit} onFinish={onFinish}>
          <Form.Item label="ID do usuário" name="userId">
            <Input disabled />
          </Form.Item>
          <Form.Item label="ID da Postagem" name="id">
            <Input disabled />
          </Form.Item>
          <Form.Item label="Título da Postagem" name="title">
            <Input required />
          </Form.Item>
          <Form.Item label="Conteúdo da Postagem" name="body">
            <TextArea showCount maxLength={140} style={{ height: 120, resize: 'none' }} required />
          </Form.Item>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
            <Button danger onClick={handleCancel}>
              Cancelar
            </Button>
            <Button type="primary" htmlType="submit" loading={confirmLoading}>
              Salvar Alterações
            </Button>
          </div>
        </Form>
      </Modal>
    </>
  );
}

export { FormModal };
