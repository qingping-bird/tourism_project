import { Modal, Button } from 'antd';
import React from 'react';
import axios from 'axios'

export default class ModalPanel extends React.Component {
  state = {
    confirmLoading: false,
  };

  handleOk = () => {
    let values=this.props.value;
    const formData = new FormData()
    formData.append('file', this.props.fileData)
    formData.append('project_name', values.title)
    formData.append('project_start_time', values.time[0].format('YYYY-MM-DD'))
    formData.append('project_end_time', values.time[1].format('YYYY-MM-DD'))
    formData.append('project_money', values.money)
    formData.append('project_detail', values.detail)
    formData.append('project_sort', values.sort)
    formData.append('project_day', values.day)
    let config = {
      headers: {
          'Content-Type': 'multipart/form-data'
      }
    }
    let _this=this;
    _this.setState({
        confirmLoading: true,
      });
    axios.post('http://localhost:4001/upload/img',formData,config)
        .then(function (response) {
            _this.setState({
                confirmLoading: false,
              });
              _this.props.updateProjectList()
              _this.props.handleCancel()
        })
        .catch(function (error) {
            console.log(error);
        });
  };


  render() {
    return (
      <div style={{position:'fixed',backgroundColor:'rgba(0, 0, 0, 0.24)',width:'100%',height:'100%',top:'0',left:'0'}}>
        <Modal
          title=""
          visible={this.props.visible}
          onOk={this.handleOk}
          confirmLoading={this.state.confirmLoading}
          onCancel={this.props.handleCancel}
        >
          <p>确认新建该项目吗</p>
        </Modal>
      </div>
    );
  }
}