import { CHANGE_TAB, GET_FILTER_DATA, CHANGE_FILTER } from './actionTypes';
import axios from 'axios';

export const changeTab = (obj) => (dispatch) => {
    dispatch({
        type: CHANGE_TAB,
        obj: obj
    })
}

// 使用中间件thunk发起异步action，改造action函数，返回的是一个函数
export const getFilterData = () => async (dispatch) => { // 使用es7语法，async用于声明一个函数是异步的
    // 使用es7语法，await用于等待异步完成。并且await只能在async函数中使用
    let resp = await axios({ // await等待的是axios，本质是Promise对象
        method: 'get',
        url: '/json/filter.json'
    });
    // 因为使用了await返回的是Promise对象，但无需then链式，直接在后面写链式下去的代码，看似同步代码，其实是异步操作的链式操作
    dispatch({
        type: GET_FILTER_DATA,
        obj: resp.data
    })
}

export const changeFilter = (obj) => (dispatch) => {
    dispatch({
        type: CHANGE_FILTER,
        obj: obj
    })

    // 筛选过后关掉面板
    dispatch({
        type:CHANGE_TAB,
        obj:{
            closePanel:true
        }
    })
}