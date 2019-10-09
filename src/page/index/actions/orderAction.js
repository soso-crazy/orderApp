import { ORDER_DATA } from './actionTypes';
import { CHANGEREADYSTATE } from 'component/ScrollView/ScrollViewActionsTypes';
import axios from 'axios';

export const getOrderData = (page) => (dispatch) => {
    // 滚动ScrollView只触发一次ajax请求。因为在ScrollView组件中，readyToLoad标志位为false，不执行
    dispatch({
        type:CHANGEREADYSTATE,
        obj:false
    });

    axios({
        method: 'get',
        url: '/json/orders.json'
    }).then(resp => {
        dispatch({
            type: ORDER_DATA,
            obj: resp.data,
            currentPage: page
        });
    });

    dispatch({
        type:CHANGEREADYSTATE,
        obj:true
    });
};