import React from 'react';
import {BrowserRouter as Router, Route,Redirect,Switch,Link } from 'react-router-dom';
import { Layout, Menu, Breadcrumb } from 'antd';
import {
  DesktopOutlined,
  SnippetsOutlined,
  TeamOutlined,
  UserOutlined,
  OrderedListOutlined
} from '@ant-design/icons';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

export default class SliderContent extends React.Component{
  constructor(props){
      super(props);
      this.state={
          dataList:null,
      }
  }

  render(){
  return(
    <Sider collapsible style={{height:'100%',position:'fixed',top:'60px',zIndex:'10'}}>
      <div className="logo" />
      <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
        <Menu.Item key="1" url="/"><Link to="/">
          <SnippetsOutlined />项目管理</Link>
        </Menu.Item>
        <SubMenu
          key="sub"
          title={
              <span><DesktopOutlined />主页管理</span>
          }
        >
          <Menu.Item key="2" url="/"><Link to="/banner">banner图</Link></Menu.Item>
          <Menu.Item key="3" url="/"><Link to="/hotLocation">热门地区</Link></Menu.Item>
          <Menu.Item key="4" url="/"><Link to="/season">当季项目</Link></Menu.Item>
          <Menu.Item key="5" url="/"><Link to="/nearby">周边玩乐</Link></Menu.Item>
        </SubMenu>

        <Menu.Item key="6"><Link to="/client">
          <UserOutlined />
          <span>用户管理</span></Link>
        </Menu.Item>

        <Menu.Item key="7"><Link to="/refund">
          <OrderedListOutlined />
          <span>退单管理</span></Link>
        </Menu.Item>

        <Menu.Item key="8">
        <Link to="/admin">
          <TeamOutlined />
          <span>管理人员</span>
          </Link>
        </Menu.Item>
        
      </Menu>
    </Sider>
  );
}}

