import React from 'react';
import ItemName from '../itemName/ItemName';
import ItemProjectList from '../itemProjectList/ItemProjectList';
import './nearbyFun.css';

export default class NearbyFun extends React.Component{

    render(){
        return(
            <div className="nearbyFun">
                <ItemName title="周边玩乐" detail="台州市内的游乐场所"/>
                <div className="nearbyFun-content">
                    <ItemProjectList />
                    <ItemProjectList />
                    <ItemProjectList />
                </div>
                <span className="nearbyFun-more-button" >>>查看更多</span>
            </div>
        );
    }
}
