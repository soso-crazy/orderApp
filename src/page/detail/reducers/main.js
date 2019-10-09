import tabReducer from './tabReducer';
import menuReducer from './menuReducer';
import commentReducer from './commentReducer';
import restaurantReducer from './restaurantReducer';
import scrollViewReducer from 'component/ScrollView/scrollViewReducer.js';

import { combineReducers } from 'redux';

import { connectRouter } from 'connected-react-router';

const reducers = (history) => combineReducers({
    router: connectRouter(history),
    tabReducer,
    menuReducer,
    commentReducer,
    restaurantReducer,
    scrollViewReducer
});

export default reducers;