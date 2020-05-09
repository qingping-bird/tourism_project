import React from 'react';
import axios from 'axios'
import { Card, Avatar,Layout , Col, Row} from 'antd';
import { Select,Button, Radio,Input } from 'antd';
import { UploadOutlined,EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import BannerCard from '../../components/BannerCard/BannerCard'
const { Search } = Input;

const { Meta } = Card;
const { Header, Content, Footer, Sider } = Layout;

export default class Banner extends React.Component{
  constructor(props){
    super(props);
    this.state={
      projectList:null
    }
  }

  componentWillMount(){
    let _this=this;
    axios.get('http://localhost:4001/bannerList',{
    })
    .then(function (response) {
      _this.setState(state=>({
        projectList:response.data.data
      }))
    })
    .catch(function (error) {
        console.log(error);
    });
  }

  tt=()=>{
    axios.post('http://localhost:4001/upload/banner',{
    })
    .then(function (response) {
    })
    .catch(function (error) {
        console.log(error);
    });
  }

  showBannerCard=()=>{
    if(this.state.projectList){
      let item=[];
      for(let i=0;i<4;i++){
          item.push(<BannerCard width={2100} height={700} w='480px' h='160px' col={12} data={this.state.projectList[i]} key={i} homeId={i+1}/>)
      }
      return(
          <>{item}</>
      )}
      return
  }

    render(){
      const {projectSort}=this.state;
        return(
          <>
          {/* <button onClick={this.tt}>sadf</button> */}
            <Layout className="site-layout" style={{ marginLeft:'200px',padding:'20px'}}>
            <Row gutter={16}>
            {this.showBannerCard()}
                </Row>
          </Layout>
          </>
        );
    }
}
