import React from 'react';
import { connect } from 'react-redux';
import './Header.scss';
import { changeTab, getFilterData, changeFilter } from '../actions/headerAction';
import { TABKEY } from '../config';

// 点击tabs时发送action并发起ajax请求
import getListData from '../actions/contentListAction';

/**
 * @description category页面顶部选项栏
 */
class Header extends React.Component {
    constructor(props) {
        super(props);
        this.fetchData();
    }

    // 发送action获取数据
    fetchData() {
        // getFilterData是headerAction中的函数，目的就是发起ajax请求，发送action给store
        this.props.dispatch(getFilterData())
    }

    // renderTabs中点击事件changeTab，点击选中的选项的key挂载在action中传给store
    changeTab(key) {
        // 能够点击面板里的内容所以面板一定要是显示出来的，关闭面板标志位为false
        let closePanel = false;
        // 如果前后点击是同一个tab选项，就关闭panel
        if (this.props.activeKey === key && !this.props.closePanel) {
            closePanel = true; // 面板关闭
        }
        // 发送action给store，changeTab是headerAction的函数，目的是发送相应的action
        this.props.dispatch(changeTab({
            activeKey: key, // 这里是changeTab函数的实参，挂载内容给store
            closePanel: closePanel // 点击不同的tab选项时更新关闭面板标志位，发送给store
        }));
    }

    /**
     * 变化当前点击状态的item，同时发起filter请求
     */
    changeDoFilter(item, keyName, data) {
        this.reverActive(keyName, data);
        item.active = true; // 选中面板内容，改变active的值，renderCateInnerContent内添加上active的className
        this.props.dispatch(changeFilter({ // 改变tab的文字内容原理是发起action改变tabs的text属性重新渲染renderTabs
            item, // 发送的action挂载的内容是对象的引用，改变了item的属性值就改变item，顺带发送给store
            keyName,
            data
        }));

        // 点击tab的内容时发送action展现相应的内容
        this.props.dispatch(getListData({
            filterData:item, // 把当前点击的选项内容传进去
            toFirstPage:true
        }))
    }

    /**
     * 重置其他item的Active状态
     */
    reverActive(keyName, data) {
        // 给每项tab的展现在面板的数据都加上active属性值为false
        if (keyName === TABKEY.cate) {
            for (let i = 0; i < data.length; i++) {
                for (let j = 0; j < data[i].sub_category_list.length; j++) {
                    data[i].sub_category_list[j].active = false;
                }
            }
        }
        else if (keyName === TABKEY.type) {
            for (let x = 0; x < data.length; x++) {
                data[x].active = false;
            }
        }
        else if (keyName === TABKEY.filter) {
            for (let y = 0; y < data.length; y++) {
                for (let z = 0; z < data[y].items.length; z++) {
                    data[y].items[z].active = false;
                }
            }
        }
    }

    /**
     * 渲染过滤面板
     */
    renderContent() {
        let tabs = this.props.tabs;
        let array = [];
        for (let key in tabs) {
            let item = tabs[key];
            let cls = item.key + '-panel';
            if (item.key === this.props.activeKey) { // 选中的选项添加current的className
                cls += ' current';
            }

            if (item.key === TABKEY.cate) {
                array.push(
                    <ul key={item.key} className={cls}>
                        {this.renderCateContent()}
                    </ul>
                );
            } else if (item.key === TABKEY.type) {
                array.push(
                    <ul key={item.key} className={cls}>
                        {this.renderTypeContent()}
                    </ul>
                );
            } else if (item.key === TABKEY.filter) {
                array.push(
                    <ul key={item.key} className={cls}>
                        {this.renderFilterContent()}
                    </ul>
                );
            }
        }
        return array;
    }


    /**
     * 全部分类外类目
     */
    renderCateContent() {
        // 获取store的数据
        let cateList = this.props.filterData.category_filter_list || [];
        return cateList.map((item, index) => {
            return (
                <li key={index} className="cate-item">
                    <p className="item-title">
                        {item.name}
                        <span className="item-count">{item.quantity}</span>
                    </p>
                    {/* cate-box用了浮动，它的父元素item-content需要清除浮动 */}
                    <div className="item-content clearfix">
                        {this.renderCateInnerContent(item, cateList)}
                    </div>
                </li>
            )
        });
    }

