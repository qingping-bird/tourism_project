import React from 'react';
import HotItems from './hotItems/HotItems';
import ItemName from '../itemName/ItemName';
import './hotItem.css';

export default class HotItem extends React.Component{
    render(){
        return(
            <div className="hotItem">
                <ItemName title="热门地区" detail="热门好玩儿的目的地"/>
                <div className="hotItem-content">
                    <HotItems /><HotItems /><HotItems /><HotItems />
                    <HotItems /><HotItems /><HotItems /><HotItems />
                </div>
            </div>
        );
    }
}
