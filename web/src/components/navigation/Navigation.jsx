import React from 'react';
import { Link } from 'react-router-dom';
import './navigation.css';
import User from '../user/User';

export default class Navigation extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div className="navigation">
                <div className="navigation-body">
                    <img className="logo" src={require("D:/imgDatabase/logo.png")} />
                    <User changeLoginClose={this.props.changeLoginClose} 
                    userName={this.props.userName} 
                    avatarImg={this.props.avatarImg}
                    ID={this.props.ID}
                    signOut={this.props.signOut} isLogin={this.props.isLogin}/>
                    <div className="navigation-content">
                        <Link to="/home"><span className="navigation-content-list"> 首页</span></Link>
                        <Link to={{ pathname : `/tourism/1`}}><span className="navigation-content-list"> 国内旅游</span></Link>
                        <Link to={{ pathname : `/tourism/2` }}><span className="navigation-content-list"> 出境旅游</span></Link>
                        <Link to={{ pathname : `/tourism/3` }}><span className="navigation-content-list"> 自由行</span></Link>
                        <Link to={{ pathname : `/tourism/4`}}><span className="navigation-content-list"> 周边玩乐</span></Link>
                    </div>
                </div>
            </div>
        );
    }
}