    /**
     * 全部分类里面的每一个标签选项
     */
    renderCateInnerContent(items, data) {
        // data接收renderCateInnerContent传递的cateList
        return items.sub_category_list.map((key, index) => {
            let cls = key.active ? 'cate-box-inner active' : 'cate-box-inner';
            return (
                <div className="cate-box" key={index} onClick={() => this.changeDoFilter(key, TABKEY.cate, data)}>
                    <div className={cls}>
                        {key.name}({key.quantity})
                    </div>
                </div>
            )
        })
    }

    /**
     * 综合排序类目
     */
    renderTypeContent() {
        let typeList = this.props.filterData.sort_type_list || [];
        return typeList.map((item, index) => {
            let cls = item.active ? "type-item active" : "type-item";
            return (
                <li className={cls} key={index} onClick={() => this.changeDoFilter(item, TABKEY.type, typeList)}>
                    {item.name}
                </li>
            )
        })
    }

    /**
     * 筛选外面类目
     */
    renderFilterContent() {
        let filterList = this.props.filterData.activity_filter_list || [];
        return filterList.map((item, index) => {
            return (
                <li key={index} className="filter-item">
                    <p className="filter-title">{item.group_title}</p>
                    {/* renderFilterInnerContent中的cate-box使用了浮动，它的父元素item-content需要清除浮动 */}
                    <div className="item-content clearfix">
                        {this.renderFilterInnerContent(item.items, filterList)}
                    </div>
                </li>
            )
        })
    }

    /**
     * 筛选内部的每个类目
     */
    renderFilterInnerContent(items, data) {
        // data接收renderFilterInnerContent传递的filterList
        return items.map((each, index) => {
            // 请求数据是否有小图标
            let cls = each.icon ? 'cate-box-inner has-icon' : 'cate-box-inner';
            if (each.active) {
                cls += ' active';
            }
            return (
                <div key={index} className="cate-box" onClick={() => this.changeDoFilter(each, TABKEY.filter, data)}>
                    <div className={cls}>
                        {/* 请求数据如果有小图标就添加img */}
                        {each.icon ? <img src={each.icon} /> : null}{each.name}
                    </div>
                </div>
            )
        })
    }

    /**
     * @description 渲染顶部默认tab
     */
    renderTabs() {
        // 通过connect，组件可以props.同名属性获取到reducer里计算得出的同名的属性值
        let tabs = this.props.tabs;
        let arr = [];
        for (let key in tabs) {
            let item = tabs[key]; // 指tabs里的每项属性值，值为对象
            let cls = item.key + ' item'; // className是: 每个选项名 item(通用统一的item的className)
            if (item.key === this.props.activeKey && !this.props.closePanel) { // 面板关闭时不显示倒三角
                // 点击选中的item添加current的class来达到过渡效果
                cls += ' current';
            }
            arr.push(
                <div className={cls} key={item.key} onClick={() => this.changeTab(item.key)}>
                    {item.text}
                </div>
            )
        }
        return arr;
    }

    render() {
        // this.props.closePanel数据来自HeaderReducer传递的同名属性
        let cls = this.props.closePanel ? "panel" : "panel show"; // 通过store中的closePanel标志位控制面板是否显示，添加了show的className 是面板显示
        return (
            <div className="header">
                <div className="header-top">{this.renderTabs()}</div>
                <div className={cls}>
                    <div className="pannel-inner">
                        {this.renderContent()}
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(
    state => ({
        // 组件的props.tabs数据来自headerReducer的同名属性tabs
        tabs: state.headerReducer.tabs,
        activeKey: state.headerReducer.activeKey,
        filterData: state.headerReducer.filterData,
        closePanel: state.headerReducer.closePanel
    })
)(Header);

