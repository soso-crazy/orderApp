import {LIST_DATA} from './actionTypes';
import {CHANGEREADYSTATE} from 'component/ScrollView/ScrollViewActionsTypes';
import axios from 'axios';

// 使用thunk改造action 函数，返回的是一个函数，函数里发送action
export const getListData = (page) => (dispatch) => {
    // 滚动ScrollView只触发一次ajax请求。因为在ScrollView组件中，readyToLoad标志位为false，不执行
    dispatch({
        type: CHANGEREADYSTATE,
        obj: false
    });

    // 请求数据
    axios({
        method: 'get',
        url: '/json/list.json'
    }).then(resp => {

        // 发送action
        dispatch({
            type: LIST_DATA,
            // 挂载到action的内容
            obj: resp.data,
            currentPage: page
        });

        dispatch({
            type: CHANGEREADYSTATE,
            obj: true
        });
    })
};