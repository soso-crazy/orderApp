import React from 'react';
import { connect } from 'react-redux';

import Loading from '../Loading/Loading';

import './ScrollView.scss';

/**
 * <ScrollView loadCallback={function} isEnd={boolean} />
 * @description 滚动加载组件
 */
class ScrollView extends React.Component {
    constructor(props){
        super(props);

        // 切换页面时，卸载组件addEventListener触发scroll事件时的函数
        this._onLoadPage = this.onLoadPage.bind(this);
    }

    onLoadPage() {
        let clientHeight = document.documentElement.clientHeight;
        let scrollHeight = document.body.scrollHeight;
        let scrollTop = document.documentElement.scrollTop;

        // 页面底部距离可视区域还要preLoadDis距离时就开始加载内容
        let preLoadDis = 30;

        if (scrollTop + clientHeight >= scrollHeight - preLoadDis) {
            if (!this.props.isEnd) { // 允许滚动标志位

                if (!this.props.readyToLoad) { // 在各个发送action请求数据的action中，滚动只触发一次ajax请求
                    return;
                }
                // 执行父组件传递过来的loadCallback函数
                this.props.loadCallback && this.props.loadCallback();
            }
        }
    }

    // 在组件挂载到DOM
    componentDidMount() {
        // this指向ContentList组件的实例：React构造方法中的bind会将handleClick函数与这个组件Component进行绑定以确保在这个处理函数中使用this时可以时刻指向这一组件。
        // 将onLoadPage函数的this绑定为ContentList组件，使函数内部的this可以对应onLoadPage函数外定义的各种值
        window.addEventListener('scroll', this._onLoadPage);
    }

    // 组件销毁时需要移除监听事件
    componentWillUnmount() {
        window.removeEventListener('scroll', this._onLoadPage);
    }

    render() {
        return (
            <div className="scrollView">
                {/* 表示组件的所有子节点 */}
                {this.props.children}
                {/* 父组件传递this.state.isEnd给子组件Loading，子组件通过this.props.isEnd接收 */}
                <Loading isEnd={this.props.isEnd} />
            </div>
        )
    }
}

export default connect(
    state => ({
        readyToLoad: state.scrollViewReducer.readyToLoad
    })
)(ScrollView);