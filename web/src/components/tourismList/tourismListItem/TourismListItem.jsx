import React from 'react';
import projectSort from './projectSort.json'
import { Link } from 'react-router-dom'
import {handleImg} from '../../../util/str'
import './tourismListItem.css';

export default class TourismListItem extends React.Component{

  render(){
    const data=this.props.data
      return(
        <div className="tourism-list-item">
        <img className="tourism-list-item-img" 
        src={require("D://imgDatabase//projectImg//"+handleImg(data.project_img))}/>
        <div className="tourism-list-item-sort">{projectSort[data.project_sort]}</div>
        <div className="tourism-list-item-content">
          <h1 className="tourism-list-item-h1">{data.project_name}</h1>
          <p className="tourism-list-item-p">{data.project_detail}</p>
          <h2 className="tourism-list-item-money"><span style={{fontSize:"20px"}}>￥</span>{data.project_money}</h2>
          <Link to={{ pathname : `/projectDetail/${data.id}` , state : {userId:this.props.userId}}}>
          <span className="tourism-list-item-button">立即预定</span></Link>
        </div>      
        </div>
    );
  }
}