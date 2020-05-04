import React from 'react';
import './itemName.css';

export default class HotItem extends React.Component{
    render(){
        return(
            <div className="item-name">
                <h1>{this.props.title}</h1>
                <h4>{this.props.detail}</h4>
            </div>
        );
    }
}
