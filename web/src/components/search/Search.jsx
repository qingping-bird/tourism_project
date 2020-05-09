import React from 'react';
import './search.css';

export default class Search extends React.Component{
    constructor(props){
        super(props);
        this.state={
            value:''
        }
    }

    componentWillMount(){
        this.setState({
            value:this.props.value?this.props.value:''
        })
    }

    handleChange=(e)=>{
        this.setState(
            {value:e.target.value}
        )
    }

    searchSubmit=(event)=>{
        event.preventDefault();
        this.props.handleSearch(this.state.value)
    }

   render(){
      return(
        <form className="search" onSubmit={this.searchSubmit}>
            <input onChange={this.handleChange} value={this.state.value} placeholder="请输入关键词搜索" className="search-content" type="text"/>
            <input type="submit" className="search-submit" value="搜 索"/>
        </form>
      );
  }
}