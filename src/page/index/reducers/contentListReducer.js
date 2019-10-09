import { LIST_DATA } from '../actions/actionTypes';

const initState = {
    list: []
};

const getList = (state, action) => {
    if (action.currentPage === 0) {
        // action.obj是contentListAction中dispatch挂载的信息,将同名属性list覆盖state的list
        return { ...state, list: action.obj.data.poilist }
    } else {
        let list = state.list;
        // 将后来请求的数据连接到第一次请求的list数组,覆盖state的同名属性list
        return {...state,list:list.concat(action.obj.data.poilist)}
    }

}

const conentListReducer = (state = initState, action) => {
    switch (action.type) {
        case LIST_DATA: return getList(state, action);
        default: return state;
    }
}

export default conentListReducer;