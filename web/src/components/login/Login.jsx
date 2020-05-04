import React from 'react';
import LoginPanel from './loginPanel/LoginPanel';
import RegisterPanel from './registerPanel/RegisterPanel';
import './login.css';

export default class Login extends React.Component{
    constructor(props){
        super(props);
        this.state={
            isLoginPanel:true
        }
    }

    loginOrRegister=()=>{ //登录或注册
        this.setState(state=>({
            isLoginPanel:!state.isLoginPanel
        }))
    }

    changePanel=()=>{ //切换登录注册页
        if(this.state.isLoginPanel){
            return(
                <>
                <LoginPanel loginOrRegister={this.loginOrRegister} isLoginIn={this.props.isLoginIn}/>
                </>
            )
        }
        else{
            return(
                <>
                <RegisterPanel loginOrRegister={this.loginOrRegister} />
                </>
            )
        }
    }


    render(){
        return(
            <div className="login">
                <div className="login-background"></div>
                <div className="login-content">
                    <button className="login-button-cancel" onClick={this.props.changeLoginClose}>×</button>
                    {this.changePanel()}
                </div>
                
            </div>
        );
    }
}
