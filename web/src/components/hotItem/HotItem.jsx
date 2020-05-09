import React from 'react'
import HotItems from './hotItems/HotItems'
import ItemName from '../itemName/ItemName'
import './hotItem.css'

export default class HotItem extends React.Component{
    constructor(props){
        super(props)
        this.state={
            data:null
        }
    }

    componentWillMount(){
        this.setState({
            data:this.props.data
        })
    }

    showItems=()=>{
        let item=[]
        for(let i=0;i<8;i++){
            item.push(<HotItems key={i} data={this.props.data[i]}/>)
        }
        return (<>{item}</>)
    }

    render(){
        return(
            <div className="hotItem">
                <ItemName title="热门地区" detail="热门好玩儿的目的地"/>
                <div className="hotItem-content">
                    {this.showItems()}
                </div>
            </div>
        );
    }
}
