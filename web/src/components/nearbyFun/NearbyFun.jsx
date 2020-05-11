import React from 'react';
import ItemName from '../itemName/ItemName';
import ItemProjectList from '../itemProjectList/ItemProjectList';
import { Link } from 'react-router-dom'
import './nearbyFun.css';

export default class NearbyFun extends React.Component{

    showList=(n)=>{
        const data=this.props.data
        let item=[]
        for(let i=0;i<3;i++){
            item.push(
            <Link to={{ pathname : `/projectDetail/${this.props.data[i].homeHref}`}} style={{textDecoration:'none'}} key={i}>
            <ItemProjectList data={this.props.data[i]}/>
            </Link>
        )
        }
        return (<>{item}</>)
    }

    render(){
        return(
            <div className="nearbyFun">
                <ItemName title="周边玩乐" detail="台州市内的游乐场所"  icon={(<>&#xe612;</>)}/>
                <div className="nearbyFun-content">
                {this.showList()}
                </div>
                <Link to={`/tourism/4`} style={{textDecoration:'none'}}>
                <span className="nearbyFun-more-button" >>>查看更多</span>
                </Link>
            </div>
        );
    }
}
