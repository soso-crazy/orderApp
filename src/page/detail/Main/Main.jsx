import 'component/common.scss';
import './Main.scss';
import React from 'react';
import { connect } from 'react-redux';

import { Route, withRouter, NavLink } from 'react-router-dom';

import Loadable from 'react-loadable';

import NavHeader from 'component/NavHeader/NavHeader';
import Menu from '../Menu/Menu';

// react-loadable需要的加载占位组件
import ReactLoadableLoadingComponent from "../../../component/reactLoadableLoadingComponent";

// react-loadable 懒加载模块
const Comment = Loadable({
    loader: () => import(/* webpackChunkName: "Comment" */'../Comment/Comment'),
    loading: ReactLoadableLoadingComponent,
});
// react-loadable 懒加载模块
const Restaurant = Loadable({
    loader: () => import(/* webpackChunkName: "Restaurant" */'../Restaurant/Restaurant'),
    loading: ReactLoadableLoadingComponent,
});

class Main extends React.Component {
    constructor(props) {
        super(props)
    }

    renderTabs() {
        let tabs = this.props.tabs;
        return tabs.map(item => {
            return (
                // NavLink的to对应Route的path。设置好Route和NavLink后点击相应的tab就可以切换到相应的页面
                <NavLink replace={true}
                    to={'/' + item.key}
                    className="tab-item"
                    activeClassName="active"
                    key={item.key}>
                    {item.name}
                </NavLink>
            )
        })
    }

    render() {
        let poiName = this.props.poiInfo.poi_info?this.props.poiInfo.poi_info.name:'';
        return (
            <div className="detail">
                <NavHeader title={poiName}></NavHeader>
                <div className="tab-bar">
                    {this.renderTabs()}
                </div>
                <Route exact path="/menu" component={Menu}></Route>
                <Route path="/comment" component={Comment}></Route>
                <Route path="/restaurant" component={Restaurant}></Route>
            </div>
        )
    }
}

// 使用withRouter把redux和router连接起立
export default withRouter(connect(
    state => ({
        tabs: state.tabReducer.tabs,
        poiInfo: state.menuReducer.poiInfo
    })
)(Main));