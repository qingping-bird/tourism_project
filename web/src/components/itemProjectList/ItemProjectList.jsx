import React from 'react'
import { Link } from 'react-router-dom'
import {handleImg} from '../../util/str'
import './itemProjectList.css'

export default class HotItems extends React.Component{
    render(){
        const data=this.props.data
        return(
            <div className="itemProject-item">
                <div className="itemProject-item-img">
                <img className="itemProject-item-i" src={require("D://imgDatabase//bannerImg//"+handleImg(data.homeImg))}/>
                </div>
                <div className="itemProject-item-content">
                <h1 className="itemProject-item-h">{data.homeTitle}</h1>
                <p className="itemProject-item-p">{data.homeText}</p>
                </div>
            </div>
        );
    }
}
