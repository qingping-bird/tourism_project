import React from 'react';
import axios from 'axios'
import { Card, Layout , Col, Row} from 'antd';
import ImgCrop from 'antd-img-crop';
import { EditOutlined} from '@ant-design/icons';
import UploadModal from './UploadModal'
import {handleImg} from '../../util/str'

const { Meta } = Card;
const { Header, Content, Footer, Sider } = Layout;
export default class BannerCard extends React.Component{
  constructor(props){
    super(props);
    this.state={
        isPanel:false
    }
  }

  componentWillMount(){
      this.setState({
          isPanel:false
      })
  }

  showUploadPanel=()=>{
      if(this.state.isPanel){
          return (<><UploadModal  width={this.props.width} height={this.props.height} 
            changeIsUploadPanel={this.changeIsUploadPanel} homeId={this.props.homeId}/></>)
      }
      return
  }

  changeIsUploadPanel=()=>{
    this.setState(state=>({isPanel:!state.isPanel}))
  }


    render(){
        const data=this.props.data
        return(
            <>
            <Col span={this.props.col}>
            <Card
                  style={{ width: this.props.w,margin:'10px' }}
                  cover={
                  <img style={{ width:this.props.w,height:this.props.h}}
                //   src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                      src={require("D://imgDatabase//bannerImg//"+handleImg(data.homeImg))}
                  />
                  }
                  actions={[
                  <EditOutlined key="edit" onClick={this.changeIsUploadPanel}/>
                  ]}
              >
                  <Meta
                //   title='465'
                //   description='6548'
                  title={data.homeTitle}
                  description={data.homeText}
                  />
              </Card></Col>
              {this.showUploadPanel()}
          </>
        );
    }
}
