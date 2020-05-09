import React from 'react';
import { Link } from 'react-router-dom';
import './classification.css';

export default class Classification  extends React.Component{
    constructor(props){
        super(props);
        this.state={
            sort:0,
            money:0,
            day:0
        }
    }

    componentWillMount(){
        const {sort,money,day}=this.props.state;
        this.setState({
            sort:sort,
            money:money,
            day:day
        })
    }

    handleClick=(e)=>{
        this.props.handleClick(e)
    }
    

  render(){
      const clickStyle={
        backgroundColor: 'rgb(219, 174, 26)',
        boxSizing: 'border-box',
        color: 'rgb(255, 255, 255)',
    }

    const {sort,money,day}=this.props.state;
      return(
        <div className="classification">
        <table className="classification-table">
        <tbody>
            <tr>
                <th><p>类 型</p></th>
                <td><Link to={{ pathname : `/tourism/0` , state : {userId:this.props.userId}}} className="classification-item"><p onClick={this.handleClick} data-value={0} data-name="sort" style={sort==0?clickStyle:{}}>全部</p></Link></td>
                <td><Link to={{ pathname : `/tourism/1` , state : {userId:this.props.userId}}} className="classification-item"><p onClick={this.handleClick} data-value={1} data-name="sort" style={sort==1?clickStyle:{}}>国内游</p></Link></td>
                <td><Link to={{ pathname : `/tourism/2` , state : {userId:this.props.userId}}} className="classification-item"><p onClick={this.handleClick} data-value={2} data-name="sort" style={sort==2?clickStyle:{}}>出境游</p></Link></td>
                <td><Link to={{ pathname : `/tourism/3` , state : {userId:this.props.userId}}} className="classification-item"><p onClick={this.handleClick} data-value={3} data-name="sort" style={sort==3?clickStyle:{}}>自由行</p></Link></td>
            </tr>
            <tr>
                <th><p>价 格</p></th>
                <td><p onClick={this.handleClick} data-value={0} data-name="money" style={money==0?clickStyle:{}}>全部</p></td>
                <td><p onClick={this.handleClick} data-value={1} data-name="money" style={money==1?clickStyle:{}}>500以下</p></td>
                <td><p onClick={this.handleClick} data-value={2} data-name="money" style={money==2?clickStyle:{}}>500-2000</p></td>
                <td><p onClick={this.handleClick} data-value={3} data-name="money" style={money==3?clickStyle:{}}>2001-8000</p></td>
                <td><p onClick={this.handleClick} data-value={4} data-name="money" style={money==4?clickStyle:{}}>8001以上</p></td>
            </tr>
            <tr>
                <th><p>时 间</p></th>
                <td><p onClick={this.handleClick} data-value={0} data-name="day" style={day==0?clickStyle:{}}>全部</p></td>
                <td><p onClick={this.handleClick} data-value={1} data-name="day" style={day==1?clickStyle:{}}>一日游</p></td>
                <td><p onClick={this.handleClick} data-value={2} data-name="day" style={day==2?clickStyle:{}}>两日游</p></td>
                <td><p onClick={this.handleClick} data-value={3} data-name="day" style={day==3?clickStyle:{}}>三日游</p></td>
                <td><p onClick={this.handleClick} data-value={4} data-name="day" style={day==4?clickStyle:{}}>四日游</p></td>
                <td><p onClick={this.handleClick} data-value={5} data-name="day" style={day==5?clickStyle:{}}>五日游</p></td>
                <td><p onClick={this.handleClick} data-value={6} data-name="day" style={day==6?clickStyle:{}}>六日游</p></td>
                <td><p onClick={this.handleClick} data-value={7} data-name="day" style={day==7?clickStyle:{}}>七日游</p></td>
                <td><p onClick={this.handleClick} data-value={8} data-name="day" style={day==8?clickStyle:{}}>七日以上</p></td>
            </tr>
         </tbody>
        </table>
        </div>
      );
  }
}