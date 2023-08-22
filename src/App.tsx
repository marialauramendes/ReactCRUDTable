import React from 'react';
import { Dashboard } from './pages/Dashboard';
import { Layout, Menu, theme } from 'antd';

const App = () => {
  const { Sider } = Layout;

  const navList = [
    {key: 'posts', label: 'Postagens'}
  ];
  const {
    token: { colorBgContainer, borderRadius, padding },
  } = theme.useToken();

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
        <Dashboard />
      </Layout>
    </Layout>
  );
};

export default App;