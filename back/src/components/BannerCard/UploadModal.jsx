import React from 'react';
import axios from 'axios'
import { Form, Input, Button, Radio, InputNumber,DatePicker,Select} from 'antd'
import ImgCrop from 'antd-img-crop';
import { Upload, message } from 'antd';
import ModalPanel from '../ModalPanel/ModalPanel'

import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';

const { RangePicker } = DatePicker;
const { TextArea } = Input;
const { Option } = Select;

const validateMessages = {
  required: '请填写${label}'
};


function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

export default class UploadModal extends React.Component{
constructor(props){
  super(props);
  this.state={
    projectList:null,
    loading: false,
    fileData: null,
    value:null
  }
}

formRef = React.createRef();

componentWillMount(){ //初始化获取项目列表
    let _this=this;
    axios.get('http://localhost:4001/upload/banner/projectList',{
    })
    .then(function (response) {
      _this.setState(state=>({
        projectList:response.data.data
      }))
    })
    .catch(function (error) {
        console.log(error);
    });
}

showOptions=()=>{ //返回项目名字列表
    if(this.state.projectList){
        let item=[];
        let pr=this.state.projectList;
        for(let i=0;i<pr.length;i++){
            item.push(<Option key={i} value={i}>{pr[i].project_name}</Option>)
        }
        return (<>{item}</>)
    }
    return
}

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
    const formData = new FormData()
    formData.append('file', this.state.fileData)
    formData.append('title', values.title)
    formData.append('text', values.text)
    formData.append('project', this.showHref()?this.state.projectList[values.project].id: values.project)
    formData.append('id', this.props.homeId)
    let config = {
      headers: {
          'Content-Type': 'multipart/form-data'
      }
    }
    let _this=this;
    _this.setState({
        confirmLoading: true,
      });
    axios.post('http://localhost:4001/upload/banner/new',formData,config)
        .then(function (response) {
            _this.setState({
                confirmLoading: false,
              });
            //   _this.props.updateProjectList()
              _this.props.changeIsUploadPanel()
        })
        .catch(function (error) {
            console.log(error);
        });
  };

  showHref=()=>{
      if(this.props.homeId>4&&this.props.homeId<13){
          return false
      }
      return true
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

                <Form.Item label="标题"  name="title" rules={[{ required: true }]}>
                  <Input placeholder="输入标题" />
                </Form.Item>

                <Form.Item label="副标题"  name="text" rules={[{ required: true }]}>
                  <Input placeholder="输入副标题" />
                </Form.Item>

                <Form.Item label="选择项目或关键词" name="project" rules={[{ required: true}]}>
                {this.showHref()?<Select
                        showSearch
                        style={{ width: 200 }}
                        placeholder="选择项目"
                        optionFilterProp="children"
                        filterOption={(input, option) =>
                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                    >
                        {this.showOptions()}
                    </Select>:<Input placeholder="输入关键词" />}
                </Form.Item>

                <Form.Item label="图片" name="img" rules={[{ required: true }]}>

              <ImgCrop {...{width:this.props.width,height:this.props.height,scale:100}}>
                      <Upload
                          name="img"
                          listType="picture-card"
                          className="img-uploader"
                          showUploadList={false}
                          beforeUpload={this.beforeUploadHandle}
                          action="http://localhost:4001/upload/banner/new"
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
            </div>
          </div>
        );
    }
}
