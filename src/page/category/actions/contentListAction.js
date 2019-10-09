import { GET_LIST_DATA } from './actionTypes';
import { CHANGEREADYSTATE } from 'component/ScrollView/ScrollViewActionsTypes';

import axios from 'axios';

const getListData = (obj) => async (dispatch, getState) => {
    // 滚动ScrollView只触发一次ajax请求。因为在ScrollView组件中，readyToLoad标志位为false，不执行
    dispatch({
        type:CHANGEREADYSTATE,
        obj:false
    });

    let url = '/json/list.json';
    // getState可以获取整个redux 所有state
    if (obj.filterData || getState().contentListReducer.filterData) { // 传入action的filterData或者已经传给reducer计算得出的filterData。在Header.jsx中action挂载的filterData内容是点击的tab选项
        url = '/json/listparams.json';
    }
    let resp = await axios({
        method: 'get',
        url: url
    });

    dispatch({
        type: GET_LIST_DATA,
        filterData:obj.filterData, // Header.jsx中changeDoFilter方法发送的action挂载内容
        toFirstPage:obj.toFirstPage,
        obj:resp.data // 这里的obj与getListData参数obj无关，是挂载在action的内容
    });

    dispatch({
        type:CHANGEREADYSTATE,
        obj:true
    });
};

export default getListData;