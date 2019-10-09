import './ShopBar.scss';
import React from 'react';
import { connect } from 'react-redux';

import { showChooseContent, addSelectItem, minusSelectItem, clearCart } from '../../actions/menuAction';

/**
 * 购物车
 */
class ShopBar extends React.Component {

    /**
     * 获取总菜品价钱
     */
    getTotalPrice() {
        let list = this.props.listData.food_spu_tags || [];
        let totalPrice = 0;
        let dotNum = 0;
        let chooseList = [];
        for (let i = 0; i < list.length; i++) {
            let spus = list[i].spus || [];
            for (let j = 0; j < spus.length; j++) {
                let chooseCount = spus[j].chooseCount; // 在菜品中点击了加减号会发送相应的action来计算chooseCount,获取该值
                if (chooseCount > 0) {
                    dotNum += chooseCount;
                    totalPrice += spus[j].min_price * chooseCount;
                    spus[j]._index = j; // 右侧菜品内容第几个item
                    spus[j]._outIndex = i; // 左侧菜单第几个item
                    chooseList.push(spus[j]); // 把选中的菜品放进数组
                }
            }
        }
        return { totalPrice, dotNum, chooseList } // 使用es6语法 totalPrice:totalPrice
    }

    /**
     * 在购物车中渲染选中菜品
     */
    renderChooseItem(data) { // data接收的是getTotalPrice返回的对象
        let array = data.chooseList;
        return array.map((item, index) => {
            return (
                <div className="choose-item" key={index}>
                    <div className="item-name">{item.name}</div>
                    <div className="price">¥{item.min_price * item.chooseCount}</div>
                    <div className="select-content">
                        <div onClick={() => this.minusSelectItem(item)} className="minus"></div>
                        <div className="count">{item.chooseCount}</div>
                        <div onClick={() => this.addSelectItem(item)} className="plus"></div>
                    </div>
                </div>
            )
        })
    }

    /**
     * 添加菜品数量
     */
    addSelectItem(item) { // item接收右侧菜品内容的第几个item
        this.props.dispatch(addSelectItem({
            index: item._index,
            outIndex: item._outIndex
        }));
    }
    /**
     * 减少菜品数量
     */
    minusSelectItem(item) {
        this.props.dispatch(minusSelectItem({
            index: item._index, // 代表左侧第几个tab选项
            outIndex: item._outIndex // 代表右侧菜品第几个item
        }));
    }

    /**
     * 点击购车图标，显示隐藏选中菜品内容
     */
    openChooseContent() {
        let flag = this.props.showChooseContent;
        this.props.dispatch(showChooseContent({
            flag: !flag
        }))
    }

    /**
     * 清空购物车
     */
    clearCar() {
        this.props.dispatch(clearCart());
        this.props.dispatch(showChooseContent({ // 隐藏购物车内容
            flag: false
        }))
    }

    render() {
        let shipping_fee = this.props.listData.poi_info ? this.props.listData.poi_info.shipping_fee_tip : 0;
        let data = this.getTotalPrice(); // 获取选中菜品的数量和总价，右侧菜品的第几个item，左侧选项第几个tab

        return (
            <div className="shopbar">
                {this.props.showChooseContent ?
                    <div className="choose-content">
                        <div className="content-top">
                            <div className="clear-cart" onClick={() => this.clearCar()}>清空购物车</div>
                        </div>
                        {this.renderChooseItem(data)}
                    </div>
                    : null}
                <div className="bottom-content" onClick={() => this.openChooseContent()}>
                    <div className="shop-icon">
                        {data.dotNum > 0 ? <div className="dot-num">{data.dotNum}</div> : null}
                    </div>
                    <div className="price-content">
                        <p className="total-price">￥{data.totalPrice}</p>
                        <p className="other-price">{shipping_fee}</p>
                    </div>
                    <div className="submit-btn">去结算</div>
                </div>
            </div>
        );
    }
}

// 因为数据都是父组件传递过来，不需要使用store
export default connect(
    state => ({
        listData: state.menuReducer.listData,
        showChooseContent: state.menuReducer.showChooseContent
    })
)(ShopBar);
