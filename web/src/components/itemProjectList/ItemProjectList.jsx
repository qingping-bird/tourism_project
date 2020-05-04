import React from 'react';
import './itemProjectList.css';

export default class HotItems extends React.Component{
    render(){
        return(
            <div className="itemProject-item">
                <div className="itemProject-item-img"></div>
                <div className="itemProject-item-content"></div>
            </div>
        );
    }
}
