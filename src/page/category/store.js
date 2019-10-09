// 需要在applyMiddleware之前引入，否则会报错Uncaught TypeError: middleware is not a function
import thunk from 'redux-thunk';

// 生成日志中间件logger
import logger from 'redux-logger';

import { createStore, applyMiddleware } from 'redux';

import reducers from './reducers/main';

// 点击切换tab时需要thunk中间件解决异步action
const store = createStore(
    reducers,
    applyMiddleware(thunk,logger)
);

export default store;