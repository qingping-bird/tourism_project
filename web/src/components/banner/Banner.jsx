import React from 'react';
import {handleImg} from '../../util/str'
import './banner.css';
import { Link } from 'react-router-dom'


export default class Navigation extends React.Component{
    constructor(props){
        super(props)
        this.state={
            value:0,
            text:''
        }
    }

    componentDidMount(){//设置计时器
        this.timerID =setInterval(
            () => {
                this.setState(state=>({value:state.value>=3?0:state.value+1}))
            },
            2000
          )
    }

    componentWillUnmount() {//移除计时器
        clearInterval(this.timerID );
      }

    handleHover=(e)=>{
        let num=e.target.getAttribute('data-value')
        if(num){
            clearInterval(this.timerID );
            this.setState(state=>({value:num-'0'}))
        }
        
    }

    handleLeave=(e)=>{
        clearInterval(this.timerID );
         this.timerID =setInterval(
            () => {
                this.setState(state=>({value:state.value>=3?0:state.value+1}))
            },
            2000
          )
    }

    handleChange=(e)=>{
        this.setState({
            text:e.target.value
        })
    }

    initItems=()=>{
        const data=this.props.data
        const value=this.state.value
        const itemStyle=[{
            height:' 90px',
            color: 'rgb(250, 201, 39)',
            borderRight:' 5px solid rgb(219, 174, 26)',
        },{fontSize: '35px'},{fontSize: '20px',
            fontWeight: '200'}
        ]
        let items=[]
        for(let i=0;i<4;i++){
            items.push(<div key={i} style={value==i?itemStyle[0]:{}}  className="banner-item" data-value={i}onMouseEnter={this.handleHover} onMouseLeave={this.handleLeave}>
            <h1 style={value==i?itemStyle[1]:{}}  data-value={i}onMouseEnter={this.handleHover} onMouseLeave={this.handleLeave}>{data[i].homeTitle}</h1>
            <h4 style={value==i?itemStyle[2]:{}} data-value={i}onMouseEnter={this.handleHover} onMouseLeave={this.handleLeave}>{data[i].homeText}</h4>
        </div>)
        }
        return items
    }

    prevent=(e)=>{
        e.preventDefault()
    }

    render(){
        const data=this.props.data
        const value=this.state.value
        
        return(
            
                <div className="banner">
                <Link to={{ pathname : `/projectDetail/${data[value].homeHref}`}} style={{textDecoration:'none'}}>
                <img className="banner-img" src={require("D://imgDatabase//bannerImg//"+handleImg(data[value].homeImg))} alt=""/>
                <div className="banner-content">
                    <h1 className="banner-content-h1">{data[value].homeTitle}</h1>
                    <div className="banner-list">
                        {this.initItems()}
                    </div>
                </div>
                 </Link> 
                   <input value={this.state.text} placeholder='输入关键字...' className="banner-search" type="text" onClick={this.prevent}
                    onChange={this.handleChange}/>
                   <Link to={{ pathname : `/tourism/0` , state : {keyWord:this.state.text}}} style={{textDecoration:'none'}}>
                    <span className="banner-search-button"  >搜索&nbsp;<span className="iconfont">&#xe603;</span></span>
                    </Link>
                </div>
            
        );
    }
}