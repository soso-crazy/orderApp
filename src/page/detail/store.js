import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import { routerMiddleware } from 'connected-react-router';
import { createHashHistory } from 'history';

import reducers from './reducers/main';

// 创建基于Hash的history
export const history = createHashHistory();

// 初始化tab页面
history.replace('menu');

// 为使用Redux DevTools的Chrome插件而改造store.js
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// 把redux和router连接起来
export const configureStore = () => {
    const store = createStore(
        reducers(history),
        composeEnhancers(
            applyMiddleware(
                routerMiddleware(history),
                thunk
            )
        )
    );

    // 当reducer发生改变，触发热模块加载并替换新的reducer
    if (module.hot) {
        module.hot.accept('./reducers/main', () => {
            const nextRootReducer = require('./reducers/main.js').default;
            store.replaceReducer(nextRootReducer);
        })
    }

    return store;
};

module.exports = {
    history,
    configureStore
};

