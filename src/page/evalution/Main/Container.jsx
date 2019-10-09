import React from 'react';
import Main from './Main';
import { hot } from 'react-hot-loader';

class Container extends React.Component{
    render(){
        return <Main />
    }
}

// 将Main组件包裹，使用热模块加载。当Main的所有子元素发生改变触发热加载
export default hot(module)(Container);