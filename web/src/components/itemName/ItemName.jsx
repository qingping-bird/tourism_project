import React from 'react';
import './itemName.css';

export default class HotItem extends React.Component{
    render(){
        return(
            <div className="item-name">
            <span className="iconfont user-login-panel-link-i" style={{fontSize: "30px",color: 'rgb(59, 59, 59)'}}>{this.props.icon}</span>
            &nbsp;&nbsp;&nbsp;
                <h1>{this.props.title}</h1>
                <h4>{this.props.detail}</h4>
            </div>
        );
    }
}
