import React from 'react';
import axios from 'axios'
import {BrowserRouter as Router, Route,Redirect,Switch,Link } from 'react-router-dom';
import './App.css';
import { Layout, Menu, Breadcrumb } from 'antd';
import {
  DesktopOutlined,
  SnippetsOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import ItemList from './page/ItemList/ItemList'
import Banner from './page/Banner/Banner'
import HotLocation from './page/HotLocation/HotLocation'
import Season from './page/Season/Season'
import Nearby from './page/Nearby/Nearby'
import Client from './page/Client/Client'
import Refund from './page/Refund/Refund'
import Admin from './page/Admin/Admin'
import Login from './page/Login'
import SliderContent from './page/SliderContent'
import {setNewCookie,readCookie,deleteCookie} from './util/cookie'
import User from './components/User/User'

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

export default class App extends React.Component {
  constructor(props){
    super(props)
    this.state={
      loginIn:false
    }
  }

  componentWillMount(){
    let _this=this
    axios.post('http://localhost:4001/login',{
            phone:readCookie('phone'),
            password:readCookie('password')
        })
        .then(function (response) {
            if(!response.data.err){
              _this.login(response.data.phone,response.data.id)
            }
        })
        .catch(function (error) {
            console.log(error);
        });
  }

  login=(phone,id)=>{
    setNewCookie(phone,id)
    this.setState({
      loginIn:true
    })
  }

  logout=()=>{
    deleteCookie()
    this.setState({
      loginIn:false
    })
  }

  showLoginPanel=()=>{
    if(this.state.loginIn){
      return(<Router>
        <Header className="header" style={{position:'fixed',top:0,width:'100%',clear:'both',zIndex:10}}>
        <img src={require("D:/imgDatabase/logo.png")} style={{height:'100%',marginLeft:'-20px'}}/>
        <User logout={this.logout}/>
        </Header>
        <SliderContent />
        <Layout style={{ minHeight: '100vh',marginTop:'60px'}}>
          
            <Switch>
                  <Route path='/banner' component={Banner} />
                  <Route path='/hotLocation' component={HotLocation} />
                  <Route path='/season' component={Season} />
                  <Route path='/nearby' component={Nearby} />
                  <Route path='/client' component={Client} />
                  <Route path='/refund' component={Refund} />
                  <Route path='/admin' component={Admin} />
                  <Route path='/' component={ItemList} />
            </Switch>
          
        </Layout></Router>)
    }
    else return(<><Login login={this.login}/></>)
  }

  render(){
  return(<>
    {this.showLoginPanel()}
    </>
  );
}}
