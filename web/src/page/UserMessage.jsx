import React from 'react';
import Avatar from '../components/avatar/Avatar';
import BookList from '../components/BookList/BookList'
import './userMessage.css';

export default class UserMessage extends React.Component{
    constructor(props){
        super(props);
    }

  render(){
      return(
        <div className="user-message-content">
            <div className="user-left-detail">
                <Avatar ID={this.props.ID}
                avatarImg={this.props.avatarImg}/>
                <h1>欢迎！</h1>
                <h4>{this.props.userName}</h4>
                <div className="user-left-detail-panel">
                    <span className="user-left-detail-panel-name">用 户 名</span>
                    <span className="user-left-detail-panel-content">{this.props.userName}</span>
                    <span className="user-left-detail-panel-name">手 机 号</span>
                    <span className="user-left-detail-panel-content">{this.props.phone}</span>
                </div>
                
            </div>
            <BookList key={this.props.ID} id={this.props.ID}/>
        </div>
      );
  }
}