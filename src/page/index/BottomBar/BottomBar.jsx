import './BottomBar.scss';
import React from 'react';
import { connect } from "react-redux";

import { NavLink,withRouter } from 'react-router-dom';

/**
 * 描述：首页底部tab栏
 */

//  用connect将react组件和redux store连接在一起，store中的数据作为props绑定到组件中
class BottomBar extends React.Component {
    constructor(props) {
        super(props);
    }
    changeTab(item) {
        // 使用withRouter包裹BottomBar组件，react-router的三个对象history, location, match就会被放进这个组件的props属性中
        this.props.history.replace(item.key); // 输入网址时就是 localhost:8080/#/item.key的实际值
    }
    renderItems() {
        // 使用了connect方法将外部的state映射到BottomBar组件的props对象，该props中有tabs属性是与connet的第一个参数mapStateToProps函数中返回的对象中同名属性
        let tabs = this.props.tabs;
        return tabs.map((item, index) => {
            let cls = item.key + ' btn-item';
            let name = item.name;

            // 引入react-router-dom中的NavLink,跳转的路径与Main.jsx中的Route的path一致，选中激活的class是active
            return (
                    <NavLink key={index} className={cls} replace={true} to={"/"+item.key}  activeClassName="active" onClick={() => this.changeTab(item)}>
                        <div className="tab-icon"></div>
                        <div className="btn-name">{name}</div>
                    </NavLink>
            )
        })
    }
    render() {
        return (
            <div className="bottom-bar">
                {this.renderItems()}
            </div>
        )
    }
}

// withRouter作用：将一个组件包裹进Route里面, 然后react-router的三个对象history, location, match就会被放进这个组件的props属性中，该组件本来不是Router,使用withRouter后可使组件实现跳转
// connect方法，用于从 UI 组件生成容器组件。
export default withRouter(connect(
    // connet第一个参数是mapStateToProps是一个函数，建立一个从（外部的）state对象到（UI 组件的）props对象的映射关系。mapStateToProps的第一个参数是state
    state => ({ // 返回一个对象。这个对象有一个tabs属性，代表 BottomBar组件同名属性tabs
        tabs: state.tabReducer.tabs,
        activekey: state.tabReducer.activekey
    })
)(BottomBar));

