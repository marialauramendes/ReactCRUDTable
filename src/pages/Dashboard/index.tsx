import { useEffect, useState } from 'react';
import { createNewPost, getAllPosts, editPost, deletePost } from '../../service/api';

import { TableWrapper } from '../../components/TableWrapper';
import { FormModal } from '../../components/Form';

import { Layout, Spin, Button, Space } from 'antd';
import { PostType } from '../../types';
import type { TableProps } from 'antd/es/table';

function Dashboard() {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [counter, setCounter] = useState<number>(0);
  const [createFormModal, setCreateFormModal] = useState<boolean>(false);
  const [loading, setLoading] = useState<Boolean>(false);
  const [loadingButtons, setLoadingButtons] = useState<Boolean>(false);

  const { Content } = Layout;

  const thead = [
    {
      key: 'userId',
      dataIndex: 'userId',
      title: 'ID do usuário',
    },
    {
      key: 'id',
      dataIndex: 'id',
      title: 'ID da postagem',
    },
    {
      key: 'title',
      dataIndex: 'title',
      title: 'Título da postagem',
      filters: posts?.map(item => ({ key: item.id, text: item.title, value: item.title })),
      onFilter: (value: string, record: PostType) => record.title.indexOf(value) === 0,
    },
    {
      key: 'body',
      dataIndex: 'body',
      title: 'Conteúdo da postagem',
    },
    {
      key: 'edit',
      dataIndex: 'edit',
      title: 'Editar/ Excluir',
    },
  ];

  const getPosts = async () => {
    setLoading(true);
    try {
      const { data } = await getAllPosts();
      setPosts(data);
    } catch (error) {
      //
    } finally {
      setLoading(false);
    }
  };

  const addNewPost = async (newPost: PostType) => {
    setLoadingButtons(true);
    try {
      const { data } = await createNewPost(newPost);

      setPosts(prevState => [...prevState, data]);
    } catch (error) {
      // saveLog and notify error to user in a friendly manner
    } finally {
      setLoadingButtons(false);
    }
  };

  const editSelectedPost = async (dataEdit: PostType) => {
    setLoadingButtons(true);
    try {
      const { data } = await editPost(dataEdit.id, { ...dataEdit });

      setPosts(prevState =>
        prevState.map(item => {
          if (item.id === dataEdit.id) {
            return { ...data };
          }
          return item;
        }),
      );
    } catch (error) {
      // saveLog and notify error to user in a friendly manner
    } finally {
      setLoadingButtons(false);
    }
  };

  const deleteSelectedPost = async (itemSelected: PostType) => {
    setLoadingButtons(true);
    try {
      await deletePost(itemSelected.id);

      setPosts(prevState => prevState.filter(item => item.id !== itemSelected.id));
      setCounter(prevState => (prevState += 1));
    } catch (error) {
      // saveLog and notify error to user in a friendly manner
    } finally {
      setLoadingButtons(false);
    }
  };

  const onChange: TableProps<PostType>['onChange'] = (pagination, filters) => {
    console.log(pagination, filters);
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <Content style={{ padding: '24px', minHeight: 280, background: '#f5f5f5' }}>
      <Space align="baseline" style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Layout style={{ fontWeight: '700' }}>Contagem de registros deletados: {counter}</Layout>
        <Button
          type="primary"
          style={{ marginBottom: '24px' }}
          onClick={() => setCreateFormModal(true)}
          disabled={!!loadingButtons}
          loading={!!loadingButtons}
        >
          + Adicionar
        </Button>
      </Space>
      {loading ? (
        <Spin
          size="large"
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            height: '100%',
          }}
        />
      ) : (
        <TableWrapper
          data={posts}
          thead={thead}
          onChange={onChange}
          editItem={editSelectedPost}
          deleteItem={deleteSelectedPost}
          disableButtons={!!loadingButtons}
        />
      )}
      {createFormModal && (
        <FormModal
          title="Criar Post"
          open={createFormModal}
          close={() => setCreateFormModal(false)}
          confirm={newPost => addNewPost(newPost)}
        />
      )}
    </Content>
  );
}

export { Dashboard };
