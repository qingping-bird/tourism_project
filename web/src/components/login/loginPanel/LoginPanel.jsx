import React from 'react';
import axios from 'axios';
import {checkInputIsEmpty} from '../../../util/checkInput';
import {setNewCookie} from '../../../util/cookie';
import './loginPanel.css';

export default class LoginPanel extends React.Component{
    constructor(props){
        super(props);
        this.state={
                loginMessageName:'',
                loginMessageCode:'',
                loginNameEmpty:false,
                loginCodeEmpty:false,
                isRememberPassword:true,
                isUserError:false
        }
    }

    componentWillUnmount(){
        this.setState(state => ({
            loginMessageName:'',
            loginMessageCode:'',
            loginNameEmpty:false,
            loginCodeEmpty:false,
            isRememberPassword:true,
            isUserError:false
      }));

    }//组件不渲染时重置所有数据

    loginInputChange=(event)=> {  //输入框发生变化
        var target = event.target;
        var value = target.value;
        var name = target.name;
        if(name==='loginMessageName'){
             checkInputIsEmpty.apply(this,[value,'loginNameEmpty']);//apply:绑定this
        }
        else if(name==='loginMessageCode'){
            checkInputIsEmpty.apply(this,[value,'loginCodeEmpty']);
        }
        this.setState(state => ({
                [name]:value
          }));
      }

    loginSubmit=(event)=>{
        event.preventDefault();
        let _this=this;
        if(this.state.loginMessageName.length>0&&this.state.loginMessageCode.length){
            axios.post('http://localhost:4000/login',{
            name:this.state.loginMessageName,
            code:this.state.loginMessageCode
        })
        .then(function (response) {
            if(!response.data.err){
                _this.props.isLoginIn(response.data.userName,response.data.id,response.data.avatar);
                if(_this.state.isRememberPassword){
                    setNewCookie(response.data.userName,_this.state.loginMessageCode,response.data.id,true);
                }
                else{
                    setNewCookie(response.data.userName,_this.state.loginMessageCode,response.data.id,false);
                }
            }
            else{
                _this.setState(state => ({
                    isUserError:true
              }));
            }
        })
        .catch(function (error) {
            console.log(error);
        });
        }
        else{
            checkInputIsEmpty.apply(this,[this.state.loginMessageName,'loginNameEmpty']);
            checkInputIsEmpty.apply(this,[this.state.loginMessageCode,'loginCodeEmpty']);
        }
        
    }

    changeCheckBox=(event)=>{
        this.setState(state => ({
            isRememberPassword:!this.state.isRememberPassword
      }));
    }

    render(){
        return(
                <>
                    <form onSubmit={this.loginSubmit}>
                        <input type="text" placeholder="请输入用户名或手机号" name="loginMessageName" onChange={this.loginInputChange}
                        value={this.state.loginMessageName} className="login-name"/>
                        <p className="login-error">{this.state.loginNameEmpty?'用户名/手机号不能为空':<br />}</p>
                        <input type="password" placeholder="请输入密码" name="loginMessageCode" onChange={this.loginInputChange}
                        value={this.state.loginMessageCode} className="login-code"/>
                        <p className="login-error">{this.state.loginCodeEmpty?'密码不能为空':<br />}</p>
                        <input type="checkbox" name="rememberPassword" className="remember-password" checked={this.state.isRememberPassword}
                        onChange={this.changeCheckBox}/> 
                        <span className="remember-password-text"> 下次自动登录</span>
                        <p className="login-user-error">{this.state.isUserError?'*用户名/手机号或密码错误*':''}</p>
                        <input type="submit" className="login-button-submit" value="登 录"/>
                    </form>
                    <div className="login-to-register" onClick={this.props.loginOrRegister}>没有账号？点击注册>></div>
                </>
        );
    }
}