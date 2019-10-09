import React from 'react';
import './Loading.scss';

/* Loading组件 */

class Loading extends React.Component {

    render() {
        let str = '加载中';
        if (this.props.isEnd) { // 父组件传递过来的isEnd
            str = '加载完成'
        }
        return <div className="loading">{str}</div>
    }
}
export default Loading;
