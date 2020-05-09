import React from 'react';
import {handleImg} from '../../../util/str'
import { Link } from 'react-router-dom'
import './hotItems.css';

export default class HotItems extends React.Component{
    constructor(props){
        super(props)
    }

    render(){
        const data=this.props.data
        return(
            <div className="hotItem-content-item">
            <div className="hotItem-content-item-img">
            <Link to={{ pathname : `/tourism/0` , state : {keyWord:data.homeTitle}}} style={{textDecoration:'none'}}>
                    <div className="hotItem-content-item-img-con">
                        <img className="hotItem-content-item-img-i" src={require("D://imgDatabase//bannerImg//"+handleImg(data.homeImg))}/>
                        <div className="hotItem-content-item-img-d">
                        <span className="hotItem-content-item-img-t">{data.homeTitle}</span>
                        <div className="hotItem-content-item-img-p">{data.homeText}</div>
                        </div>
                    </div>
            </Link>
            </div>
            </div>
        );
    }
}
