// 引入定义的常量，Action的type属性值
import {CHANGE_TAB} from '../actions/actionTypes';

import {TABKEY} from '../config';

// 整个应用的初始状态，可以作为 State 的默认值
const initState = {
    tabs:[
        {
            name:'首页',
            key:TABKEY.home
        },
        {
            name:'订单',
            key:TABKEY.order
        },
        {
            name:'我的',
            key:TABKEY.my
        },
    ],
    activekey:TABKEY.my
};

// Reducer计算state的函数changeTab
const changeTab = (state,action) => {
    // 获取BottomBar.jsx中dispatch发送的changeTab的action函数
    let activekey = action.obj.activekey;
    // 返回的是将state展开，把state与activeKey属性合并。在tabReducer函数中，将state默认值赋了initState，所以返回的对象是将initState的activeKey覆盖为action.obj.activekey
    return { ...state, activekey:activekey};
}

// Store 收到 Action 以后，必须给出一个新的 State，这样 View 才会发生变化。这种 State 的计算过程就叫做 Reducer。
// Reducer 是一个函数，它接受 Action 和当前 State 作为参数，返回一个新的 State。

// 使用es6给函数参数赋默认值，如果state是undefined，默认值是initState
const tabReducer = (state=initState,action) => { // 定义Reducer，它是函数接收action和当前的state
    switch(action.type){
        case CHANGE_TAB: return changeTab(state,action); // 对state进行运算
        default: return state; // 返回新的state
    }
}

export default tabReducer;