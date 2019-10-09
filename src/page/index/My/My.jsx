import React from 'react';
import './My.scss';

/**
 * @description 我的页面代码
 */
class My extends React.Component{
    render(){
        return (
            <div className="my">
                <div className="header">
                    <img src="/img/avatar.png" alt="" className="avatar"/>
                    <p className="nickname">XIAOMING &gt;</p>
                </div>
                <div className="content">
                    <ul className="items">
                        <li className="address">地址管理</li>
                        <li className="money">商家代金券</li>
                    </ul>
                    <ul className="items">
                        <li className="email">意见反馈</li>
                        <li className="question">常见问题</li>
                    </ul>
                    <p className="tel">客服电话:&nbsp;101-101-101&nbsp;</p>
                    <p className="time">服务时间:&nbsp;9:00-23:00&nbsp;</p>
                </div>
            </div>
        );
    }
}

export default My;