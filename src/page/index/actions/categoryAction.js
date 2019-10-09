import { HEAD_DATA } from './actionTypes';
import axios from 'axios';

// 返回一个函数，而普通的Action Creator 默认返回一个对象。
// 返回的函数的参数是dispatch和getState这两个 Redux 方法，普通的 Action Creator 的参数是 Action 的内容。
export const getHeaderData = () => async (dispatch) => {
    // url以webpack打包输出目录dev为根路径
    let resp = await axios({
        method: 'get',
        url:'/json/head.json'
    });

    dispatch({
        type: HEAD_DATA,
        obj: resp.data
    });
};