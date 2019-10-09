import { TABKEY } from '../config';
import { CHANGE_TAB, GET_FILTER_DATA, CHANGE_FILTER } from '../actions/actionTypes';

let tabs = {};

tabs[TABKEY.cate] = {
    key: TABKEY.cate,
    text: '全部分类',
    obj: {} // 存储每个分类下的各种分类结果
};
tabs[TABKEY.type] = {
    key: TABKEY.type,
    text: '综合排序',
    obj: {}
};
tabs[TABKEY.filter] = {
    key: TABKEY.filter,
    text: '筛选',
    obj: {}
};

const initState = {
    tabs: tabs,
    activeKey: TABKEY.cate,
    filterData: {},
    closePanel: true
}

const changeTab = (state, action) => {
    // 把headerAction.js中传入的obj参数合并到state的同名属性activeKey
    return { ...state, activeKey: action.obj.activeKey, closePanel: action.obj.closePanel }
}

const getFilterData = (state, action) => {
    // action.obj是headerAction中挂载在GET_FILTER_DATA的action中的obj
    return { ...state, filterData: action.obj.data }
}

const changeFilter = (state, action) => {
    let _tabs = JSON.parse(JSON.stringify(state.tabs)) // 深拷贝，假设B复制A，当A变化B不变就是深拷贝
    _tabs[action.obj.keyName] = { // 覆盖tabs[TABKEY.选中]的内容
        key: action.obj.keyName,
        text: action.obj.item.name,
        obj: action.obj.item
    }
    return { ...state, tabs: _tabs }
}

// 计算state的过程就是Reducer
const headerReducer = (state = initState, action) => {
    switch (action.type) {
        case CHANGE_TAB: return changeTab(state, action);
        case GET_FILTER_DATA: return getFilterData(state, action);
        case CHANGE_FILTER: return changeFilter(state, action);
        default: return state;
    }
};

export default headerReducer;

