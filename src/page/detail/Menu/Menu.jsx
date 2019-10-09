import './Menu.scss';
import React from 'react';
import { connect } from 'react-redux';

import { getListData, itemClick } from '../actions/menuAction';

import MenuItem from './MenuItem/MenuItem';
import ShopBar from './ShopBar/ShopBar';

/**
 * 点菜tab页面
 * @description <Menu/>
 */
class Menu extends React.Component {
    constructor(props) {
        super(props);

        // getListData是异步操作，放在constructor里很快就dispatch获得数据，当getListData是同步操作，放在ComponentDidMount里。因为componentDidMount方法中的代码，是在组件已经完全挂载到网页上才会调用被执行，所以可以保证数据的加载。
        this.props.dispatch(getListData())
    }

    /**
     * 点击切换右边数据
     */
    itemClick(index) {
        this.props.dispatch(itemClick({
            currentLeftIndex: index
        }));
    }

    /**
     * 渲染左侧列表
     */
    renderLeft() {
        let listData = this.props.listData.food_spu_tags || [];
        return listData.map((item, index) => {
            let cls = this.props.currentLeftIndex === index ? 'left-item active' : 'left-item'; // 为点击的左侧item添加active的className
            return (
                <div className={cls} key={index} onClick={() => this.itemClick(index)}>
                    <div className="item-text">
                        {item.icon ? <img src={item.icon} className="item-icon" /> : null}
                        {item.name}
                    </div>
                </div>
            )
        })
    }

    /**
     * 根据点击的左侧item渲染右侧内容
     */
    renderRight() {
        let index = this.props.currentLeftIndex; // 获取点击的是第几个左侧item
        let dataArray = this.props.listData.food_spu_tags || [];
        let currentItem = dataArray[index]; // 根据点击的item获取相应的数据的数组中第index个值
        if (currentItem) {
            let title = <p key="1" className="right-title">{currentItem.name}</p>
            return [
                title,
                <div className="right-list" key="2">
                    <div className="right-list-inner">
                        {this.renderRightList(currentItem.spus)}
                    </div>
                </div>
            ]
        } else {
            return null;
        }
    }

    /**
     * 渲染右侧内容的里面的内容
     * @param Array
     */
    renderRightList(array) {
        let _array = array || []; // 如果没获取到数据要array是undefined会出问题
        return _array.map((item, index) => {

            // 初始化菜品数量个数
            if (!item.chooseCount) {
                item.chooseCount = 0;
            }
            
            // 点击对应MenuItem的＋号，需要知道是第几个MenuItem,传递给子组件index
            return <MenuItem key={index} data={item} _index={index}></MenuItem>
        })
    }

    render() {
        return (
            <div className="menu-inner">
                <div className="left-bar">
                    <div className="left-bar-inner">
                        {this.renderLeft()}
                    </div>
                </div>
                <div className="right-content">
                    {this.renderRight()}
                </div>
                <ShopBar />
            </div>
        )
    }
}

export default connect(
    state => ({
        listData: state.menuReducer.listData,
        currentLeftIndex: state.menuReducer.currentLeftIndex
    })
)(Menu);

