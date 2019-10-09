import React from 'react';
import ReactDom from 'react-dom';

// redux的API
import {Provider} from 'react-redux';

// 引入创建的store
import store from './store';

// 引入所有的组件
import Container from './Main/Container';

ReactDom.render(
    <Provider store={store}>
        <Container />
    </Provider>,
    document.getElementById('root')
);
