import { useState } from 'react';
import { Table, Button } from 'antd';
import type { TableProps } from 'antd/es/table';
import { PostType, TheadType } from '../../types';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { ConfirmationPopUp } from '../../components/ConfirmationPopUp';
import { FormModal } from '../../components/Form';

type Props = {
  data?: PostType[];
  thead: TheadType[];
  onChange: TableProps<PostType>['onChange'];
  editItem: (params: PostType) => {};
  deleteItem: (params: PostType) => {};
  disableButtons?: boolean;
};

function TableWrapper({ data, thead, onChange, editItem, deleteItem, disableButtons }: Props) {
  const [openOpenPopUp, setOpenPopUp] = useState<number | false>(false);
  const [editForm, setEditForm] = useState<PostType | false>(false);

  const dataSource = data?.map(item => ({
    ...item,
    edit: (
      <div style={{ display: 'flex', justifyContent: 'space-around' }}>
        <Button
          icon={<EditOutlined />}
          onClick={() => setEditForm(item)}
          disabled={disableButtons}
          loading={disableButtons}
        />
        <ConfirmationPopUp
          title="Deletar"
          description={`Deseja confirmar a exclusão do item ${item.id}? Esta ação não poderá ser desfeita.`}
          open={openOpenPopUp === item.id || false}
          close={() => setOpenPopUp(false)}
          confirm={() => deleteItem(item)}
        >
          <Button
            icon={<DeleteOutlined />}
            onClick={() => setOpenPopUp(item.id)}
            disabled={disableButtons}
            loading={disableButtons}
          />
        </ConfirmationPopUp>
      </div>
    ),
  }));

  return (
    <>
      <Table columns={thead} dataSource={dataSource} onChange={onChange} />
      {editForm && (
        <FormModal
          title={`Editar Post #${editForm.id}`}
          dataEdit={editForm}
          open={!!editForm}
          close={() => setEditForm(false)}
          confirm={dataEdit => editItem(dataEdit)}
        />
      )}
    </>
  );
}

export { TableWrapper };
