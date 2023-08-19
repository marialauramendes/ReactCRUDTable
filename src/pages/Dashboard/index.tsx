import React , { useEffect, useState }from 'react';
import { getAllPosts } from '../../service/api'
import TableWrapper  from '../../components/TableWrapper';
import { PostType } from '../../types'
import type { TableProps } from 'antd/es/table';
import { Layout, Menu, theme} from 'antd';
import Sider from 'antd/es/layout/Sider';

function Dashboard() {
  const [posts, setPosts] = useState<PostType[]>([]);
  
  const { Content } = Layout;
  const {
    token: { colorBgContainer, borderRadius, padding },
  } = theme.useToken();


  const navList = [
    {key: 'posts', label: 'Posts'}
  ];

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
      onFilter: (value: string, record: PostType ) => record.title.indexOf(value) === 0,
    },
    {
      key: 'body',
      dataIndex: 'body',
      title: 'Conteúdo da postagem',
    },
  ];

  const getPosts = async () => {

    try {
      const { data } = await getAllPosts();
      setPosts(data);

    } catch(error){
      console.log(error);
    }
  };

  const onChange: TableProps<PostType>['onChange'] = (pagination, filters) => {
    console.log(pagination, filters);
  };

  useEffect(()=> {
    getPosts();
  }, []);

  return (
    <Layout style={{ minHeight: '100vh', borderRadius: borderRadius, }}>
      <Layout style={{ background: colorBgContainer }}>
          <Sider width={200}>
            <Menu
              theme='dark'
              mode="inline"
              defaultSelectedKeys={['1']}
              style={{ height: '100%', background: '#001529', padding: padding}}
              items={navList}
            />
          </Sider>
  
      <Content style={{ padding: '24px', minHeight: 280, background: '#f5f5f5'}}>
        <TableWrapper data={posts} thead={thead} onChange={onChange} />
      </Content>
      </Layout>
     
    </Layout>
  );
};

export { Dashboard };