import React from 'react';
import './UploadNewProject.css';
import { Form, Input, Button, Radio, InputNumber,DatePicker} from 'antd'
import ImgCrop from 'antd-img-crop';
import { Upload, message } from 'antd';
import ModalPanel from '../ModalPanel/ModalPanel'

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


function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

export default class UploadNewProject extends React.Component{
constructor(props){
  super(props);
  this.state={
    loading: false,
    fileData: null,
    modalVisible: false,
    value:null
  }
}

formRef = React.createRef();

beforeUploadHandle=(file)=>{//拦截文件上传
    this.setState(({fileData})=>({
        fileData:file,
    }))
    
    getBase64(file, imageUrl =>
      this.setState({
        imageUrl,
        loading: false,
      }),
    );

    this.formRef.current.setFieldsValue({
      img: '1'
    });
    console.log(file)
    return false;
}

  handleChange = info => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world. 
      getBase64(info.file.originFileObj, imageUrl =>
        this.setState({
          imageUrl,
          loading: false,
        }),
      );
    }
  };

  onFinish = values => {
    this.setState({
      modalVisible: true,
      value: values,
    })
  };

  
  modalPanelHandleCancel = () => {
    this.setState({
      modalVisible: false,
    });
    this.props.changeIsUploadPanel()
  };

  onModalPanel=()=>{
    if(this.state.modalVisible){
      return(<ModalPanel fileData={this.state.fileData} value={this.state.value} visible={this.state.modalVisible}
        handleCancel={this.modalPanelHandleCancel} updateProjectList={this.props.updateProjectList}
      />)
    }
    return
  }


    render(){
      const uploadButton = (
        <div>
          {this.state.loading ? <LoadingOutlined /> : <PlusOutlined />}
          <div className="ant-upload-text">上传图片</div>
        </div>
      );

      const { imageUrl } = this.state;

        return(
          <div className="upload-project-background">
            <div className="upload-project-content">
              <Button type="primary" className="upload-project-cancel" size="large" onClick={this.props.changeIsUploadPanel}>×</Button>
              <div className="upload-project-panel">
              <Form ref={this.formRef} validateMessages={validateMessages}  onFinish={this.onFinish} >

                <Form.Item label="分类" name="sort" rules={[{ required: true }]}>
                  <Radio.Group>
                    <Radio.Button value="1" defaultChecked={true}>国内团</Radio.Button>
                    <Radio.Button value="2">出境团</Radio.Button>
                    <Radio.Button value="3">自由行</Radio.Button>
                    <Radio.Button value="4">门票</Radio.Button>
                  </Radio.Group>
                </Form.Item>
      
                <Form.Item label="标题"  name="title" rules={[{ required: true }]}>
                  <Input placeholder="输入项目名" />
                </Form.Item>

                <Form.Item label="有效时间"  name="time" rules={[{ required: true }]}>
                      <RangePicker />
                </Form.Item>

                <Form.Item label="价格" name="money" rules={[{ required: true,type: 'number', min: 0,max:999999999}]}>
                  <InputNumber placeholder="单位 / 元" />
                </Form.Item>

                <Form.Item label="天数" name="day" rules={[{ required: true,type: 'number', min: 1,max:30}]}>
                  <InputNumber placeholder="单位 / 天" />
                </Form.Item>

                <Form.Item label="详情" name="detail" rules={[{ required: true }]}>
                    <TextArea placeholder="请输入详细信息" autoSize={{ minRows: 5}}/>
                </Form.Item>

                <Form.Item label="图片" name="img" rules={[{ required: true }]}>

              <ImgCrop {...{width:1200,height:800,scale:100}}>
                      <Upload
                          name="img"
                          listType="picture-card"
                          className="img-uploader"
                          showUploadList={false}
                          beforeUpload={this.beforeUploadHandle}
                          action="http://localhost:4001/upload/img"
                          onChange={this.handleChange}
                        >
                          {imageUrl ? <img src={imageUrl} style={{ width: '100%' }} /> : uploadButton}
                        </Upload>
                  </ImgCrop>
                
                    
                </Form.Item>

                <Form.Item>
                  <Button type="primary" htmlType="submit" style={{float:'right'}} >提交</Button>
                  <Button style={{marginRight:'10px',float:'right'}} onClick={this.props.changeIsUploadPanel}>取消</Button>
                </Form.Item>
                
              </Form>
              </div>
              {this.onModalPanel()}
            </div>
          </div>
        );
    }
}
