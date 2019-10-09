import React from 'react';
import './ListItem.scss';

/**
 * @description 订单列表单个组件
 */

class ListItem extends React.Component {
    constructor(props) {
        super(props);
    }

    /**
     * @description 计算每张订单的总价格
     * @param {*} data 
     */
    renderTotalPrice(data, index) {
        return (
            <div className="product-item" key={index}>
                <span>...</span>
                <div className="product-total-count">
                    总计{data.product_count}个菜，
                    实付<span className="total-price">￥{data.total}</span>
                </div>
            </div>
        )
    }

    /**
     * @param {*} data
     * @description 渲染具体菜品
     */
    renderProduct(data) {
        let list = data.product_list;

        // 复制数组防止引用
        let _list = JSON.parse(JSON.stringify(list));
        
        // push一个用来计算总计的{type:more}
        _list.push({type: 'more'});
        return _list.map((item, index) => {

            if (item.type === 'more') {
                return this.renderTotalPrice(data, index);
            }
            return <div className="product-item" key={index}>
                {item.product_name}
                <div className="product-count">x {item.product_count}</div>
            </div>
        })
    }

    /**
     * @param {*} data
     * @description 渲染评价按钮
     */
    renderComment(data) {
        let evaluation = !data.is_comment;
        if (evaluation) {
            return (
                <div className="evaluation">
                    <div className="evaluation-btn">评价</div>
                </div>
            )
        }
        return null;
    }

    render() {
        // 接收父组件Order.jsx传来的数据,利用props接收
        let data = this.props.itemData;
        return <div className="order-item clearfix">
            <div className="order-item-inner">
                <img src={data.poi_pic} alt="" className="item-img" />
                <div className="item-right">
                    <div className="item-top">
                        <p className="order-name one-line">{data.poi_name}</p>
                        <div className="arrow"></div>
                        <div className="order-state">{data.status_description}</div>
                    </div>
                    <div className="item-bottom">
                        {this.renderProduct(data)}
                    </div>
                </div>
            </div>
            {this.renderComment(data)}
        </div>
    }
}

export default ListItem;