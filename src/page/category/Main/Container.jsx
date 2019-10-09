import React from 'react';

// 引入含有所有组件的Main
import Main from './Main';

import {hot} from 'react-hot-loader';

class Container extends React.Component{
    render(){
        return (
            <Main />
        )
    }
}
// 把所有组件都包裹在热模块Container里，有所改动任何一个子组件都触发热加载
export default hot(module)(Container);