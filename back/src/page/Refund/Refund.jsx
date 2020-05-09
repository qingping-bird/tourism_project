import React from 'react';
import axios from 'axios'
import UploadNewProject from '../../components/UploadNewProject/UploadNewProject'
import ProjectList from '../../components/ProjectList/ProjectList'
import { Layout, Tag, Breadcrumb,Pagination,Table,Modal } from 'antd';
import { Select,Button, Radio,Input } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
const { Header, Content} = Layout;

const { Search } = Input;



export default class Refund extends React.Component{
  constructor(props){
    super(props);
    this.state={
      update:0,
      keyWord:'',
      data:null,
      rufundId:null,
      modalPanel:false,
      action:1
    }
  }

  componentWillMount(){//组件加载
    this.updateProjectList()
  }

  inputKeyWord=async(value)=>{ //搜索
    await this.setState({ keyWord: value});
    this.updateProjectList();
  }

  updateProjectList=()=>{//获取退单列表
    let _this=this
    axios.get('http://localhost:4001/refundList',{
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
        modalPanel:false
      })
  }

  refundAction=()=>{
    let _this=this
    axios.get('http://localhost:4001/refundAction',{
        params:
        {id:_this.state.refundId,
        action:_this.state.action}
    })
    .then(async function (response) {
        _this.updateProjectList();
        _this.handleCancel()
    })
    .catch(function (error) {
        console.log(error);
    });
  }

  showList=()=>{
    if(this.state.data){
        let item=[];
        let tem=this.state.data;
        let y=0;
        for(let i=0;i<tem.length;i++){
            for(let j=0;j<tem[i].books.length;j++){
                item.push({
                    key: y++,
                    id:tem[i].books[j].bookId,
                    phone: tem[i].phone,
                    name:tem[i].books[j].project.project_name,
                    orderTime:tem[i].books[j].book_time,
                    refundTime:tem[i].books[j].refund_time,
                    
                  })
            }
        }
        return item
    }
    return []
    }

    render(){
      const {projectSort}=this.state;
      const columns = [
        {
            title: '订单号',
            dataIndex: 'id',
            key: 'id'
          },
          {
            title: '手机号',
            dataIndex: 'phone',
            key: 'phone'
          },
          {
            title: '项目名',
            dataIndex: 'name',
            key: 'name'
          },
          {
            title: '预定时间',
            dataIndex: 'orderTime',
            key: 'orderTime'
          },
          {
            title: '退款时间',
            dataIndex: 'refundTime',
            key: 'refundTime'
          },
        
        {
            title: '同意',
            key: 'action',
            render: (text, record) => (
              <span>
                <a onClick={async ()=>{this.setState({action:2,refundId:record.id,modalPanel:true})}}>同意退款</a>
              </span>
            ),
          },
        {
            title: '拒绝',
            key: 'delete',
            render: (text, record) => (
              <span>
                <a onClick={()=>{this.setState({action:0,refundId:record.id,modalPanel:true})}}>拒绝退款</a>
              </span>
            ),
          }
      ];

        return(
          <>
            <Layout className="site-layout" style={{ marginLeft:'200px'}}>
              <Header className="site-layout-background" style={{ padding: 0 }} >
              <Search style={{width:'550px',marginLeft:'15px',marginTop:'15px'}} 
                 placeholder="输入用户手机号" onSearch={this.inputKeyWord} enterButton />
              </Header>
            <Content style={{ margin: '16px' }}>
                <Table key={this.state.update} columns={columns} dataSource={this.showList()} />
            </Content>
          </Layout>
          <Modal
                title=""
                visible={this.state.modalPanel}
                onOk={this.refundAction}
                onCancel={this.handleCancel}
                >
                <p>确定{this.state.action==0?'拒绝':'同意'}吗？</p>
            </Modal>
            <Modal
                title=""
                visible={this.state.modalPanel}
                onOk={this.refundAction}
                onCancel={this.handleCancel}
                >
                <p>确定{this.state.action==0?'拒绝':'同意'}吗？</p>
            </Modal>
          </>
        );
    }
}
