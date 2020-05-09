import React from 'react';
import './NewAdmin.css'
import axios from 'axios'
import { Form, Input, Button, Radio, InputNumber,DatePicker,Modal} from 'antd'
import { message } from 'antd'

import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';

const { RangePicker } = DatePicker;
const { TextArea } = Input;

const validateMessages = {
  required: '请填写${label}',
  types: {
    email: '${label} is not validate email!',
    number: '请填写有效${label} ',
  },
  number: {
    range: '${label} 必须在 ${min} 与 ${max} 之间',
  },
};

export default class NewAdmin extends React.Component{
constructor(props){
  super(props);
  this.state={
    modalVisible: false,
    errVisible:false,
    value:null
  }
}

formRef = React.createRef();

  onFinish = values => {
    this.setState({
      modalVisible: true,
      value: values,
    })
  };

  handleCancel=()=>{
      this.setState({
          modalVisible:false,
          errVisible:false
      })
  }

  handleOk=()=>{
    let _this=this
    let values=this.state.value;
    axios.post('http://localhost:4001/addAdmin',{
            phone:values.phone,
            password:values.password
        })
        .then(function (response) {
            if(!response.data.err){
                _this.setState(state => ({
                    modalVisible:false,
                    errVisible:false
              }));
              _this.props.changeIsUploadPanel()
              _this.props.updateProjectList()
            }
            else{
                _this.setState(state => ({
                    modalVisible:false,
                    errVisible:true
              }));
            }
        })
        .catch(function (error) {
            console.log(error);
        });
  }

    render(){

        return(
          <div className="admin-background">
            <div className="admin-content">
              <Button type="primary" className="admin-cancel" size="large" onClick={this.props.changeIsUploadPanel}>×</Button>
              <div className="admin-panel">
              <Form ref={this.formRef} validateMessages={validateMessages}  onFinish={this.onFinish} >

                <Form.Item label="手机号"  name="phone" rules={[{ required: true }]}>
                  <Input placeholder="输入手机号" />
                </Form.Item>

                <Form.Item label="密码"  name="password" rules={[{ required: true }]}>
                    <Input placeholder="输入密码" />
                </Form.Item>

                <Form.Item>
                  <Button type="primary" htmlType="submit" style={{float:'right'}} >提交</Button>
                  <Button style={{marginRight:'10px',float:'right'}} onClick={this.props.changeIsUploadPanel}>取消</Button>
                </Form.Item>
                
              </Form>
              </div>
            </div>
            <Modal
                title=""
                visible={this.state.modalVisible}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
                >
                <p>确认添加吗</p>
            </Modal>
            <Modal
                title=""
                visible={this.state.errVisible}
                onOk={this.handleCancel}
                onCancel={this.handleCancel}
                >
                <p>该账号已存在</p>
            </Modal>
          </div>
        );
    }
}
