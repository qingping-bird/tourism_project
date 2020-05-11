import React from 'react';
import './tourismList.css';
import axios from 'axios'
import Pagination from '../Pagination/Pagination'
import TourismListItem from './tourismListItem/TourismListItem';

export default class TourismList extends React.Component{
    constructor(props){
        super(props);
        this.state={
            sort:0,
            dataList:null,
            offset:1,
            offsetKey:0
        }
    }

    componentWillMount(){ //初始化
        this.sendRequest();
    }

    sendRequest=()=>{//获取请求
        let _this=this;
        axios.get('http://localhost:4000/project',{
            params:{
                order:_this.state.sort,
                offset:_this.state.offset-1,
                project_sort:_this.props.state.sort,
                project_money:_this.props.state.money,
                project_day:_this.props.state.day,
                keyWord:_this.props.state.keyWord
            }
        })
        .then(function (response) {
          _this.setState(state=>({
            dataList:response.data.data
          }))
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    showProjects=()=>{ //循环获取项目
        if(this.state.dataList)
        {let items = [];
        for (let i = 0; i <this.state.dataList.length; i++) {
            items.push(<TourismListItem key={i} data={this.state.dataList[i]} userId={this.props.userId}
                updateProjectList={this.props.updateProjectList}/>);
        }
        if(items.length>0){
            return(
                <>{items}</>)
        }
        else{
            return(
                <><div className="empty-content">
                    <img src={require("D:/imgDatabase/empty.png")}
                     className="empty-img"/>
                </div></>
            )
        }}
        return
    }

    handleClick=async(e)=>{
        let target=e.target;
        let value=target.getAttribute("data-value"); //react获取自定义属性 https://blog.csdn.net/sinat_17775997/article/details/62215473
        let obj=target.getAttribute("data-name");
        await this.setState(state=>({
            [obj]:value,
            offsetKey:!state.offsetKey,
            offset:1
        }))
        this.sendRequest();
    }

    handleOffset=(offset)=>{
        this.setState(state=>({
          offset:offset,
          tourKey:!state.tourKey
        }))
        this.sendRequest();
      }
    
    countProject=(k)=>{//请求数据量
    let _this=this;
    axios.get('http://localhost:4000/countProject',{
        params:
            {
                project_sort:_this.props.state.sort,
                project_money:_this.props.state.money,
                project_day:_this.props.state.day,
                keyWord:_this.props.state.keyWord}
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
      const clickStyle={
        backgroundcolor: 'white',
        boxShadow:'5px 5px 8px 3px rgba(81, 92, 100, 0.473),inset 1px 1px 2px 2px rgba(56, 55, 54, 0.041),inset -2px -2px 5px 3px rgba(255, 255, 255, 0.397)',
        backgroundColor: 'rgb(240, 240, 240)',
        color: 'rgb(219, 174, 26)',
        fontWeight: '600'
      }
      const sort=this.state.sort;
      return(
        <>
            <ul className="tourismList-choice">
                <li onClick={this.handleClick} data-value={0} data-name="sort" style={sort==0?clickStyle:{}}>默认</li>
                <li onClick={this.handleClick} data-value={1} data-name="sort" style={sort==1?clickStyle:{}}>销量</li>
                <li onClick={this.handleClick} data-value={2} data-name="sort" style={sort==2?clickStyle:{}}>价格</li>
            </ul>
            {this.showProjects()}
            <Pagination key={this.state.offsetKey} handleOffset={this.handleOffset} countProject={this.countProject}/>
        </>
    );
  }
}