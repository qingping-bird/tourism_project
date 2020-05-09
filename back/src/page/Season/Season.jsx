import React from 'react';
import axios from 'axios'
import { Card, Avatar,Layout , Col, Row} from 'antd';
import { Select,Button, Radio,Input } from 'antd';
import { UploadOutlined,EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import BannerCard from '../../components/BannerCard/BannerCard'
import './Season.css'
const { Search } = Input;

const { Meta } = Card;
const { Header, Content, Footer, Sider } = Layout;

export default class Season extends React.Component{
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

  showBannerCard=(t)=>{
    if(this.state.projectList){
      let item=[];
      for(let i=0;i<3;i++){
          let k=i+t
          item.push(<BannerCard width={1000} height={500} w='300px' h='150px' col={8} data={this.state.projectList[k]} key={k} homeId={k+1}/>)
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
                <h1 className='season-h1'>国内旅游>></h1>
                <Row gutter={16}>
                    {this.showBannerCard(12)}
                </Row>
                <br />
                <h1 className='season-h1'>出境旅游>></h1>
                <Row gutter={16}>
                    {this.showBannerCard(15)}
                </Row>
                <br />
                <h1 className='season-h1'>自由行>></h1>
                <Row gutter={16}>
                    {this.showBannerCard(18)}
                </Row>
            </Layout>
          </>
        );
    }
}
