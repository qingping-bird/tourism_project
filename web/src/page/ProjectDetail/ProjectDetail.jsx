import React from 'react'
import axios from 'axios'
import {handleImg} from '../../util/str'
import CommentItem from './CommentItem/CommentItem'
import PickTime from '../../components/PickTime/PickTime'
import PickCount from '../../components/PickCount/PickCount'
import BookPanel from '../../components/BookPanel/BookPanel'
import {readCookie} from '../../util/cookie'
import {replaceStr} from '../../util/str'
import Modal from '../../components/Modal/Modal'
import './ProjectDetail.css'

export default class ProjectDetail extends React.Component{
    constructor(props){
        super(props)
        this.state={
            id:null,
            dataList:null,
            timeError:false,
            count:1,
            bookTime:'',
            bookPanel:false,
            modalPanel:false
        }
    }

    handleChangeError=(t,book)=>{
        this.setState(state=>({
            bookTime:book,
            timeError:!t
        }))
    }

    handleCount=(num)=>{//选择人数
        this.setState(state=>({
            count:num
        }))
    }

    handleSubmit=()=>{ //预定面板
        if(readCookie('id')){
            if(this.state.count>0&&!this.state.timeError){
                this.setState({
                    bookPanel:true
                })
            }
        }
        else{
            this.setState({
                modalPanel:true
            })
        }
    }

    showBookPanel=()=>{//显示预定面板
        if(this.state.bookPanel){
            return <BookPanel time={this.state.bookTime} data={this.state.dataList} count={this.state.count} 
            close={()=>{this.setState({bookPanel:false})}}  project_id={this.state.id}/>
        }
        return 
    }

    modalClose=()=>{
        this.setState({
            modalPanel:false
        })
    }

    showModalPanel=()=>{//显示提示面板
        if(this.state.modalPanel){
            return <Modal message='您还未登录，请先登录哦' close={this.modalClose} ok={this.modalClose}/>
        }
        return 
    }

    showComments=()=>{
        const data=this.state.dataList
        if(data){
            let item=[]
            for(let i=0;i<data.books.length;i++){
                if(data.books[i].book_comment){
                item.push(<CommentItem key={i} book={data.books[i]}/>)}
            }
            if(item.length>0){
                return(
                    <>{item}</>)
            }
            else{
                return(
                    <><div className="empty-content">
                        <img src={require("D:/imgDatabase/empty.png")}
                         className="empty-img"/>
                    </div></>
                )
            }}
        return
    }

    async componentWillMount(){
        await this.setState({
            id:this.props.match.params.id,
          })
        let _this=this;
        await axios.get('http://localhost:4000/projectDetail',{
            params:{
                id:this.state.id
            }
        })
        .then(function (response) {
          _this.setState(state=>({
            dataList:response.data.data
          }))
        })
        .catch(function (error) {
            console.log(error);
        });
        this.setState({
            bookTime:this.state.dataList.project_start_time,
          })
    }

    handleInit=()=>{
        const data=this.state.dataList
        if(data){
            return(
                <>
                    <div className="project-detail">
                        <img className="project-detail-img" src={require("D://imgDatabase//projectImg//"+handleImg(data.project_img))}/>
                        <div className="project-detail-content">
                            <h1 className="project-detail-h1">{data.project_name}</h1>
                            <p className="project-detail-money">
                                <span style={{fontSize:'14px',fontWeight:'400',color:'rgb(100, 100, 100)'}}>&nbsp;&nbsp;价格&nbsp;&nbsp;</span>
                                <span style={{fontSize:'14px',fontWeight:'400'}}> ￥</span>
                                {data.project_money}
                                <span style={{fontSize:'14px',fontWeight:'400',color:'rgb(100, 100, 100)'}}>/人 </span>
                            </p>
                            <p className="project-detail-p">
                            <span style={{fontWeight:'400',color:'rgb(100, 100, 100)'}}>有效时间&nbsp;&nbsp;&nbsp;&nbsp;</span>
                            {data.project_start_time}到{data.project_end_time}</p>
                            <p className="project-detail-p">
                            <span style={{fontWeight:'400',color:'rgb(100, 100, 100)'}}>预订须知&nbsp;&nbsp;&nbsp;&nbsp;</span>
                            该产品活动开始前一天不可退款，请谨慎选择</p>                      
                            <PickTime data={[data.project_start_time,data.project_end_time]} handleChangeError={this.handleChangeError}/>
                            <p className="project-detail-error">
                            {this.state.timeError?`*请选择${data.project_start_time}到${data.project_end_time}的有效时间`:<br />}</p>
                            <PickCount handleCount={this.handleCount}/>
                            <p className="project-detail-error">{this.state.count==0?'*请选择预定人数':<br />}</p>
                            <span className="project-detail-submit" onClick={this.handleSubmit}>立即预定</span>
                        </div>
                    </div>
                    <div className="project-detail-text">
                        <div className="project-detail-text-title">项目介绍>></div>
                        <div className="project-detail-text-txt" dangerouslySetInnerHTML={{__html:replaceStr(data.project_detail)}} />
                    </div>
                    <div className="project-detail-text">
                        <div className="project-detail-text-title">评论>></div>
                        {this.showComments()}
                    </div>
                    {this.showBookPanel()}
                    {this.showModalPanel()}
                </>
            )
        }
        return
    }

    render(){
        return(
            <div className="project-de">
                {this.handleInit()}
            </div>
        )
    }
}