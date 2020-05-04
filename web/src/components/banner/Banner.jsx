import React from 'react';
import './banner.css';



export default class Navigation extends React.Component{
    render(){
        return(
            <div className="banner">
                <img className="banner-img" src="img/shenxianju.jpg" alt=""/>
                <div className="banner-content">
                    <div className="banner-list">
                        <div className="banner-item">
                            <h1>神仙居</h1>
                            <h4>dfshgf</h4>
                        </div>
                        <div className="banner-item">
                            <h1>神仙居</h1>
                            <h4>dfshgf</h4>
                        </div>
                        <div className="banner-item">
                            <h1>神仙居</h1>
                            <h4>dfshgf</h4>
                        </div>
                        <div className="banner-item">
                            <h1>神仙居</h1>
                            <h4>dfshgf</h4>
                        </div>
                    </div>
                    <input className="banner-search" type="text"/>
                    <span className="banner-search-button" >搜索</span>
                </div>
            </div>
        );
    }
}