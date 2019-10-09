[阮一峰](http://www.ruanyifeng.com/blog/2016/09/redux_tutorial_part_three_react-redux.html)
[redux文档](https://www.redux.org.cn/docs/basics/Actions.html)

1.Action
> Action 是把数据从应用传到 store 的有效载荷。它是 store 数据的唯一来源。
# Action的本质是一个对象。Action 内必须使用一个字符串类型的 type 字段来表示将要执行的动作
# 其他的字段就是按照需要定义携带的载荷，自行定义即可。
```js
{
  type: ADD_TODO,  // type 字段来表示将要执行的动作
  text: 'Build my first Redux app' 
}
```
======

2.Action 创建函数 就是生成 action 的方法。
```js
function addTodo(text) {
  // 在 Redux 中的 action 创建函数只是简单的返回一个 action:
  return {
    type: ADD_TODO,
    text
  }
}
```
======

3.Reducers
**Reducers 指定了应用状态的变化如何响应 actions 并发送到 store 的，记住 actions 只是描述了有事情发生了这一事实，并没有描述应用如何更新 state。**

# reducer 就是一个纯函数，接收旧的 state 和 action，返回新的 state。

# 永远不要在 reducer 里做这些操作:
* 不要修改传入参数
* 不要执行有副作用的操作，如 API 请求和路由跳转
* 不要调用非纯函数，如 Date.now() 或 Math.random()
`纯函数就是：只要传入参数相同，返回计算得到的下一个 state 就一定相同。没有特殊情况、没有副作用，没有 API 请求、没有变量修改，单纯执行计算。`

```js
const initialState = {
  visibilityFilter: VisibilityFilters.SHOW_ALL,
  todos: []
};

function todoApp(state = initialState, action) { // 采用es6的函数参数赋默认值，当state为undefined时，值为initialState
  switch (action.type) {
    case SET_VISIBILITY_FILTER:
      return Object.assign({}, state, {  // 返回新的state对象
        visibilityFilter: action.filter
      })
    default:
      return state // default情况下返回旧的state，即是initalState
  }
}
```
1.不要修改 state。 使用 Object.assign() 新建了一个副本。不能这样使用 Object.assign(state, { visibilityFilter: action.filter })，因为它会改变第一个参数的值。你必须把第一个参数设置为空对象。
2.在 default 情况下返回旧的 state。遇到未知的 action 时，一定要返回旧的 state。

*Reducer处理多个Action*
```js
import {
  ADD_TODO,
  TOGGLE_TODO,
  SET_VISIBILITY_FILTER,
  VisibilityFilters
} from './actions'

function todoApp(state = initialState, action) {
  switch (action.type) {  // 实用switch case来处理多个action，返回不同的state
    case SET_VISIBILITY_FILTER:
      return Object.assign({}, state, {
        visibilityFilter: action.filter
      })
    case ADD_TODO:
      return Object.assign({}, state, {
        todos: [
          ...state.todos,
          {
            text: action.text,
            completed: false
          }
        ]
      })
    default:
      return state
  }
}
```

combineReducers(reducers)
# 随着应用变得越来越复杂，可以考虑将 reducer 函数 拆分成多个单独的函数，拆分后的每个函数负责独立管理 state 的一部分。
combineReducers 辅助函数的作用是，把一个由多个不同 reducer 函数作为 value 的 object，合并成一个最终的 reducer 函数，然后就可以对这个 reducer 调用 createStore 方法。

```js
function todos(state = [], action) {
  switch (action.type) {
    case ADD_TODO:
      return [
        ...state,
        {
          text: action.text,
          completed: false
        }
      ]
    case TOGGLE_TODO:
      return state.map((todo, index) => {
        if (index === action.index) {
          return Object.assign({}, todo, {
            completed: !todo.completed
          })
        }
        return todo
      })
    default:
      return state
  }
}

function visibilityFilter(state = SHOW_ALL, action) {
  switch (action.type) {
    case SET_VISIBILITY_FILTER:
      return action.filter
    default:
      return state
  }
}

import { combineReducers } from 'redux'

const todoApp = combineReducers({
  visibilityFilter,
  todos
})

export default todoApp
```
======

4.Store
# Store 就是保存数据的地方，你可以把它看成一个容器。整个应用只能有一个 Store。
* Redux 提供createStore这个函数，用来生成 Store。
* Redux 应用只有一个单一的 store。当需要拆分数据处理逻辑时，你应该使用 reducer 组合 而不是创建多个 store。
```js
import { createStore } from 'redux'
import reducer from '../reducer'

const store = createStore(reducer)
```

# Store提供暴露出四个API方法:
* store.getState()： 获取应用当前State。
* store.subscribe()：添加一个变化监听器。
* store.dispatch()：分发 action。修改State。 
* store.replaceReducer()：替换 store 当前用来处理 state 的 reducer。

```js
import { createStore } from 'redux'
let { subscribe, dispatch, getState, replaceReducer} = createStore(reducer)
```
====== 

5.connect()
*UI组件特征：*
* 只负责 UI 的呈现，不带有任何业务逻辑
* 没有状态（即不使用this.state这个变量）
* 所有数据都由参数（this.props）提供
* 不使用任何 Redux 的 API

*容器组件特征：*
* 负责管理数据和业务逻辑，不负责 UI 的呈现
* 带有内部状态
* 使用 Redux 的 API

# React-Redux 提供connect方法，用于从 UI 组件生成容器组件。
```js
import { connect } from 'react-redux'
const VisibleTodoList = connect()(TodoList); // TodoList是用户定义的UI组件，VisibleTodoList是redux自动生成的容器组件
```
# 定义容器组件的业务逻辑需要两方面的信息
* 输入逻辑：外部的数据（即state对象）如何转换为 UI 组件的参数
* 输出逻辑：用户发出的动作如何变为 Action 对象，从 UI 组件传出去

**connect完整API**
```js
import { connect } from 'react-redux'

const VisibleTodoList = connect(
  mapStateToProps, // 负责输入逻辑，即将state映射到 UI 组件的参数（props）
  mapDispatchToProps // 负责输出逻辑，即将用户对 UI 组件的操作映射成 Action
)(TodoList) // TodoList是用户定义的UI组件
```

+ mapStateToProps是一个函数。它的作用就是像它的名字那样，建立一个从（外部的）state对象到（UI 组件的）props对象的映射关系。
- 作为函数，mapStateToProps执行后应该返回一个对象，里面的每一个键值对就是一个映射
```js
const mapStateToProps = (state) => {
  return {
    todos: getVisibleTodos(state.todos, state.visibilityFilter) //getVisibleTodos是自定义函数，从state算出todos的值
  }
}
// mapStateToProps是一个函数，它接受state作为参数，返回一个对象。这个对象有一个todos属性，代表 UI 组件的同名参数
```
# mapStateToProps会订阅 Store，每当state更新的时候，就会自动执行，重新计算 UI 组件的参数，从而触发 UI 组件的重新渲染

**mapStateToProps的第一个参数总是state对象，还可以使用第二个参数，代表容器组件的props对象**
```js
const mapStateToProps = (state, ownProps) => {
  return {
    active: ownProps.filter === state.visibilityFilter
  }
}
// 使用ownProps作为参数后，如果容器组件的参数发生变化，也会引发 UI 组件重新渲染。
```
# connect方法可以省略mapStateToProps参数，那样的话，UI 组件就不会订阅Store，就是说 Store 的更新不会引起 UI 组件的更新。

+ mapDispatchToProps是connect函数的第二个参数，用来建立 UI 组件的参数到store.dispatch方法的映射。也就是说，它定义了哪些用户的操作应该当作 Action，传给 Store。它可以是一个函数，也可以是一个对象。

* 如果mapDispatchToProps是一个函数，会得到dispatch和ownProps（容器组件的props对象）两个参数
```js
const mapDispatchToProps = (
  dispatch,
  ownProps
) => {
  return {
    onClick: () => {
      dispatch({
        type: 'SET_VISIBILITY_FILTER',
        filter: ownProps.filter
      });
    }
  };
}
// mapDispatchToProps作为函数，应该返回一个对象，该对象的每个键值对都是一个映射，定义了 UI 组件的参数怎样发出 Action
```

- 如果mapDispatchToProps是一个对象，它的每个键名也是对应 UI 组件的同名参数，键值应该是一个函数，会被当作 Action creator ，返回的 Action 会由 Redux 自动发出
```js
const mapDispatchToProps = {
  onClick: (filter) => {
    type: 'SET_VISIBILITY_FILTER',
    filter: filter
  };
}
```

======

6.Provider组件
# React-Redux 提供Provider组件，可以让connect方法生成的容器组件拿到state。
```js
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import todoApp from './reducers'
import App from './components/App' // react组件

let store = createStore(todoApp);

render(
  <Provider store={store}> //在根组件App外面包了一层Provider,App的所有子组件就默认都可以拿到state了。store 作为一个 prop 传给 Provider 组件
    <App />
  </Provider>,
  document.getElementById('root')
)
```
