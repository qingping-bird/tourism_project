import React from 'react'
import axios from 'axios'
import {readCookie} from '../../util/cookie'
import './BookPanel.css'

export default class BookPanel extends React.Component{
    constructor(props){
        super(props)
        this.state={
        }
    }

    handleSubmit=()=>{
        let _this=this;
        axios.get('http://localhost:4000/book',{
            params:{
                user_id:readCookie('id'),
                project_id:_this.props.data.id,
                book_time:_this.props.time,
                book_count:_this.props.count
            }
        })
        .then(function (response) {
            _this.props.close();
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    render(){
        const data=this.props.data
        return(
            <div className="book-panel">
                <div className="book-panel-background"></div>
                <div className="book-panel-content">
                    <p className="book-panel-title">确认预定</p>
                    <p className="book-panel-item"><span className="book-panel-name">时间</span>{this.props.time}</p>
                    <p className="book-panel-item"><span className="book-panel-name">为期</span>{data.project_day}&nbsp;&nbsp;天</p>
                    <p className="book-panel-item"><span className="book-panel-name">预定</span>{this.props.count}&nbsp;&nbsp;人</p>
                    <p className="book-panel-total">共计
                        <span style={{fontSize:'22px',color:'tomato',fontWeight:'700'}}>￥{this.props.count*data.project_money}</span></p>
                    <span className="book-panel-cancel" onClick={this.props.close}>取消</span>
                    <span className="book-panel-ok" onClick={this.handleSubmit}>确定</span>
                </div>
            </div>
        )
    }
}