import React from 'react'
import axios from 'axios'
import BookItem from './BookItem/BookItem'
import './BookList.css'

export default class BookList extends React.Component{
    constructor(props){
        super(props)
        this.state={
            data:null,
            sort:0
        }
    }

    componentWillMount(){
        this.sendRequest();
    }

    sendRequest=()=>{//获取请求
        let _this=this;
        axios.get('http://localhost:4000/booklist',{
            params:{
                id:this.props.id,
                state:this.state.sort
            }
                })
                .then(function (response) {
                    _this.setState({
                        data:response.data.data
                    })
                })
                .catch(function (error) {
                    console.log(error);
            });
    }

    handleClick=async(e)=>{
        let target=e.target;
        let value=target.getAttribute("data-value"); //react获取自定义属性 https://blog.csdn.net/sinat_17775997/article/details/62215473
        let obj=target.getAttribute("data-name");
        await this.setState(state=>({
            [obj]:value
        }))
        this.sendRequest();
    }
    
    showItemList=()=>{
        if(this.state.data){
            let items=[];
            for(let i=0;i<this.state.data.length;i++){
                items.push(<BookItem key={i} data={this.state.data[i]} update={this.sendRequest}/>)
            }
            return( <>
                {items}
                </>)
        }
        else return
    }

    render(){
        const clickStyle={
            backgroundcolor: 'white',
            boxShadow:'5px 5px 8px 3px rgba(81, 92, 100, 0.473),inset 1px 1px 2px 2px rgba(56, 55, 54, 0.041),inset -2px -2px 5px 3px rgba(255, 255, 255, 0.397)',
            backgroundColor: 'rgb(240, 240, 240)',
            color: 'rgb(219, 174, 26)',
            fontWeight: '600'
          }
          const sort=this.state.sort;
        return(
            <div className="book-list">
                <ul className="book-list-choice">
                    <li onClick={this.handleClick} data-value={0} data-name="sort" style={sort==0?clickStyle:{}}>全部</li>
                    <li onClick={this.handleClick} data-value={1} data-name="sort" style={sort==1?clickStyle:{}}>已预定</li>
                    <li onClick={this.handleClick} data-value={2} data-name="sort" style={sort==2?clickStyle:{}}>退款中</li>
                    <li onClick={this.handleClick} data-value={3} data-name="sort" style={sort==3?clickStyle:{}}>已退款</li>
                </ul>
                {this.showItemList()}
            </div>
        )
    }
}