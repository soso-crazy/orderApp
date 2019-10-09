import React from 'react';
import Header from './Header/Header';
import Category from './Category/Category';
import ContentList from './ContentList/ContentList';

/* 首页tab代码 */

class Home extends React.Component{
    render(){
        return (
            <div>
                <Header />
                <Category />
                <ContentList />
            </div>
        );
    }
}

export default Home;