import { GET_LIST_DATA, LEFT_CLICK, ADD_SELECT_ITEM, MINUS_SELECT_ITEM, SHOW_CHOOSE_CONTENT, CLEAR_CART } from '../actions/actionTypes';

const initState = {
    listData: {},
    currentLeftIndex: 0,
    showChooseContent: false, // 是否打开购物车详情内容标志位
    poiInfo:{}
};

const getListData = (state, action) => {
    return { ...state, poiInfo:action.obj.data,listData: action.obj.data };
};

const itemClick = (state, action) => {
    return { ...state, currentLeftIndex: action.obj.currentLeftIndex }
};

// 实现菜品加减是点击加减号发送action，计算chooseCount的值，把计算后的菜品数据发生给store
const dealWithSelectItem = (state, action, type) => {
    // 获取到整个右侧渲染内容数据
    let listData = state.listData; // 获取请求的数据，food.json中的data属性值。在getListData的计算reducer过程中存放到store里，state.listData存放了action.obj.data的数据

    // 外层，左边list列表
    let list = listData.food_spu_tags || [];

    // 通过列表找到左边item使用的数据
    let currentItem = list[action.obj.outIndex||state.currentLeftIndex]; // 根据点击左边第几个item获取右边对应的数据，数组[下标]获取数据

    if (type === ADD_SELECT_ITEM) {
        // 对当前点击的item的chooseCount自增
        currentItem.spus[action.obj.index].chooseCount++; // index是MenuItem.jsx中点击加号，发送对应右边第几个item的值
    } else if (type === MINUS_SELECT_ITEM) {
        // 对当前点击的item的chooseCount自增
        currentItem.spus[action.obj.index].chooseCount--;
    }

    let _listData = JSON.parse(JSON.stringify(listData)); //实现深拷贝，改变_listData不会改变复制对象listData
    return _listData;
};

const addSelectItem = (state, action) => {
    return { ...state, listData: dealWithSelectItem(state, action, ADD_SELECT_ITEM) };
}

const minuSelectItem = (state, action) => {
    return { ...state, listData: dealWithSelectItem(state, action, MINUS_SELECT_ITEM) };
}

const showChooseContent = (state, action) => {
    return { ...state, showChooseContent: action.obj.flag }
}

/**
 * 清空购物车
 */
const clearCart = (state) => {
    let listData = state.listData;

    // 左侧tab选项的所有数据
    let list = listData.food_spu_tags || [];

    for (let i = 0; i < list.length; i++) {

        // 每一个左侧tab选项对应的右侧所有菜品数据
        let spus = list[i].spus || [];

        // 右侧菜品内容每一个item选中数量为0
        for (let j = 0; j < spus.length; j++) {
            spus[j].chooseCount = 0;
        }
    }
    return {...state, listData: JSON.parse(JSON.stringify(listData)) };
}

const menuReducer = (state = initState, action) => {
    switch (action.type) {
        case GET_LIST_DATA: return getListData(state, action);
        case LEFT_CLICK: return itemClick(state, action);
        case ADD_SELECT_ITEM: return addSelectItem(state, action);
        case MINUS_SELECT_ITEM: return minuSelectItem(state, action);
        case SHOW_CHOOSE_CONTENT: return showChooseContent(state, action);
        case CLEAR_CART: return clearCart(state, action);
        default: return state;
    }
}

export default menuReducer;