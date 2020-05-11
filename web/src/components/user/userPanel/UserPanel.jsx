import React from 'react';
import {Link} from 'react-router-dom';
import './userPanel.css';

export default class UserPanel extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div className="user-login-in-panel"
            onMouseEnter={this.props.onMouseOver} onMouseLeave={this.props.onMouseOut} >
            <Link to="/user" className="user-login-panel-link"> <div className="user-login-panel-button">
            <span className="iconfont user-login-panel-link-i" style={{fontSize: "20px"}}>&#xe6a0;</span>
            &nbsp;&nbsp;个人中心</div></Link>
            <Link to="/" onClick={this.props.signOut} className="user-login-panel-link">
            <div className="user-login-panel-button">
            <span className="iconfont user-login-panel-link-i" style={{fontSize: "20px"}}>&#xe6db;</span>
            &nbsp;&nbsp;退出登录</div>
            </Link>
            </div>
        );
    }
}