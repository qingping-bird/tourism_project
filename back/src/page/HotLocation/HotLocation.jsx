import React from 'react';
import axios from 'axios'
import { Card, Avatar,Layout , Col, Row} from 'antd';
import { Select,Button, Radio,Input } from 'antd';
import { UploadOutlined,EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import BannerCard from '../../components/BannerCard/BannerCard'
const { Search } = Input;

const { Meta } = Card;
const { Header, Content, Footer, Sider } = Layout;

export default class HotLocation extends React.Component{
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

  showBannerCard=()=>{
    if(this.state.projectList){
      let item=[];
      for(let i=0;i<8;i++){
          let k=i+4;
          item.push(<BannerCard width={600} height={600} w='200px' h='200px' col={6} 
          data={this.state.projectList[k]} key={k} homeId={k+1}/>)
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
            <Layout className="site-layout" style={{ marginLeft:'200px',padding:'20px'}}>
            <Row gutter={16}>
            {this.showBannerCard()}
                </Row>
          </Layout>
          </>
        );
    }
}
