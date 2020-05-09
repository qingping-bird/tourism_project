import React from 'react';
import axios from 'axios'
import { Form, Input, Button,message,Modal } from 'antd';
import './Login.css'

export default class Login extends React.Component{
  constructor(props){
      super(props);
      this.state={
        visible:false
      }
  }

  formRef = React.createRef();

  handleCancel=()=>{
    this.setState({
        visible:false
    })
    }

  onFinish=values =>{
    let _this=this;
    axios.post('http://localhost:4001/login',{
            phone:values.phone,
            password:values.password
        })
        .then(function (response) {
            if(!response.data.err){
              _this.props.login(response.data.phone,response.data.id)
            }
            else{
                _this.setState(state => ({
                    visible:true
              }));
            }
        })
        .catch(function (error) {
            console.log(error);
        });
  }

  render(){
  return(
    <div className="login-back">
        <div className="login-content">
            <img className="login-logo" src={require("D:/imgDatabase/logo.png")} />
            <Form ref={this.formRef}  onFinish={this.onFinish}
            name="basic"
            >
            <Form.Item
                name="phone"
                rules={[{ required: true, message: '请输入账号' }]}
            >
                <Input placeholder="请输入手机号"/>
            </Form.Item>

            <Form.Item
                name="password"
                rules={[{ required: true, message: '请输入密码' }]}
            >
                <Input.Password placeholder="请输入密码"/>
            </Form.Item>

            <Form.Item >
                <Button htmlType="submit" style={{width:'100%',background:"rgb(235, 192, 4)",border:"1px solid rgb(235, 192, 4)",
                color:'white',fontWeight:'500'}}>
                登录
                </Button>
            </Form.Item>
            </Form>
        </div>
        <Modal
                title=""
                visible={this.state.visible}
                onOk={this.handleCancel}
                onCancel={this.handleCancel}
                >
                <p>账号或密码不正确</p>
            </Modal>
    </div>
  );
}}

