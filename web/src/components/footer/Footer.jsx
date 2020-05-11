import React from 'react';
import './footer.css';

export default class NearbyFun extends React.Component{
    render(){
        return(
            <div className="footer">
                <div className="footer-content">
                    <div className="footer-content-left">
                        <p>数据来源</p>
                        <a href="https://www.tuniu.com/" target="_blank">途牛旅游网 https://www.tuniu.com/</a>
                        <p>图片来源</p>
                        <a href="http://image.baidu.com/" target="_blank">百度图片搜索 http://image.baidu.com/</a>
                        <p>参考网站</p>
                        <a href="https://www.tuniu.com/" target="_blank">途牛旅游网 https://www.tuniu.com/</a><br />
                        <a href="http://www.gdsunny.com/" target="_blank">广东阳光假日国旅 http://www.gdsunny.com/</a><br />
                        <a href="http://www.zjcct.com/" target="_blank">浙江康辉旅行社 http://www.zjcct.com/</a><br />
                        <a href="https://www.iqiyi.com/" target="_blank">爱奇艺 https://www.iqiyi.com/</a>
                    </div>
                    <div className="footer-content-middle">
                        <p>技术栈</p>
                        <a href="http://nodejs.cn/" target="_blank">Node.js&nbsp;&nbsp;&nbsp;&nbsp;http://nodejs.cn/</a><br />
                        <a href="https://react.docschina.org/" target="_blank">React&nbsp;&nbsp;&nbsp;&nbsp;https://react.docschina.org/</a><br />
                        <a href="https://ant.design/index-cn" target="_blank">Ant Design&nbsp;&nbsp;&nbsp;&nbsp;https://ant.design/index-cn</a><br />
                        <a href="https://koa.bootcss.com/" target="_blank">Koa&nbsp;&nbsp;&nbsp;&nbsp;https://koa.bootcss.com/</a><br />
                        <a href="https://www.mysql.com/" target="_blank">MySQL&nbsp;&nbsp;&nbsp;&nbsp;https://www.mysql.com/</a><br />
                        <a href="https://sequelize.org/" target="_blank">Sequelize&nbsp;&nbsp;&nbsp;&nbsp;https://sequelize.org/</a>
                        <p>部分图标来源</p>
                        <a href="https://www.iconfont.cn/" target="_blank">Iconfont&nbsp;&nbsp;&nbsp;&nbsp;https://www.iconfont.cn/</a>
                    </div>
                    <div className="footer-content-right">
                        <p>项目地址</p>
                        <a href="https://github.com/qingping-bird/tourism_project" target="_blank">
                        https://github.com/qingping-bird/tourism_project</a><br /><br /><br /><br />
                        <img style={{width:'200px'}} src="/img/jndx.png" alt=""/><br />
                        <p>人工智能与计算机学院</p>
                    </div>
                </div>
            </div>
        );
    }
}
