import 'component/common.scss';
import React from 'react';
import { connect } from 'react-redux';
import { Route,withRouter } from 'react-router-dom';
import Loadable from 'react-loadable';

import BottomBar from '../BottomBar/BottomBar';
import Home from '../Home/Home';
import ReactLoadableLoadingComponent from "../../../component/reactLoadableLoadingComponent";

const My = Loadable({
    loader: () => import(/* webpackChunkName: "My" */'../My/My'),
    loading: ReactLoadableLoadingComponent // Loading是加载过程的占位组件
});

const Order = Loadable({
    loader: () => import(/* webpackChunkName: "Order" */'../Order/Order'),
    loading: ReactLoadableLoadingComponent
});

class Main extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Route path="/home" component={Home}></Route>
                <Route path="/order" component={Order}></Route>
                <Route path="/my" component={My}></Route>
                <BottomBar />
            </div>
        );
    }
}

// withRouter(connect(Component))
// 通过withRouter，被修饰的组件可以从属性props中获取history,location,match。专门用来处理数据更新问题：使用了redux的connect组件，路由重新更新会重新渲染组件。
export default withRouter(connect(
    // state => ({

    // })
)(Main));