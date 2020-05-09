import React from 'react'
import axios from 'axios'
import {handleTime} from '../../util/str'
import './PickCount.css'

export default class PickCount extends React.Component{
    constructor(props){
        super(props)
        this.state={
            count:1
        }
    }

    componentWillMount(){
        this.setState({
            count:1
          })
    }

    handleChangeAdd=async (e)=>{
        await this.setState({
            count:this.state.count+1
          })
        this.props.handleCount(this.state.count)
    }

    handleChangeDe=async (e)=>{
        if(this.state.count>0){
        await this.setState({
            count:this.state.count-1
          })
        this.props.handleCount(this.state.count)
        }
    }

    render(){
        const noUseStyle={
            backgroundColor: 'rgb(141, 141, 141)',
            border: '1px solid rgb(245, 245, 245)',
            border: '1px solid rgb(141, 141, 141)'
        }
        return(
            <div className="pick-count">
                <span style={this.state.count==0?noUseStyle:{}} className="pick-count-button" onClick={this.handleChangeDe}>-</span>
                <span className="pick-count-text">{this.state.count}</span>
                <span className="pick-count-button" onClick={this.handleChangeAdd}>+</span>
                <span style={{fontSize:'14px'}}>&nbsp;&nbsp;人</span>
            </div>
        )
    }
}