import {HEAD_DATA} from '../actions/actionTypes';

const initState = {
    items:[]
};

// 计算state的函数
const getCategory = (state,action) => {

    // 将items的属性值覆盖state的同名属性值。 action.obj代表action函数的obj参数
    return {...state,items:action.obj.data.primary_filter};
}

// 计算state的过程是Reducer，是纯函数。接收参数state和action，返回新的state
const categoryReducer = (state=initState,action) => {
    switch(action.type) {
        case HEAD_DATA : return getCategory(state,action);
        default:return state;
    }
}

export default categoryReducer;