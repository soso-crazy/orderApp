// 使用thunk中间件需要引入applyMiddleware
import { createStore, applyMiddleware} from 'redux';

// 引入选择创建基于Hash的history，在安装包/history里有三种不同的history选择引入
import { createHashHistory } from 'history';

import { routerMiddleware } from 'connected-react-router'

// 引入redux的中间件
import thunk from 'redux-thunk';

// 引入合并的reducer
import mainReducer from './reducers/main.js';

// 创建基于Hash的history
const history = createHashHistory();

// 初始化tab
history.replace('home');

const configureStore = () => {
    const store = createStore(
        mainReducer(history), // root reducer with router state
            applyMiddleware(
                routerMiddleware(history), // for dispatching history actions
                thunk  // ... other middlewares ...
            )
    )

    // 模块热加载，当reducer发生改变也改变redux
    if (module.hot) {
        module.hot.accept('./reducers/main', () => {
            const nextRootReducer = require('./reducers/main.js').default;
            store.replaceReducer(nextRootReducer);
        })
    }

    return store;
}

module.exports = {
    configureStore,
    history
}
