import React from 'react';
import Search from '../components/search/Search';
import Classification from '../components/classification/Classification';
import TourismList from '../components/tourismList/TourismList';
import Domestic from './Domestic'
import './domesticTourism.css';

export default class DomesticTourism  extends React.Component{
  constructor(props){
    super(props);
    this.state={
      sort:0
    }
  }

  componentWillMount(){
    this.setState({
      sort:this.props.match.params.sort,
    })
  }

  async componentWillReceiveProps(next){
    this.setState({
      sort:next.match.params.sort,
    })
  }

  render(){
      return(
        <div className="domestic-tourism-body">
          <Domestic  key={this.state.sort} state={this.state}/>
        </div>
      );
  }
}