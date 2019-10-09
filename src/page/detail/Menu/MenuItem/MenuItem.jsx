import './MenuItem.scss';
import React from 'react';
import { connect } from 'react-redux';

import { addSelectItem, minusSelectItem } from '../../actions/menuAction';

/**
 * 每个菜品的组件
 * @description <MenuItem />
 */
class MenuItem extends React.Component {

    /**
     * 添加菜品数量
     */
    addSelectItem() {
        this.props.dispatch(addSelectItem({
            index: this.props._index // this.props._index是父组件传递过来的
        }));
    }

    /**
     * 减少菜品数量
     */
    minusSelectItem() {
        this.props.dispatch(minusSelectItem({
            index: this.props._index
        }));
    }

    render() {
        let item = this.props.data; // 父组件传递过来的数据
        return (
            <div className="menu-item">
                <img src={item.picture} alt="" className="img" />
                <div className="menu-item-right">
                    <p className="item-title">{item.name}</p>
                    <p className="item-desc two-line">{item.description}</p>
                    <p className="item-like">{item.praise_content}</p>
                    <p className="item-price">￥{item.min_price}<span className="unit">/{item.unit}</span></p>
                </div>
                <div className="select-content">
                    {item.chooseCount > 0 ? <div className="minus" onClick={() => this.minusSelectItem()}></div> : null}
                    {item.chooseCount > 0 ? <div className="count">{item.chooseCount}</div> : null}
                    <div className="plus" onClick={() => this.addSelectItem()}></div>
                </div>
            </div>
        );
    }
}

// 因为数据都是父组件传递过来，不需要使用store
export default connect()(MenuItem);
