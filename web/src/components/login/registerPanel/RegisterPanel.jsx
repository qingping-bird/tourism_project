import React from 'react';
import axios from 'axios';
import {checkInputIsEmpty,checkPhone,checkCode} from '../../../util/checkInput';
import RegisterSuccess from './RegisterSuccess';
import './registerPanel.css';

export default class RegisterPanel extends React.Component{
    constructor(props){
        super(props);
        this.state={
            registerName:'', //注册用户名
            registerPhone:'', //注册手机号
            registerCode:'', //注册密码
            registerCodeRe:'', //重复密码
            isNameEmpty:false, //用户名是否为空
            isNotPhone:false, //手机号是否为空
            isCodeEmpty:false, //密码是否为空
            isCodeDifferent:false, //密码不一致
            isUserExist:false, //用户已存在
            isRegisterSuccess:false, //是否注册成功
            timeCount:3
        }
    }


    componentWillUnmount(){
        clearInterval(this.timer);
        this.setState(state => ({
            registerName:'',
            registerPhone:'',
            registerCode:'',
            registerCodeRe:'',
            isNameEmpty:false,
            isNotPhone:false,
            isCodeEmpty:false,
            isCodeDifferent:false,
            isUserExist:false,
            isRegisterSuccess:false,
            timeCount:3
      }));
    }//组件不渲染时重置所有数据

    registerInputChange=(event)=> {  //输入框发生变化
        var target = event.target;
        var value = target.value;
        var name = target.name;
        switch(name) {
            case "registerName":
                checkInputIsEmpty.apply(this,[value,'isNameEmpty']);
                break;
            case "registerPhone":
                checkPhone.apply(this,[value,'isNotPhone']);
                break;
            case "registerCode":
                checkInputIsEmpty.apply(this,[value,'isCodeEmpty']);
                checkCode.apply(this,[value,this.state.registerCodeRe,'isCodeDifferent']);
                break;
            case "registerCodeRe":
                checkCode.apply(this,[value,this.state.registerCode,'isCodeDifferent']);
                break;
            default:break;
       } 
        this.setState(state => ({
                [name]:value
          }));
      }

    timeTimer=()=>{
        if(this.state.timeCount>1)
        this.setState({
            timeCount: this.state.timeCount-1
        });
        else{
            this.props.loginOrRegister()
        }
    }

    registerSubmit=(event)=>{  //提交表单
        event.preventDefault();
        let _this=this;
        let flag1=checkInputIsEmpty.apply(this,[this.state.registerName,'isNameEmpty']);
        let flag2=checkPhone.apply(this,[this.state.registerPhone,'isNotPhone']);
        let flag3=checkInputIsEmpty.apply(this,[this.state.registerCode,'isCodeEmpty']);
        let flag4=checkCode.apply(this,[this.state.registerCodeRe,this.state.registerCode,'isCodeDifferent']);
        if(flag1&&flag2&&flag3&&flag4){
            axios.post('http://localhost:4000/register',{
            name:this.state.registerName,
            code:this.state.registerCode,
            phone:this.state.registerPhone
        })
        .then(function (response) {
            if(response.data.err===0){
                _this.setState(state => ({
                    isUserExist:false,
                    isRegisterSuccess:true
              }));
              _this.timer = setInterval(_this.timeTimer,1000);
            }
            else if(response.data.err===2){
                _this.setState(state => ({
                    isUserExist:true
              }));
            }
        })
        .catch(function (error) {
            console.log(error);
        });
        }
    }

    isRegisterPanel=(event)=>{
        if(this.state.isRegisterSuccess){
            return(
                <RegisterSuccess timeCount={this.state.timeCount}/>
            )
        }
        else{
            return(
                <>
                    <form onSubmit={this.registerSubmit}>
                        <input type="text" placeholder="请输入用户名" name="registerName" onChange={this.registerInputChange}
                        value={this.state.loginMessageName} className="login-name"/>
                        <p className="login-error">{this.state.isNameEmpty?'用户名不能为空':<br />}</p>
                        <input type="text" placeholder="请输入手机号" name="registerPhone" onChange={this.registerInputChange}
                        value={this.state.loginMessageName} className="login-name"/>
                        <p className="login-error">{this.state.isNotPhone?'请输入正确手机号':<br />}</p>
                        <input type="password" placeholder="请输入密码" name="registerCode" onChange={this.registerInputChange}
                        value={this.state.loginMessageCode} className="login-code"/>
                        <p className="login-error">{this.state.isCodeEmpty?'密码不能为空':<br />}</p>
                        <input type="password" placeholder="再次输入密码" name="registerCodeRe" onChange={this.registerInputChange}
                        value={this.state.loginMessageCode} className="login-code"/>
                        <p className="login-error">{this.state.isCodeDifferent?'两次密码不一致':<br />}</p>
                        <p className="login-user-error">{this.state.isUserExist?'*用户名或手机号已存在*':''}</p>
                        <input type="submit" className="login-button-submit" value="注 册"/>
                    </form>
                    <div className="login-to-register" onClick={this.props.loginOrRegister} >已有账号？点击登录>></div>
                </>
            )
        }
    }

    render(){
        return(
            <>
            {this.isRegisterPanel()}
            </>
        );
    }
}