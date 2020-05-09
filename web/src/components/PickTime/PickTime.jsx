import React from 'react'
import axios from 'axios'
import {handleTime,handleTimeCheck} from '../../util/str'
import './PickTime.css'

export default class PickTime extends React.Component{
    constructor(props){
        super(props)
        this.state={
            data:null,
            timeData:null,
            year:0,
            month:1,
            day:1
        }
    }

    async componentWillMount(){
       await this.setState({
           data:this.props.data
       })
       let timeData=await handleTime(this.state.data)
       await this.setState({
            timeData: timeData
        })
        await this.setState({
            year: this.state.timeData.start_year-'0',
            month:this.state.timeData.start_month-'0',
            day:this.state.timeData.start_day-'0'
        })
    }

    handleChange=async (e)=>{
        e.preventDefault();
        await this.setState({
            [e.target.name]: e.target.value
          })
        let {year,month,day}=this.state;
        this.props.handleChangeError(
            handleTimeCheck(year-'0',month-'0',day-'0',this.state.data),
            ''+year+'-'+month+'-'+day
        )
    }

    initTime=(start_time,end_time)=>{
            let items=[];
            for(let i=start_time;i<=end_time;i++){
                items.push(
                    <option key={i} value={i}>{i}</option>
                )
            }
            return items
    }

    handleInit=()=>{
        if(this.state.timeData){
            const {start_year,end_year}=this.state.timeData
            return(   
                <>
                <p className="project-detail-p">
                    <span style={{fontWeight:'400',color:'rgb(100, 100, 100)'}}>选择时间&nbsp;&nbsp;&nbsp;&nbsp;</span>          
                <select onChange={this.handleChange} name="year" value={this.state.year}>
                    {this.initTime(start_year,end_year)}
                </select>&nbsp;&nbsp;年&nbsp;&nbsp;&nbsp;&nbsp;
                <select onChange={this.handleChange} name="month" value={this.state.month}>
                    {this.initTime(1,12)}
                </select>&nbsp;&nbsp;月&nbsp;&nbsp;
                <select onChange={this.handleChange} name="day" value={this.state.day}>
                    {this.initTime(1,31)}
                </select>&nbsp;&nbsp;日&nbsp;&nbsp;
                </p>
                </>
            )
        }
        return
    }

    render(){
        return(
            <div className="pick-time">
                {this.handleInit()}
            </div>
        )
    }
}