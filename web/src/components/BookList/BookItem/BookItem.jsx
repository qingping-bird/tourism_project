import React from 'react'
import axios from 'axios'
import projectSort from './projectSort.json'
import { Link } from 'react-router-dom'
import {handleImg} from '../../../util/str'
import BookCommentPanel from './BookCommentPanel/BookCommentPanel'
import './BookItem.css'
import {getTime} from '../../../util/str'

export default class BookItem extends React.Component{
    constructor(props){
        super(props)
        this.state={
            bookCommentPanel:false
        }
    }

    handleCancel=()=>{
        this.setState({
            bookCommentPanel:false
        })
    }

    handleRefund=async (e)=>{
        e.preventDefault();
        let _this=this;
        if(this.props.data.book_state==0){
            await axios.get('http://localhost:4000/booklistRefund',{
            params:{
                id:_this.props.data.bookId,
                state:1,
                time:getTime()
            }
                })
                .then(function (response) {
                    _this.setState({
                        data:response.data.data
                    })
                })
                .catch(function (error) {
                    console.log(error);
            });
        }
        
        this.props.update()
    }

    handleComment=async (e)=>{
            e.preventDefault();
            if(!this.props.data.book_comment){
                 this.setState({
                bookCommentPanel:true
            })
            }
    }

    showCommentPanel=()=>{
        if(this.state.bookCommentPanel){
            return (<><BookCommentPanel update={this.props.update} id={this.props.data.bookId} handleCancel={this.handleCancel}/></>)
        }
        return
    }

    render(){
        const clickStyle={
            backgroundcolor: 'white',
            boxShadow:'5px 5px 8px 3px rgba(81, 92, 100, 0.473),inset 1px 1px 2px 2px rgba(56, 55, 54, 0.041),inset -2px -2px 5px 3px rgba(255, 255, 255, 0.397)',
            backgroundColor: 'rgb(240, 240, 240)',
            color: 'rgb(219, 174, 26)',
            fontWeight: '600'
          }

          const noUseStyle={
            border:'2px solid rgb(221, 221, 221)',
            backgroundColor: 'rgb(221, 221, 221)',
            color: 'white',
            cursor: 'not-allowed'
          }

          const refundText=['退款','退款中...','已退款']
          const comment=['评论','已评论']

          const data=this.props.data.project;
        return(
            <>
            <Link className="book-item-link" to={{ pathname : `/projectDetail/${data.id}` , state : {userId:this.props.userId}}}>
            <div className="book-item">
                <img className="book-item-img" 
                src={require("D://imgDatabase//projectImg//"+handleImg(data.project_img))}/>
                <div className="book-item-sort">{projectSort[data.project_sort]}</div>
                <div className="book-item-content">
                    <h1 className="book-item-h1">{data.project_name}</h1>
                    <span className="book-item-count">×{this.props.data.book_count}</span>
                    <p style={{fontSize:'12px',color:'rgb(150,150,150)',marginTop:'5px'}}>预定时间：{this.props.data.book_time}</p>
                    <span style={this.props.data.book_state==0?{}:noUseStyle} onClick={this.handleRefund} className="book-item-button">
                    {refundText[this.props.data.book_state]}</span>
                    <span style={this.props.data.book_comment?noUseStyle:{}} onClick={this.handleComment} className="book-item-button">
                    {comment[this.props.data.book_comment?1:0]}</span>
                </div>   
            </div>
            </Link>
            {this.showCommentPanel()}
            </>
        )
    }
}