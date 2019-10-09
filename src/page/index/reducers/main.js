// 引入拆分的reducer
import tabReducer from './tabReducer.js'
import categoryReducer from './categoryReducer';
import conentListReducer from './contentListReducer';
import orderReducer from './orderReducer';
import scrollViewReducer from 'component/ScrollView/scrollViewReducer';

import { combineReducers } from 'redux';

// 引入connectRouter，将redux和router连接
import { connectRouter } from 'connected-react-router';

// combineReducers()做的就是产生一个整体的 Reducer 函数。该函数根据 State 的 key 去执行相应的子 Reducer，并将返回结果合并成一个大的 State 对象。
// 将拆分的Reducer合并成一个Reducer

const mainReducer = (history) => combineReducers({
  router: connectRouter(history), // 把router reducer和其他reducer连接起来，// Add the reducer to your store on the `router` key
  tabReducer,
  categoryReducer,
  conentListReducer,
  orderReducer,
  scrollViewReducer
});
// 把routerReducer和其他reducer连接，然后就可以在`this.props.router`里面获取单相关的路径信息
export default mainReducer;