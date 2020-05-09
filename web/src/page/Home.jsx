import React from 'react';
import axios from 'axios'
import Banner from '../components/banner/Banner';
import HotItem from '../components/hotItem/HotItem';
import SeasonProject from '../components/seasonProject/SeasonProject';
import NearbyFun from '../components/nearbyFun/NearbyFun';

export default class Home extends React.Component{
  constructor(props){
    super(props)
    this.state={
      data:null
    }
  }

  async componentWillMount(){
    let _this=this
    await axios.get('http://localhost:4000/bannerList',{})
        .then(function (response) {
          _this.setState(state=>({
            data:response.data.data
          }))
        })
        .catch(function (error) {
            console.log(error);
        });
  }

  showContent=()=>{
    if(this.state.data){
      let data=this.state.data
      return(<><Banner data={data.slice(0,4)}/>
        <HotItem data={data.slice(4,12)} />
        <SeasonProject  data={data.slice(12,21)}/>
        <NearbyFun data={data.slice(21,24)}/></>)
    }
    return 
  }

  render(){
      return(
        <div style={{minHeight:'1000px'}}>
          {this.showContent()}
        </div>
      );
  }
}