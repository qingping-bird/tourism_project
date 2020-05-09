import React from 'react'
import axios from 'axios'
import {getTime} from '../../../../util/str'
import './BookCommentPanel.css'

export default class BookCommentPanel extends React.Component{
    constructor(props){
        super(props)
        this.state={
            value:''
        }
    }

    handleChanege=(e)=>{
        this.setState({
            value:e.target.value
        })
    }

    handleSubmit=async ()=>{
        let _this=this;
        if(_this.state.value.length>0){
                await axios.get('http://localhost:4000/booklistComment',{
                params:{
                    id:_this.props.id,
                    value:_this.state.value,
                    time:getTime()
                }
                    })
                    .then(function (response) {})
                    .catch(function (error) {
                        console.log(error);
                });
            this.props.update()
            this.props.handleCancel()}
    }

    render(){
        return(
            <div className="book-comment-panel">
                <div className="book-comment-panel-content">
                <div className="book-comment-panel-title">发布评论</div>
                <textarea value={this.state.value} onChange={this.handleChanege} placeholder="请输入内容" className="book-comment-panel-text"/>
                <span onClick={this.props.handleCancel} className="book-comment-panel-cancel">取消</span>
                <span onClick={this.handleSubmit} className="book-comment-panel-ok">确定</span>
                </div>
            </div>
        )
    }
}