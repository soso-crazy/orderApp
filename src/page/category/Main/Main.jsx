import 'component/common.scss';
import React from 'react';
import NavHeader from 'component/NavHeader/NavHeader';
import Header from '../Header/Header';
import ContentList from '../ContentList/ContentList';
import { connect } from 'react-redux';

class Main extends React.Component {
    render() {
        return (
            <div className="category">
                {/* 传递数据给子组件 */}
                <NavHeader title="分类" />
                <Header />
                <ContentList />
            </div>
        )
    }
}

export default connect(
    // state=>({

    // })
)(Main);