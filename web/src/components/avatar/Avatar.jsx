import React from 'react';
import './avatar.css';
import ClassCropperModal from '../ClassCropperModal/ClassCropperModal'
const MAX_FILE_SIZE = 5 * 1024 * 1024 ;

export default class UserMessage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            classModalVisible: false,
            classModalFile: null,
            classResultImgUrl: null
          }
    }

    componentWillMount(){
      this.setState({
        classResultImgUrl: (this.props.ID?this.props.ID:"default")+".jpg"
      })
    }

    handleGetResultImgUrl = key => blob => {
        
        // const str = URL.createObjectURL(blob)
        // this.setState({
        //   [key]: str
        // })
      }

    handleClassFileChange = e => {
        const file = e.target.files[0]
        if (file) {
          if (file.size <= MAX_FILE_SIZE) {
            this.setState(
              {
                classModalFile: file // 先把上传的文件暂存在state中
              },
              () => {
                this.setState({
                  classModalVisible: true // 然后弹出modal
                })
              }
            )
          } else {
            console.log('文件过大')
          }
        }
      }

  render(){
    const {
        classModalVisible,
        classModalFile,
        classResultImgUrl
      } = this.state
      return(
            <div className="user-left-touxiang">
           
                <div className="img-container">
                {classResultImgUrl && (
                <img
                    className="img-container-avatar"
                    src={require("D://imgDatabase//userAvatar//"+(this.props.avatarImg?this.props.ID:"default")+".jpg")}
                />
                )}
                 <label className="base-upload-input">
                <input
                type="file"
                accept="image/jpeg,image/jpg,image/png"
                className="base-upload-input"
                onClick={(event)=> { event.target.value = null }} 
                onChange={this.handleClassFileChange}
                style={{display:'none'}} 
                // input 的最外层裹了一个label. 类名与Input相同. 同时, 在Input中, 写上 style="display:none;" 就可以隐藏未选择文件文字
                />
              </label>
                <div className="img-container-avatar-text">修改头像</div>
                </div>

                {classModalVisible && (
                <ClassCropperModal
                    ID={this.props.ID}
                    uploadedImageFile={classModalFile}
                    onClose={() => {
                    this.setState({ classModalVisible: false })
                    }}
                    onSubmit={this.handleGetResultImgUrl('classResultImgUrl')}
                />
                )}

            </div>
      );
  }
}