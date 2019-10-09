import './NavHeader.scss';
import React from 'react';

/**
 * @constructor <NavHeader title={String} />
 * @description 头部导航栏
 */
class NavHeader extends React.Component{
    render(){
        return(
            <div className="nav">
                <div className="back-icon"></div>
                {/* 接收父组件传递过来的title */}
                <h4 className="title">{this.props.title}</h4>
            </div>
        )
    }
}

export default NavHeader;