import { RESTANURANT_DATA } from '../actions/actionTypes';
import axios from 'axios';

export const getRestanurantData = () =>async(dispatch)=>{
    let resp = await axios({
        method:'get',
        url:'json/restaurant.json'
    });

    dispatch({
        type:RESTANURANT_DATA,
        obj:resp.data
    });
};