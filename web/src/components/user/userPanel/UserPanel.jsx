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
            <Link to="/user" className="user-login-panel-link"> <div className="user-login-panel-button">个人中心</div></Link>
            <Link to="/" onClick={this.props.signOut} className="user-login-panel-link">
            <div className="user-login-panel-button">退出登录</div>
            </Link>
            </div>
        );
    }
}