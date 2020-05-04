import React from 'react';
import UserPanel from './userPanel/UserPanel';
import './user.css';
import { Link } from 'react-router-dom';

export default class User extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            isUserPanelOn: false//鼠标悬停时用户面板显示
          };
    }

    onMouseOver=()=>{
        this.setState(state => ({
            isUserPanelOn: true
          }));
    }

    onMouseOut=()=>{
        this.setState(state => ({
            isUserPanelOn: false
          }));
    }

    IsUserPanelOn=()=>{
        if(this.state.isUserPanelOn&&this.props.isLogin){
            return(
                <UserPanel onMouseOver={this.onMouseOver} onMouseOut={this.onMouseOut}  signOut={this.props.signOut}/>
            )
        }
        return
    }

    turnToUser=()=>{
        let tem=(this.props.avatarImg?this.props.ID:"default")+".jpg";
        let userHead=(
            <div className="user-head" style={{backgroundImage:`url(${"img/default.jpg"})` }} onClick={this.props.changeLoginClose}>
            <img className="user-head-avatar" src={require("D://imgDatabase//userAvatar//"+tem)} alt=""/>
            </div>
        )
        if(this.props.isLogin){
            return(
                <Link to="/user">
                        {userHead}
                </Link>
            )
        }
        else return(
            userHead
        )
    }

    render(){
        return(
            <div className="navigation-user">
                {this.turnToUser()}
                <div className="user-name" onClick={this.props.changeLoginClose} 
                onMouseEnter={this.onMouseOver} onMouseLeave={this.onMouseOut}>{this.props.userName}</div>
                {this.IsUserPanelOn()}
            </div>
        );
    }
}
