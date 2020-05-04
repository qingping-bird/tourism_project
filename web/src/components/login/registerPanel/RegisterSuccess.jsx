import React from 'react';
import './registerPanel.css';

export default class RegisterSuccess extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <p className="region-success-p">注册成功，<b>{this.props.timeCount}</b>秒后返回登录页</p>
        );
    }
}