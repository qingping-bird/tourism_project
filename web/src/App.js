import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route,Redirect,Switch} from 'react-router-dom';
import Navigation from './components/navigation/Navigation';
import Login from './components/login/Login';
import Home from './page/Home';
import Footer from './components/footer/Footer';
import DomesticTourism from './page/DomesticTourism';
import UserMessage from './page/UserMessage';
import ProjectDetail from './page/ProjectDetail/ProjectDetail'
import ScrollToTop from './components/ScrollToTop';//回到首部
import {readCookie,deleteCookie} from './util/cookie';

class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      isLoginPanelClose: false,
      isLogin:false,
      userName:'未登录',
      avatarImg:'',
      phone:'',
      ID:''
    };
  }

  componentWillMount(){ //模板加载时检测是否存在cookie
    let userName=readCookie('userName');
    let _this=this;
    if(userName){
        axios.post('http://localhost:4000/login',{
        name:userName,
        code:readCookie('password'),
    })
    .then(function (response) {
        if(!response.data.err){
            _this.isLoginIn(response.data.userName,response.data.id,response.data.avatar,response.data.phone);
        }
    })
    .catch(function (error) {
        console.log(error);
    });
    }
  }

  signOut=()=>{//注销
    this.setState(state=>({
      isLogin:false,
      userName:'未登录',
      ID:'',
      avatarImg:'',
      phone:'',
      isLoginPanelClose: false
    }))
    deleteCookie();
  }

  isLoginIn=(name,id,img,phone)=>{//登录成功
    this.setState(state=>({
      isLogin:true,
      userName:name,
      ID:id,
      avatarImg:img,
      phone:phone,
      isLoginPanelClose: false
    }))
  }

  changeLoginClose=()=>{//登录面板显示
    if(!this.state.isLogin){
      this.setState(state => ({
        isLoginPanelClose: !state.isLoginPanelClose
      }));
    }
  }  //使用匿名函数绑定函数的对象this或在constructor中使用bind绑定，如：this.changeLoginClose = this.changeLoginClose.bind(this);

  isLoginClose() {//面板模块
    if(this.state.isLoginPanelClose){
      return  <Login changeLoginClose={this.changeLoginClose} isLoginIn={this.isLoginIn} />
    }
    return ;
  }

  render(){
    return (
      <Router className="App">
        <Navigation changeLoginClose={this.changeLoginClose} 
        userName={this.state.userName} 
        avatarImg={this.state.avatarImg}
        ID={this.state.ID}
        isLogin={this.state.isLogin}
        signOut={this.signOut}/>
        <ScrollToTop><Switch>
          <Route path='/tourism/:sort' component={DomesticTourism} />
          <Route path='/tourism' component={DomesticTourism} />
          <Route path='/projectDetail/:id' component={ProjectDetail} />
          <Route path='/user'><UserMessage 
          ID={this.state.ID}
          phone={this.state.phone}
          avatarImg={this.state.avatarImg}
          userName={this.state.userName}/></Route>
          <Route path='/' component={Home} />
          {/* <Route path="/" render={
            ()=> (
            <Redirect to="/home"/>)}></Route>  */}
          {/* 重定向，把 "/" 重定向到"/home" */}
        
        </Switch></ScrollToTop>
        {this.isLoginClose()}
        <Footer />
      </Router>
    )};
}

export default App;
