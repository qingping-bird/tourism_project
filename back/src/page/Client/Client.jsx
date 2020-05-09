import React from 'react';
import axios from 'axios'
import UploadNewProject from '../../components/UploadNewProject/UploadNewProject'
import ProjectList from '../../components/ProjectList/ProjectList'
import { Layout, Tag, Breadcrumb,Pagination,Table,Modal } from 'antd';
import { Select,Button, Radio,Input } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
const { Header, Content} = Layout;

const { Search } = Input;



export default class ItemList extends React.Component{
  constructor(props){
    super(props);
    this.state={
      update:0,
      keyWord:'',
      data:null,
      delete:false,
      deleteId:null,
      bookList:false,
      bookId:null,
      bookData:null
    }
  }

  componentWillMount(){//组件加载
    this.updateProjectList()
  }

  inputKeyWord=async(value)=>{ //搜索
    await this.setState({ keyWord: value});
    this.updateProjectList();
  }

  updateProjectList=()=>{//更新列表
    let _this=this
    axios.get('http://localhost:4001/userList',{
      params:{keyWord:_this.state.keyWord}
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

  handleCancel=()=>{
      this.setState({
          delete:false,
          bookList:false
      })
  }

  deleteUser=()=>{
    let _this=this
    axios.get('http://localhost:4001/userDelete',{
        params:
        {id:_this.state.deleteId}
    })
    .then(async function (response) {
        _this.updateProjectList();
        _this.handleCancel()
    })
    .catch(function (error) {
        console.log(error);
    });
  }

  handleBookList=()=>{ //获取订单列表
    let _this=this;
    axios.get('http://localhost:4001/userBookList',{
        params:
        {id:_this.state.bookId}
    })
    .then(async function (response) {
        await _this.setState({
            bookData:response.data.data
        })
    })
    .catch(function (error) {
        console.log(error);
    });
}

  showList=()=>{
    if(this.state.data){
        let item=[];
        let tem=this.state.data;
        for(let i=0;i<tem.length;i++){
            item.push({
                key: i,
                id:tem[i].id,
                name:tem[i].username,
                phone: tem[i].phone
              })
        }
        return item
    }
    return []
    }

    showList2=()=>{
        const stateL=['已预定','退款中','已退款']
        if(this.state.bookData){
            let item=[];
            let tem=this.state.bookData;
            for(let i=0;i<tem.length;i++){
                item.push({
                    key: i,
                    name:tem[i].project.project_name,
                    time: tem[i].book_time,
                    count:tem[i].book_count,
                    state:stateL[tem[i].book_state]
                  })
            }
            return item
        }
        return []
        }

    render(){
      const {projectSort}=this.state;
      const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id'
          },
          {
            title: '用户名',
            dataIndex: 'name',
            key: 'name'
          },
        {
          title: '手机号',
          dataIndex: 'phone',
          key: 'phone'
        },
        {
            title: '订单',
            key: 'action',
            render: (text, record) => (
              <span>
                <a onClick={async ()=>{await this.setState({bookList:true,bookId:record.id});this.handleBookList()}}>查看订单</a>
              </span>
            ),
          },
        {
            title: '删除',
            key: 'delete',
            render: (text, record) => (
              <span>
                <a onClick={()=>{this.setState({delete:true,deleteId:record.id})}}>删除</a>
              </span>
            ),
          }
      ];

      const columns2 = [
          {
            title: '项目',
            dataIndex: 'name',
            key: 'name'
          },
        {
          title: '预定时间',
          dataIndex: 'time',
          key: 'time'
        },
        {
          title: '预定人数',
          dataIndex: 'count',
          key: 'count'
          },
          {
            title: '状态',
            key: 'state',
            dataIndex: 'state',
            render: tag => (
            <>
                <Tag color={tag === '已预定'?'green':'volcano'} key={tag}>
                {tag}
                </Tag>
            </>
            ),
        },
      ];

        return(
          <>
            <Layout className="site-layout" style={{ marginLeft:'200px'}}>
              <Header className="site-layout-background" style={{ padding: 0 }} >
              <Search style={{width:'550px',marginLeft:'15px',marginTop:'15px'}} 
                 placeholder="输入用户名或手机号" onSearch={this.inputKeyWord} enterButton />
              </Header>
            <Content style={{ margin: '16px' }}>
                <Table key={this.state.update} columns={columns} dataSource={this.showList()} />
            </Content>
          </Layout>
          <Modal
                title=""
                visible={this.state.delete}
                onOk={this.deleteUser}
                onCancel={this.handleCancel}
                >
                <p>确认删除吗？</p>
            </Modal>
            <Modal width="800px"
                title="订单列表"
                visible={this.state.bookList}
                onOk={this.handleCancel}
                onCancel={this.handleCancel}
                >
                  <Table columns={columns2} dataSource={this.showList2()} />
            </Modal>
          </>
        );
    }
}
