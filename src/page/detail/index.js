import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';

import { ConnectedRouter } from 'connected-react-router';
import { history, configureStore } from './store';

import Container from './Main/Container';

// 生成store
const store = configureStore();

ReactDom.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <Container></Container>
        </ConnectedRouter>
    </Provider>,
    document.getElementById('root')
);