# 滑动懒加载

* 使用组件的形式

* ScrollView.jsx
```js
import React from 'react';

import './ScrollView.scss';

/**
 * <ScrollView loadCallback={function} isEnd={boolean} />
 * @description 滚动加载组件
 */
class ScrollView extends React.Component {
    onLoadPage() {
        let clientHeight = document.documentElement.clientHeight;
        let scrollHeight = document.body.scrollHeight;
        let scrollTop = document.documentElement.scrollTop;

        // 页面底部距离可视区域还要preLoadDis距离时就开始加载内容
        let preLoadDis = 30;

        // 判断加载内容的条件
        if (scrollTop + clientHeight >= scrollHeight - preLoadDis) {
            if (!this.props.isEnd) {
                // 执行父组件传递过来的loadCallback函数
                this.props.loadCallback && this.props.loadCallback();
            }
        }
    }

    // 在组件挂载到DOM
    componentDidMount() {
        // this指向ContentList组件的实例：React构造方法中的bind会将handleClick函数与这个组件Component进行绑定以确保在这个处理函数中使用this时可以时刻指向这一组件。
        // 将onLoadPage函数的this绑定为ContentList组件，使函数内部的this可以对应onLoadPage函数外定义的各种值
        window.addEventListener('scroll', this.onLoadPage.bind(this));
    }

    // 组件销毁时需要移除监听事件
    componentWillUnmount() {
        window.removeEventListener('scroll', this.onLoadPage.bind(this));
    }

    render() {
        return (
            <div className="scrollView">
                {/* 表示组件的所有子节点，当前组件没有子节点，它就是undefined;如果有一个子节点，数据类型是Object;如果有多个子节点，数据类型就是array，React.Children来处理this.props.children */}
                {this.props.children}
            </div>
        )
    }
}

export default ScrollView;
```

* 在使用滚动加载组件的页面 ContentList.jsx中

```js
constructor(props){
    super(props);

    // 定义允许滚动加载标志位
    this.state = {
        isEnd:false
    }
}
// 定义传递给ScrollView子组件的滚动函数loadCallback
    onLoadPage() {
        this.page++;

        // 最多滚动3页
        if (this.page > 3) {
            this.setState({
                isEnd: true
            })
        } else {
            // 当页面滚动到第二屏和第三屏时发送action请求数据
            this.fetchData(this.page);
        }
    }

    render(){
        return (
            ...
            // 使用滚动加载组件  传递使用滚动加载组件的ContentList.jsx中定义传给滚动组件的函数onLoadPage，传递state中定义的isEnd给滚动加载组件
            <ScrollView loadCallback={this.onLoadPage.bind(this)} isEnd={this.state.isEnd}>
                ...渲染内容
            </ScrollView>
        )
    }
```

===

# 使用thunk中间件

[redux-thunk](https://www.npmjs.com/package/redux-thunk)
# redux-thunk中间件
* npm install redux-thunk --save

* 在store.js中引入中间件thunk
```js
import thunk from 'redux-thunk';

 // to enable Redux Thunk, use applyMiddleware():
 import { createStore,applyMiddleware } from 'redux';

 // 在生成store的同时，使用thunk
 const store = createStore(
        mainReducer,
        applyMiddleware(thunk)
    );

// 改造Action Creator 函数 ：categoryAction.js
/* （1）fetchPosts返回了一个函数，而普通的 Action Creator 默认返回一个对象。
  （2）返回的函数的参数是dispatch和getState这两个 Redux 方法，普通的 Action Creator 的参数是 Action 的内容。 */
export const getHeaderData = () => (dispatch)=> {
    axios({
        method: 'get',
        url: '/json/head.json'
    }).then(resp => {
        // 请求数据后发送一个Action
        dispatch({
            type:HEAD_DATA,
            obj:resp.data // Action挂载的内容是请求的数据
        })
    })
};

// category相关的reducer
import {HEAD_DATA} from '../actions/actionTypes';

const initState = {
    items:[]
};

// 计算state的函数
const getCategory = (state,action) => {

    // 将items的属性值覆盖state的同名属性值。 action.obj代表action函数的obj参数
    return {...state,items:action.obj.data.primary_filter};
}

// 计算state的过程是Reducer，是纯函数。接收参数state和action，返回新的state
const categoryReducer = (state=initState,action) => {
    switch(action.type) {
        case HEAD_DATA : return getCategory(state,action);
        default:return state;
    }
}

export default categoryReducer;

// 在category.jsx中
import {getHeaderData} from './categoryAction';
class Category extends React.Component {
    constructor(props) {
        super(props);
        this.fetchData();
    }

    fetchData() {
        // 使用redux-thunk中间件对categoryAction改造后，dispatch可以接受函数作为参数。
        this.props.dispatch(getHeaderData()) // 发送Action给store
    }
}
    // connect 建立一个从（外部的）state对象到（UI 组件的）props对象的映射关系
export default connect(
    state => ({
        // 组件props的list对应contentListReducer的state同名属性的list
        list:state.conentListReducer.list
    })
)(ContentList);
```
===

# 使用redux DevTools

[redux DevTools](https://github.com/zalmoxisus/redux-devtools-extension#installation)

**因为使用了connected-react-router**使用了中间件，需要找到网页中1.2 Advanced store setup改写含有中间件的store.js
1.2 Advanced store setup
If you setup your store with middleware and enhancers, change:

  import { createStore, applyMiddleware, compose } from 'redux';

+ const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
+ const store = createStore(reducer, /* preloadedState, */ composeEnhancers(
- const store = createStore(reducer, /* preloadedState, */ compose(
    applyMiddleware(...middleware)
  ));
  --------------------------
  ```js
  找到想使用redux DevTools页面的store.js
  因为使用了applyMiddleware，需要改写为

  import { createStore, applyMiddleware, compose } from 'redux';
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
   const store = createStore(
        reducers(history),
        composeEnhancers( // 用定义的composeEnhancers包裹中间件
            applyMiddleware(
                routerMiddleware(history),
                thunk
            )
        )


    如果没有使用中间件，改写store.js
    const store = createStore(
   reducer, /* preloadedState, */
+  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() // 添加这句
 );
  ```