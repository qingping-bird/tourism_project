import React from 'react';
import axios from 'axios'
import UploadNewProject from '../../components/UploadNewProject/UploadNewProject'
import ProjectList from '../../components/ProjectList/ProjectList'
import { Layout, Tag, Breadcrumb,Pagination,Table,Modal } from 'antd';
import { Select,Button, Radio,Input } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import NewAdmin from '../../components/NewAdmin/NewAdmin'
const { Header, Content} = Layout;


export default class Admin extends React.Component{
  constructor(props){
    super(props);
    this.state={
      update:0,
      keyWord:'',
      data:null,
      Id:null,
      modalPanel:false,
      isUploadPanel:false
    }
  }

  componentWillMount(){//组件加载
    this.updateProjectList()
  }

  inputKeyWord=async(value)=>{ //搜索
    await this.setState({ keyWord: value});
    this.updateProjectList();
  }

  updateProjectList=()=>{//获取管理员列表
    let _this=this
    axios.get('http://localhost:4001/adminList',{})
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

  deleteAction=()=>{
    let _this=this
    axios.get('http://localhost:4001/deleteAdmin',{
        params:{id:_this.state.Id}
    })
    .then(async function (response) {
        _this.updateProjectList();
        _this.handleCancel()
    })
    .catch(function (error) {
        console.log(error);
    });
  }

  showUploadPanel=()=>{//显示新建
    if(this.state.isUploadPanel){
      return(
        <NewAdmin changeIsUploadPanel={this.changeIsUploadPanel} updateProjectList={this.updateProjectList}/>
      )
    }
    return
  }

  showList=()=>{
    if(this.state.data){
        let item=[];
        let tem=this.state.data;
        for(let i=0;i<tem.length;i++){
                item.push({
                    key: i,
                    id: tem[i].adminId,
                    phone: tem[i].phone
                })
            }
        return item
    }
    return []
    }

    changeIsUploadPanel=()=>{//改变新建项目框可见
        this.setState(state=>({
          isUploadPanel:!this.state.isUploadPanel
        }))
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
            title: '手机号',
            dataIndex: 'phone',
            key: 'phone'
          },
        {
            title: '删除',
            key: 'delete',
            render: (text, record) => (
              <span>
                <a onClick={()=>{this.setState({Id:record.id,modalPanel:true})}}>删除</a>
              </span>
            ),
          }
      ];

        return(
          <>
            <Layout className="site-layout" style={{ marginLeft:'200px'}}>
              <Header className="site-layout-background" style={{ padding: 0 }} >
              <Button type="primary" shape="round" icon={<UploadOutlined />} size='middle'
                onClick={this.changeIsUploadPanel}
                style={{ float:'right',marginRight:'15px',marginTop:'15px'}}>
                  添加管理
                </Button>
              </Header>
            <Content style={{ margin: '16px' }}>
                <Table key={this.state.update} columns={columns} dataSource={this.showList()} />
            </Content>
          </Layout>
          <Modal
                title=""
                visible={this.state.modalPanel}
                onOk={this.deleteAction}
                onCancel={this.handleCancel}
                >
                <p>确定删除吗？</p>
            </Modal>
            {this.showUploadPanel()}
          </>
        );
    }
}
