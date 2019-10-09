import './Category.scss';

import React from 'react';
import { connect } from 'react-redux';

import { getHeaderData } from '../../actions/categoryAction';

/* 首页外卖类别 */

class Category extends React.Component {
    constructor(props) {
        super(props);
        this.fetchData();
    }

    fetchData() {
        // 使用redux-thunk中间件对categoryAction改造后，dispatch可以接受函数作为参数。
        this.props.dispatch(getHeaderData())
    }

    renderItems() {
        let items = this.props.items;
        items.splice(0,7);

        return items.map((item,index) => {
            // 如果category-item的布局是float：left使图标打横，需要在category-item的div上加上清除浮动的.clearfix
            return <div key={index} className="category-item">
                        {/* src是采用遍历数据，不需要加“” */}
                        <img className="item-icon" src={item.url} alt=""/>
                        <p className="item-name">{item.name}</p>
                    </div>
        })
    }

    render() {
        return (
            <div className="category-content">{this.renderItems()}</div>
        );
    }
}

// connect 建立一个从（外部的）state对象到（UI 组件的）props对象的映射关系
export default connect(
    state => ({
        // 组件同名items值（需要this.props.items获取）获取至categoryReducer的items值
        items: state.categoryReducer.items
    })
)(Category);