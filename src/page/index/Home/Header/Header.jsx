import React from 'react';
import './Header.scss';
import SearchBar from '../SearchBar/SearchBar';

/* 首页顶部Banner代码 */

class Header extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <div className="header">
                <SearchBar />
                {/* 图片要放到webpack-dev-server的浏览器内容文件夹dev下才可以用./路径引入 */}
                <img src="./img/banner.png" alt="" className="banner-img"/>
            </div>
        )
    }
}

export default Header;