import React from 'react';
import Search from '../components/search/Search';
import Classification from '../components/classification/Classification';
import TourismList from '../components/tourismList/TourismList';
import './domesticTourism.css';

export default class DomesticTourism  extends React.Component{
  constructor(props){
    super(props);
    this.state={
      sort:0,
      money:0,
      day:0,
      keyWord:'',
      tourKey:false
    }
  }

  componentWillMount(){
    this.setState({
      sort:this.props.state.sort,
      keyWord:this.props.keyWord?this.props.keyWord:''
    })
  }

  handleClick=async (e)=>{
    let target=e.target;
        let value=target.getAttribute("data-value"); //react获取自定义属性 https://blog.csdn.net/sinat_17775997/article/details/62215473
        let obj=target.getAttribute("data-name");
        this.setState(state=>({
            [obj]:value,
            tourKey:!state.tourKey
        }))
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
          <Classification handleClick={this.handleClick} state={this.state}/>
          <TourismList key={this.state.tourKey} state={this.state} userId={this.props.userId}/>
        </>
      );
  }
}