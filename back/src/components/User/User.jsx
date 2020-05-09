import React from 'react'
import {readCookie} from '../../util/cookie'
import {LogoutOutlined} from '@ant-design/icons';
import './User.css'

export default class User extends React.Component{
  constructor(props){
      super(props);
      this.state={
      }
  }

  render(){
  return(
    <div className="user-div" >
        <span className="user-phone"> 欢迎你，{readCookie('phone')}！</span>
        <span className="user-logout" onClick={this.props.logout}> 
        <LogoutOutlined />退出登录</span>
    </div>
  );
}}

