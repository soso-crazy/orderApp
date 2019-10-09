import React from 'react';
import './Order.scss';
import { getOrderData } from '../actions/orderAction';
import { connect } from 'react-redux';
import ScrollView from 'component/ScrollView/ScrollView';
import ListItem from './ListItem/ListItem';

/**
 * @description 订单页面代码
 */
class Order extends React.Component {
    constructor(props) {
        super(props);

        // 分页标识
        this.page = 0;

        // 发送Action 里面包含ajax请求
        this.fetchData(this.page);

        // 是否还可以滚动加载
        this.state = {
            isEnd: false
        }
    }

    // 发送Action,里面包含ajax请求
    fetchData(page) {
        this.props.dispatch(getOrderData(page));
    }

    renderList() {
        // 获取store的数据
        let list = this.props.list;
        return list.map((item, index) => {
            // 数据传递给子组件ListItem
            return <ListItem key={index} itemData={item}></ListItem>
        })
    }

    loadPage() {
        this.page++;
        // 页数超过3页不再滚动加载内容
        if (this.page > 3) {
            this.setState({
                isEnd: true
            });
        } else {
            this.fetchData(this.page);
        }
    }

    render() {
        return (
            <div className="order">
                <div className="header">订单</div>
                <ScrollView loadCallback={this.loadPage.bind(this)} isEnd={this.state.isEnd}>
                    <div className="order-list">{this.renderList()}</div>
                </ScrollView>
            </div>
        )
    }
}

export default connect(
    state => ({
        list: state.orderReducer.list
    })
)(Order);