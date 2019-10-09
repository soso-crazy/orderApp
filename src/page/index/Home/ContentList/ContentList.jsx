import './ContentList.scss';

import React from 'react';

import { getListData } from '../../actions/contentListAction';

import ListItem from 'component/ListItem/ListItem';

import ScrollView from 'component/ScrollView/ScrollView';

import { connect } from 'react-redux';

/* 附件商家列表 */

class ContentList extends React.Component {
    constructor(props) {
        super(props);

        // 记录当前页码
        this.page = 0;

        // 执行发送action的函数，请求第一屏数据
        this.fetchData(this.page);
        // 标识页面是否可以滚动
        this.state = {
            isEnd: false
        }
    }

    // 传递给ScrollView子组件的滚动函数loadCallback
    onLoadPage() {
        this.page++;

        // 最多滚动3页
        if (this.page > 3) {
            this.setState({
                isEnd: true
            })
        } else {
            // 当页面滚动到第二屏和第三屏时发送action请求数据
            this.fetchData(this.page);
        }
    }

    // 定义发送action的函数
    fetchData(page) {
        // 使用redux-thunk中间件对contentListAction改造后，dispatch可以接受函数作为参数。发送action给store
        this.props.dispatch(getListData(page));
    }

    renderItems() {
        let list = this.props.list;
        return list.map((item, index) => {
            return <ListItem key={index} itemData={item}></ListItem>
        })
    }

    render() {
        return (
            <div className="list-content">
                <h4 className="list-title">
                    <span className="title-line"></span>
                    <span>附件商家</span>
                    <span className="title-line"></span>
                </h4>
                {/* 使用滚动加载组件 */}
                <ScrollView loadCallback={this.onLoadPage.bind(this)} isEnd={this.state.isEnd}>
                    {this.renderItems()}
                </ScrollView>
            </div>
        );
    }
}

// connect 建立一个从（外部的）state对象到（UI 组件的）props对象的映射关系
export default connect(
    state => ({
        // 组件props的list对应contentListReducer的state同名属性的list
        list: state.conentListReducer.list
    })
)(ContentList);