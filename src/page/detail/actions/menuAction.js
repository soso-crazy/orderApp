import { GET_LIST_DATA, LEFT_CLICK, ADD_SELECT_ITEM, MINUS_SELECT_ITEM, SHOW_CHOOSE_CONTENT, CLEAR_CART } from './actionTypes';
import axios from 'axios';

export const getListData = () => async (dispatch) => {
    let resp = await axios({
        method: 'get',
        url: '/json/food.json'
    });

    dispatch({
        type: GET_LIST_DATA,
        obj: resp.data
    })
};

export const itemClick = (obj) => {
    return {
        type: LEFT_CLICK,
        obj: obj
    }
}

export const addSelectItem = (obj) => {
    return {
        type: ADD_SELECT_ITEM,
        obj: obj
    }
}

export const minusSelectItem = (obj) => {
    return {
        type: MINUS_SELECT_ITEM,
        obj: obj
    }
}

export const showChooseContent = (obj) =>{
    return {
        type: SHOW_CHOOSE_CONTENT,
        obj: obj
    }
}

export const clearCart = (obj) => {
    return {
        type:CLEAR_CART,
        obj:obj
    }
}