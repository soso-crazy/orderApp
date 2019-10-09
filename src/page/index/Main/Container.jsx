import {hot} from 'react-hot-loader';
import React from 'react';
import Main from './Main';

class Container extends React.Component{
    render() {
        return <Main />
    }
}

// Container已经是热模块组件，当Container的所有子元素有所改动，都会触发热模块改动
// react-hot-loader的旧API export default hot(module)(组件)
export default hot(module)(Container);