import React from 'react';
import ItemName from '../itemName/ItemName';
import ItemProjectList from '../itemProjectList/ItemProjectList';
import { Link } from 'react-router-dom';
import ScrollToTop from '../ScrollToTop';
import './seasonProject.css';

export default class HotItem extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            sort:1
        }
      }
    
    componentWillMount(){
        this.setState({sort:1})
    }

    handleClick=async(e)=>{
        let target=e.target;
        let value=target.getAttribute("data-value"); 
        await this.setState(state=>({
            sort:value
        }))
    }

    showList=(n)=>{
        const data=this.props.data
        let item=[]
        for(let i=0;i<3;i++){
            item.push(
            <Link to={{ pathname : `/projectDetail/${this.props.data[3*(n-1)+i].homeHref}`}} style={{textDecoration:'none'}} key={i}>
            <ItemProjectList data={this.props.data[3*(n-1)+i]}/>
            </Link>
        )
        }
        return (<>{item}</>)
    }

    render(){
        const sort=this.state.sort

        const clickStyle={backgroundcolor: 'white',
        boxShadow:'5px 5px 8px 3px rgba(81, 92, 100, 0.473),inset 1px 1px 2px 2px rgba(56, 55, 54, 0.041),inset -2px -2px 5px 3px rgba(255, 255, 255, 0.397)',
        backgroundColor: 'rgb(240, 240, 240)',
        color: 'rgb(219, 174, 26)',
        fontWeight: '600'}

        return(
            <div className="seasonProject">
                <ItemName title="当季项目" detail="推荐当季的实惠套餐"/>
                <ul className="seasonProject-choice">
                    <li onClick={this.handleClick} data-value={1} style={sort==1?clickStyle:{}}>国内旅游</li>
                    <li onClick={this.handleClick} data-value={2} style={sort==2?clickStyle:{}}>出境旅游</li>
                    <li onClick={this.handleClick} data-value={3} style={sort==3?clickStyle:{}}>自由行</li>
                </ul>
                <div className="seasonProject-content">
                    {this.showList(sort)}
                </div>
                <ScrollToTop>
                    <Link to={`/tourism/${sort}`} className="seasonProject-more-button" >
                        <span>>>查看更多</span>
                    </Link>
                </ScrollToTop>
            </div>
        );
    }
}
