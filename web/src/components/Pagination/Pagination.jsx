import React from 'react';
import ItemName from '../itemName/ItemName';
import ItemProjectList from '../itemProjectList/ItemProjectList';
import './Pagination.css'
import { Link } from 'react-router-dom'

export default class Pagination extends React.Component{
    constructor(props){
        super(props)
        this.state={
            value:1,
            total:null,
            page:null
        }
    }

    async componentWillMount(){
        await this.props.countProject(this)
    }

    handleReduce=async()=>{
        if(this.state.value>1){
            await this.setState(state=>({
            value:state.value-1
        }))
        window.scrollTo(0, 0)
        this.props.handleOffset(this.state.value)
        }
    }

    handleAdd=async()=>{
        if(this.state.value<this.state.page){
            await this.setState(state=>({
                value:state.value+1
            }))   
            window.scrollTo(0, 0)
            this.props.handleOffset(this.state.value)
        }    
    }

    handleChange=async(e)=>{
        await  this.setState({
            value:e.target.value-'0'
        })
        window.scrollTo(0, 0)
        this.props.handleOffset(this.state.value)
    }

    showOptions=()=>{
        let items=[]
        for(let i=0;i<this.state.page;i++){
            items.push(
                <option key={i} value ={i+1}>{i+1}</option>
            )
        }
        return (<>{items}</>)
    }

    showCotent=()=>{
        
        const nouseStyle={
            backgroundColor: 'rgb(210, 210, 210)',
            color: 'rgb(255, 255, 255)',
            cursor: 'not-allowed'
        }

        if(this.state.total==0){
            return
        }
        else{
            return(
                <div className="pagination">
            <span style={this.state.value===1?nouseStyle:{}} className="pagination-before" onClick={this.handleReduce}>{`<`}</span>
                <select className="pagination-select" value={this.state.value} onChange={this.handleChange}>
                    {this.showOptions()}
                </select>
            <span style={this.state.value===this.state.page?nouseStyle:{}} className="pagination-next" onClick={this.handleAdd}>{`>`}</span>
            </div>
            )
        }
    }

    render(){

        return(<>
        {this.showCotent()}
           </>  
        );
    }
}
