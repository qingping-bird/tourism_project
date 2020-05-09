import React from 'react';
import './ProjectListCard.css'
import projectSort from './projectSort.json'
import { Card,Tag,Modal,InputNumber,Table } from 'antd';
import axios from 'axios'
import {handleImg} from '../../../util/str'
import { FormOutlined,DeleteOutlined,UnorderedListOutlined,CommentOutlined} from '@ant-design/icons';

const { Meta } = Card;

export default class ProjectListCard extends React.Component{
    constructor(props){
        super(props);
        this.state={
            checkVisible:false,
            changeMoneyVisible:false,
            bookList:false,
            bookList2:false,
            changeMoney:0,
            checkIsNumber:true,
            bookDatas:[],
            bookComment:[],
            bookData:null
        }
    }

    componentWillMount(){
        this.setState(state=>({
            changeMoney:this.props.data.project_money,
            checkIsNumber:true
        }))
    }

    checkIsNumber=(value)=>{//验证数字
        if(!/^\d+(\.\d+)?$/.test(value)){
            this.setState(state=>({
                checkIsNumber:false
            }))
        }
        else{
            this.setState(state=>({
                checkIsNumber:true,
                changeMoney:value
            }))
        }
    }

    changeMoney=()=>{//修改价格
        let _this=this;
        axios.get('http://localhost:4001/changeProjectMoney',{
            params:
            {id:_this.props.data.id,
            money:_this.state.changeMoney}
        })
        .then(function (response) {
            _this.props.updateProjectList()
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    deleteProject=()=>{ //删除项目
        let _this=this;
        axios.get('http://localhost:4001/deleteProject',{
            params:
            {id:_this.props.data.id}
        })
        .then(function (response) {
            _this.props.updateProjectList()
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    handleCancel=()=>{
        this.setState(state=>({
            checkVisible:false,
            changeMoneyVisible:false,
            bookList:false,
            bookList2:false
        }))
    }

    handleBookList=()=>{ //获取订单列表
        let _this=this;
        axios.get('http://localhost:4001/bookList',{
            params:
            {id:_this.props.data.id}
        })
        .then(async function (response) {
            await _this.setState({
                bookData:response.data.data.books
            })

            _this.setState({
                bookDatas:_this.showList(_this.state.bookData),
                bookComment:_this.showList2(_this.state.bookData),
            })

            //console.log(response.data.data.books);
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    showList=()=>{
        if(this.state.bookData.length>0){
            let item=[];
            let tem=this.state.bookData;
            for(let i=0;i<tem.length;i++){
                item.push({
                    key: i,
                    phone: tem[i].user.phone,
                    time: tem[i].book_time,
                    count: tem[i].book_count
                  })
            }
            return item
        }
        return []
    }

    showList2=()=>{
        if(this.state.bookData.length>0){
            let item=[];
            let tem=this.state.bookData;
            for(let i=0;i<tem.length;i++){
                if(tem[i].book_comment){
                  item.push({
                    key: i,
                    id:tem[i].bookId,
                    name: tem[i].user.username,
                    phone: tem[i].user.phone,
                    comment: tem[i].book_comment,
                    commentTime:tem[i].comment_time
                  })}
            }
            return item
        }
        return []
    }

    handleDeleteComment=(e)=>{
        let _this=this
        axios.get('http://localhost:4001/bookDeleteComment',{
            params:
            {id:e.target.getAttribute('data-value')}
        })
        .then(async function (response) {
            _this.handleBookList()
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    render(){
        const data=this.props.data
        const bookDatas=this.state.bookDatas
        const bookComment=this.state.bookComment
        const columns = [
            {
              title: '手机号',
              dataIndex: 'phone',
              key: 'phone'
            },
            {
              title: '预定时间',
              dataIndex: 'time',
              key: 'time',
            },
            {
              title: '预定人数',
              dataIndex: 'count',
              key: 'count',
            }
          ];

          const columns2 = [
            {
                title: '订单号',
                dataIndex: 'id',
                key: 'id',
              },
              {
              title: '用户名',
              dataIndex: 'name',
              key: 'name',
            },
            {
              title: '手机号',
              dataIndex: 'phone',
              key: 'phone'
            },
            
            {
              title: '评论',
              dataIndex: 'comment',
              key: 'comment',
            },
            {
                title: '评论时间',
                dataIndex: 'commentTime',
                key: 'commentTime',
              },
            {
                title: '删除',
                key: 'action',
                render: (text, record) => (
                  <span>
                    <a onClick={this.handleDeleteComment} data-value={record.id}>删除</a>
                  </span>
                ),
              }
          ];

        return(
            <>
            <Card
                hoverable
                style={{ marginTop:'20px',width:'100%'}}
                actions={[
                    <div key="edit"onClick={()=>{
                        this.setState(state=>({
                            changeMoneyVisible:true
                    }))
                        }}><FormOutlined /> 修改价格</div>,
                    <div key="delete" onClick={()=>{
                        this.setState(state=>({
                        checkVisible:true
                    }))
                        }}><DeleteOutlined /> 删除项目</div>,
                        <div key="client" onClick={()=>{
                            this.setState(state=>({
                            bookList:true
                        }));this.handleBookList()}}><UnorderedListOutlined /> 预订顾客</div>,
                        <div key="comment" onClick={()=>{
                            this.setState(state=>({
                            bookList2:true
                        }));this.handleBookList()}}><CommentOutlined /> 查看评论</div>
                  ]}
            >
                <img className="project-card-img" 
                src={require("D://imgDatabase//projectImg//"+handleImg(data.project_img))} />
                <div className="project-card-content">
                <h1>{data.project_name}</h1>
                <h2>{data.project_detail}</h2>
                <Tag color="#3b5999">{projectSort[data.project_sort]}</Tag>
                <Tag color="#f50">价格：{data.project_money}</Tag>
                <Tag color="#2db7f5">时间：{data.project_start_time} -- {data.project_end_time}</Tag>
                <Tag color="#87d068">天数：{data.project_day}</Tag>
                </div>
            </Card>
            <Modal
                title=""
                visible={this.state.checkVisible}
                onOk={this.deleteProject}
                onCancel={this.handleCancel}
                >
                <p>确认删除吗？</p>
            </Modal>
            <Modal
                title="修改价格"
                visible={this.state.changeMoneyVisible}
                onOk={this.changeMoney}
                onCancel={this.handleCancel}
                >
                  <InputNumber  defaultValue={this.props.data.project_money} onChange={this.checkIsNumber}/>
                  <p style={{color:'red',marginTop:'10px',fontSize:'14px',display:this.state.checkIsNumber?'none':'block'}}>请输入数字</p>
            </Modal>
            <Modal
                title="订单列表"
                visible={this.state.bookList}
                onOk={this.handleCancel}
                onCancel={this.handleCancel}
                >
                  <Table columns={columns} dataSource={bookDatas?bookDatas:[]} />
            </Modal>
            <Modal width="800px"
                visible={this.state.bookList2}
                onOk={this.handleCancel}
                onCancel={this.handleCancel}
                >
                  <Table columns={columns2} dataSource={bookComment?bookComment:[]} />
            </Modal>
            </>
        );
    }
}
