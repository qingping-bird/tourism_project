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
                        <Link to="/home" className="navigation-content-list">首页</Link>
                        <Link to="/tourism/1" className="navigation-content-list">国内旅游</Link>
                        <Link to="/tourism/2" className="navigation-content-list">出境旅游</Link>
                        <Link to="/tourism/3" className="navigation-content-list">自由行</Link>
                        <Link to="/12" className="navigation-content-list">周边玩乐</Link>
                    </div>
                </div>
            </div>
        );
    }
}
