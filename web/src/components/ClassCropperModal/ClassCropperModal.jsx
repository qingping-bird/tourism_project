import React, { Component } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import './classCropperModal.css'
import Cropper from 'react-cropper' // 引入Cropper
import 'cropperjs/dist/cropper.css' // 引入Cropper对应的css


export default class ClassCropperModal extends Component {
  static propTypes = {
    uploadedImageFile: PropTypes.object.isRequired,
    onClose: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)
    this.state = {
      src: null
    }
  }

  componentDidMount() {
    const fileReader = new FileReader()
    fileReader.onload = e => {
      const dataURL = e.target.result
      this.setState({ src: dataURL })
    }

    fileReader.readAsDataURL(this.props.uploadedImageFile)
  }

  handleCancel=(event)=>{
    this.props.onClose();
  }

  handleSubmit = (event) => {
    event.preventDefault();
    if (!this.state.submitting) {
      // 拿到文件名
       let filename = this.props.uploadedImageFile.name
       let _this=this;
      console.log('正在上传图片')
      // TODO: 这里可以尝试修改上传图片的尺寸
      this.cropper.getCroppedCanvas().toBlob(async blob => {
        // // 创造提交表单数据对象
        const formData = new FormData()
        // // 添加要上传的文件
        formData.append('file', blob, filename)
        formData.append('id', _this.props.ID)
        this.setState({submitting: true})
        let config = {
          headers: {
              'Content-Type': 'multipart/form-data'
          }
      }
        axios.post('http://localhost:4000/user/avatar',formData,config)
        .then(function (response) {
          console.log(response)
        })
        .catch(function (error) {
            console.log(error);
        });
        // 拿到服务器返回的数据(resp)
        
        // 提示上传完毕
        this.setState({submitting: false})

        //把选中裁切好的的图片传出去
        //this.props.onSubmit(blob);

        // 关闭弹窗
        this.props.onClose();

      })
    }
  }

  render() {
    return (
      <div className="class-cropper-modal">
        <div className="cropper-modal-panel">
          <div className="cropper-container-container">
            <div className="cropper-container">
              <Cropper
                src={this.state.src}
                className="cropper"
                ref={cropper => (this.cropper = cropper)}
                // Cropper.js options
                viewMode={1}
                zoomable={false}
                aspectRatio={1} // 固定为1:1  可以自己设置比例, 默认情况为自由比例
                guides={false}
                preview=".cropper-preview"
              />
            </div>
            <div className="preview-container">
              <div className="cropper-preview" />
            </div>
          </div>
          <div className="button-row">
            <div className="submit-button" onClick={this.handleSubmit}>
              提 交
            </div>
            <div className="cancel-button" onClick={this.handleCancel}>
              取 消
            </div>
            <button className="login-button-cancel" onClick={this.handleCancel}>×</button>
          </div>
        </div>
      </div>
    )
  }
}