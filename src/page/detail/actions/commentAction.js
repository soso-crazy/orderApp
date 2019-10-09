import { COMMENT_LIST_DATA } from '../actions/actionTypes';
import { CHANGEREADYSTATE } from 'component/ScrollView/ScrollViewActionsTypes.js';
import axios from 'axios';

export const getListData = () => async (dispatch) => {
    dispatch({
        type:CHANGEREADYSTATE,
        obj:false
    });

    let resp = await axios({
        method: 'get',
        url: './json/comments.json'
    })

    dispatch({
        type: COMMENT_LIST_DATA,
        obj: resp.data
    });

    dispatch({
        type:CHANGEREADYSTATE,
        obj:true
    });
};