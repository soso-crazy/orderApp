import { GET_LIST_DATA } from '../actions/actionTypes';

const initState = {
    list: [],
    filterData: null,
    page:0,
    isEnd:false
};

const getList = (state, action) => {
    let _listData = [];
    let _filterData = action.filterData || state.filterData; // aciton挂载的内容或state之前有的filterData
    let _page = action.toFirstPage ? 0 : state.page;
    let _isEnd = false;

    if (_page === 0) {
        _listData = action.obj.data.poilist; // 第一屏请求的数据
    } else {
        _listData = state.list.concat(action.obj.data.poilist); // 将第一屏的数据与后来屏数页码的数据拼接
    }
    _page+=1; // 更新屏数页码

    if(_page>3){
        _isEnd = true;
    }

    return {...state,list:_listData,filterData:_filterData,page:_page,isEnd:_isEnd} // 把数据覆盖到state的同名属性
}

const contentListReducer = (state = initState, action) => {
    switch (action.type) {
        case GET_LIST_DATA: return getList(state, action);
        default: return state;
    }
}

export default contentListReducer;