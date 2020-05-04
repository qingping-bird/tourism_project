import React from 'react';
import './ProjectListCard.css'
import projectSort from './projectSort.json'
import { Card,Tag,Modal,InputNumber } from 'antd';
import axios from 'axios'
import { FormOutlined,DeleteOutlined,UnorderedListOutlined} from '@ant-design/icons';

const { Meta } = Card;

export default class ProjectListCard extends React.Component{
    constructor(props){
        super(props);
        this.state={
            checkVisible:false,
            changeMoneyVisible:false,
            changeMoney:0,
            checkIsNumber:true
        }
    }

    componentWillMount(){
        this.setState(state=>({
            changeMoney:this.props.data.project_money,
            checkIsNumber:true
        }))
    }

    checkIsNumber=(value)=>{
        if(!/^\d+(\.\d+)?$/.test(value)){
            this.setState(state=>({
                checkIsNumber:false
            }))
        }
        else{
            this.setState(state=>({
                checkIsNumber:true,
                changeMoney:value
            }))
        }
    }

    changeMoney=()=>{
        let _this=this;
        axios.get('http://localhost:4001/changeProjectMoney',{
            params:
            {id:_this.props.data.project_id,
            money:_this.state.changeMoney}
        })
        .then(function (response) {
            _this.props.updateProjectList()
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    deleteProject=()=>{
        let _this=this;
        axios.get('http://localhost:4001/deleteProject',{
            params:
            {id:_this.props.data.project_id}
        })
        .then(function (response) {
            _this.props.updateProjectList()
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    handleCancel=()=>{
        this.setState(state=>({
            checkVisible:false,
            changeMoneyVisible:false
        }))
    }

    render(){
        let data=this.props.data
        return(
            <>
            <Card
                hoverable
                style={{ marginTop:'20px',width:'100%'}}
                actions={[
                    <div key="edit"onClick={()=>{
                        this.setState(state=>({
                            changeMoneyVisible:true
                    }))
                        }}><FormOutlined /> 修改价格</div>,
                    <div key="delete" onClick={()=>{
                        this.setState(state=>({
                        checkVisible:true
                    }))
                        }}><DeleteOutlined /> 删除项目</div>,
                        <div key="client"><UnorderedListOutlined /> 预订顾客</div>,
                  ]}
            >
                <img className="project-card-img" 
                src={require("D://imgDatabase//projectImg//"+data.project_id+".jpg")} />
                <div className="project-card-content">
                <h1>{data.project_name}</h1>
                <h2>{data.project_detail}</h2>
                <Tag color="#3b5999">{projectSort[data.project_sort]}</Tag>
                <Tag color="#f50">价格：{data.project_money}</Tag>
                <Tag color="#2db7f5">时间：{data.project_start_time} -- {data.project_end_time}</Tag>
                <Tag color="#87d068">天数：{data.project_day}</Tag>
                <Tag color="#108ee9">已购人数：{data.project_count}</Tag>
                </div>
            </Card>
            <Modal
                title=""
                visible={this.state.checkVisible}
                onOk={this.deleteProject}
                onCancel={this.handleCancel}
                >
                <p>确认删除吗？</p>
            </Modal>
            <Modal
                title="修改价格"
                visible={this.state.changeMoneyVisible}
                onOk={this.changeMoney}
                onCancel={this.handleCancel}
                >
                  <InputNumber  defaultValue={this.props.data.project_money} onChange={this.checkIsNumber}/>
                  <p style={{color:'red',marginTop:'10px',fontSize:'14px',display:this.state.checkIsNumber?'none':'block'}}>请输入数字</p>
            </Modal>
            </>
        );
    }
}
