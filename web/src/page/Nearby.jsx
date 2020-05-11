import React from 'react';
import axios from 'axios'
import Search from '../components/search/Search';
import TourismList from '../components/NearbyList/TourismList';
import Pagination from '../components/Pagination/Pagination'
import './domesticTourism.css';

export default class Nearby  extends React.Component{
  constructor(props){
    super(props);
    this.state={
      sort:4,
      keyWord:'',
      offset:1,
      tourKey:false,
      offsetKey:true
    }
  }

  componentWillMount(){
    this.setState({
      offset:1,
      sort:4,
      keyWord:this.props.keyWord?this.props.keyWord:''
    })
  }

  handleSearch=async (str)=>{
    this.setState(state=>({
        keyWord:str,
        tourKey:!state.tourKey,
        offsetKey:!state.offsetKey
    })
  )
  }

  
  handleOffset=(offset)=>{
    this.setState(state=>({
      offset:offset,
      tourKey:!state.tourKey,
      offsetKey:!state.offsetKey
    }))
  }

  countProject=(k)=>{//请求数据量
    let _this=this;
    axios.get('http://localhost:4000/countProjectNearby',{
      params:{project_sort:4,
              keyWord:_this.state.keyWord}
    })
    .then(function (response) {
      k.setState({
        total:response.data.count,
        page:Math.ceil(response.data.count/10)
      })
    })
    .catch(function (error) {
      console.log(error)
    });
  }

  render(){
      return(
        <>
          <Search handleSearch={this.handleSearch} value={this.state.keyWord}/>
          <TourismList key={this.state.tourKey} state={this.state} userId={this.props.userId}/>
          <Pagination key={this.state.offsetKey} handleOffset={this.handleOffset} countProject={this.countProject}/>
        </>
      );
  }
}