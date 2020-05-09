import React from 'react';
import axios from 'axios'
import './CommentItem.css'
import {handleImg} from '../../../util/str'

export default class CommentItem extends React.Component{
    constructor(props){
        super(props)
        this.state={
            data:null
        }
    }

    async componentWillMount(){
        let _this=this;
        await axios.get('http://localhost:4000/bookDetail',{
            params:{
                id:this.props.book.userId
            }
        })
        .then(function (response) {
          _this.setState(state=>({
            data:response.data.data
          }))
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    showComment=()=>{
        if(this.state.data){
            const data=this.state.data;
            const comment=this.props.book
        return(
        <div  className="comment-item">
            <img className="comment-item-avatar"
            src={require("D://imgDatabase//userAvatar//"+(data.avatar?handleImg(data.avatar):"default.jpg"))}/>
            <div className="comment-item-content">
                <span className="comment-item-name">{data.username}</span>
                <span className="comment-item-time">{comment.comment_time}</span>
                <p className="comment-item-text">{comment.book_comment}</p>
            </div>
            </div>)}
        return
    }

  render(){
      return(
        <>
            {this.showComment()}
        </>
      );
  }
}