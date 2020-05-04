import React from 'react';
import './App.css';
import { Layout, Menu, Breadcrumb } from 'antd';
import {
  DesktopOutlined,
  SnippetsOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import ItemList from './page/ItemList/ItemList'

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

function App() {
  return(
    <div>
    <Header className="header" style={{position:'fixed',top:0,width:'100%',clear:'both',zIndex:10}}>
    </Header>
    <Layout style={{ minHeight: '100vh',marginTop:'60px'}}>
    <Sider collapsible style={{height:'100%',position:'fixed',top:'60px'}}>
      <div className="logo" />
      <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
        <Menu.Item key="1">
          <SnippetsOutlined />
          <span>项目管理</span>
        </Menu.Item>

        <SubMenu
          key="sub1"
          title={
            <span>
              <DesktopOutlined />
              <span>页面管理</span>
            </span>
          }
        >
          <Menu.Item key="2">主页管理</Menu.Item>
          <Menu.Item key="3">分页管理</Menu.Item>
        </SubMenu>

        <Menu.Item key="4">
          <UserOutlined />
          <span>用户管理</span>
        </Menu.Item>

        <Menu.Item key="5">
          <TeamOutlined />
          <span>管理人员</span>
        </Menu.Item>
        
      </Menu>
    </Sider>
    <ItemList />
  </Layout>
  </div>
  );
}

export default App;
