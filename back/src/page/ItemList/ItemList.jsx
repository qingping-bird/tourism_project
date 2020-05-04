import React from 'react';
import axios from 'axios'
import UploadNewProject from '../../components/UploadNewProject/UploadNewProject'
import ProjectList from '../../components/ProjectList/ProjectList'
import { Layout, Menu, Breadcrumb,Pagination } from 'antd';
import { Select,Button, Radio,Input } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
const { Header, Content} = Layout;

const { Search } = Input;



export default class ItemList extends React.Component{
  constructor(props){
    super(props);
    this.state={
      isUploadPanel:false,
      countProject:0,
      update:0,
      currentPage:1,
      keyWord:'',
      projectSort:"0"
    }
  }

  componentWillMount(){//组件加载
    this.countProject();
    this.setState({ projectSort: "0"});
  }

  inputKeyWord=async(value)=>{
    await this.setState({ keyWord: value});
    this.countProject();
    this.updateProjectList();
  }
  
 handleSortChange = async e => { //改变分类
    await this.setState(state=>({
      projectSort: e.target.value,
      currentPage:1
    }))
    this.countProject();
    this.updateProjectList();
  };

  countProject=()=>{//请求数据量
    let _this=this;
    axios.get('http://localhost:4001/countProject',{
      params:
            {project_sort:_this.state.projectSort,
              keyWord:_this.state.keyWord}
    })
    .then(function (response) {
      _this.setState(state=>({
        countProject:response.data.count
      }))
    })
    .catch(function (error) {
        console.log(error);
    });
  }

  changeIsUploadPanel=()=>{//改变新建项目框可见
    this.setState(state=>({
      isUploadPanel:!this.state.isUploadPanel
    }))
  }

  showUploadPanel=()=>{//显示新建
    if(this.state.isUploadPanel){
      return(
        <UploadNewProject changeIsUploadPanel={this.changeIsUploadPanel} updateProjectList={this.updateProjectList}/>
      )
    }
    return
  }

  updateProjectList=()=>{//更新列表
    this.setState(state=>({
      update:!this.state.update
    }))
  }

    render(){
      const {projectSort}=this.state;
        return(
          <>
            <Layout className="site-layout" style={{ marginLeft:'200px'}}>
              <Header className="site-layout-background" style={{ padding: 0 }} >
              <Search style={{width:'550px',marginLeft:'15px',marginTop:'15px'}} 
                 placeholder="输入关键词" onSearch={this.inputKeyWord} enterButton />
                <Button type="primary" shape="round" icon={<UploadOutlined />} size='middle'
                onClick={this.changeIsUploadPanel}
                style={{ float:'right',marginRight:'15px',marginTop:'15px'}}>
                  新建项目
                </Button>
              </Header>
            <Content style={{ margin: '0 16px' }}>
              <Breadcrumb style={{ margin: '16px 0' }}>
              </Breadcrumb>
              <div className="site-layout-background" style={{ padding: 24, minHeight: 360 ,overflow:'hidden',marginBottom:'30px'}}>
              
              <Radio.Group value={projectSort} onChange={this.handleSortChange}>
                <Radio.Button value="0">全部</Radio.Button>
                <Radio.Button value="1">国内团</Radio.Button>
                <Radio.Button value="2">出境团</Radio.Button>
                <Radio.Button value="3">自由行</Radio.Button>
                <Radio.Button value="4">门票</Radio.Button>
            </Radio.Group>

              <ProjectList key={this.state.update} updateProjectList={this.updateProjectList}
              currentPage={this.state.currentPage} project_sort={this.state.projectSort}
              keyWord={this.state.keyWord}/>
              <Pagination pageSize={10} onChange={
                  (e)=>{
                    this.setState(state=>({
                      currentPage:e
                    }))
                    this.updateProjectList()
                  }
                }
                current={this.state.currentPage} total={this.state.countProject} style={{marginTop:'30px',float:'right'}}/>
              </div>
            </Content>
          </Layout>
          {this.showUploadPanel()}
          </>
        );
    }
}
