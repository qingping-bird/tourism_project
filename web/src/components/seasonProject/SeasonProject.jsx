import React from 'react';
import ItemName from '../itemName/ItemName';
import ItemProjectList from '../itemProjectList/ItemProjectList';
import { Link } from 'react-router-dom';
import ScrollToTop from '../ScrollToTop';
import './seasonProject.css';

export default class HotItem extends React.Component{
    constructor(props) {
        super(props);
      }

    render(){
        return(
            <div className="seasonProject">
                <ItemName title="当季项目" detail="推荐当季的实惠套餐"/>
                <ul className="seasonProject-choice">
                    <li>国内旅游</li>
                    <li>出境旅游</li>
                    <li>自由行</li>
                </ul>
                <div className="seasonProject-content">
                    <ItemProjectList />
                    <ItemProjectList />
                    <ItemProjectList />
                </div>
                <ScrollToTop>
                    <Link to="/tourism" className="seasonProject-more-button" >
                        <span>>>查看更多</span>
                    </Link>
                </ScrollToTop>
            </div>
        );
    }
}
