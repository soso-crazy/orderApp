import {combineReducers} from 'redux';
import headerReducer from './headerReducer';
import contentListReducer from './contentListReducer';
import scrollViewReducer from 'component/ScrollView/scrollViewReducer';

const reducers = combineReducers({
    headerReducer,
    contentListReducer,
    scrollViewReducer
});

export default reducers;