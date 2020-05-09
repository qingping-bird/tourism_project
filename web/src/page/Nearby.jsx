import React from 'react';
import Search from '../components/search/Search';
import TourismList from '../components/NearbyList/TourismList';
import './domesticTourism.css';

export default class Nearby  extends React.Component{
  constructor(props){
    super(props);
    this.state={
      sort:4,
      keyWord:'',
      tourKey:false
    }
  }

  componentWillMount(){
    this.setState({
      sort:4,
      keyWord:this.props.keyWord?this.props.keyWord:''
    })
  }

  handleSearch=async (str)=>{
    this.setState(state=>({
        keyWord:str,
        tourKey:!state.tourKey
    })
  )
  }

  render(){
      return(
        <>
          <Search handleSearch={this.handleSearch} value={this.state.keyWord}/>
          <TourismList key={this.state.tourKey} state={this.state} userId={this.props.userId}/>
        </>
      );
  }
}