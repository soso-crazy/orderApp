import React from 'react';
import  ReactDom from 'react-dom';

import {Provider} from 'react-redux';

import { ConnectedRouter } from 'connected-react-router';

import {configureStore,history} from './store';
import Container from './Main/Container';

// 生成store
const store = configureStore();

ReactDom.render(
    // 在根组件Container外面包了一层Provider，Container的所有子组件就默认都可以拿到state了。
    <Provider store={store}>
        <ConnectedRouter history={history}> { /* place ConnectedRouter under Provider */ }
            <Container />
        </ConnectedRouter>
    </Provider>,
    document.getElementById('root')
);