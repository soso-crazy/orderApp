import React from 'react';
import './StarScore.scss';

class StarScore extends React.Component{

    /* 渲染五颗星得分方法 */
    renderScore() {
        let wm_poi_score = this.props.score || ''; // 接收父组件传递过来的数据
        let score = wm_poi_score.toString(); // 转成字符串
        let scoreArray = score.split('.'); // 字符串结果以.号分割，例如4.2的分数分割为[4,2]
        let fullStar = parseInt(scoreArray[0]); // 满星个数
        let halfStar = parseInt(scoreArray[1]) >= 5 ? 1 : 0; // 半个星个数
        let nullStar = 5 - fullStar - halfStar; // 0星个数

        let starjsx = [];
        // 渲染满星的jsx
        for (let i = 0; i < fullStar; i++) {
            starjsx.push(<div key={i + 'full'} className="star fullstar"></div>)
        }
        // 渲染半星的jsx
        if (halfStar) {
            for (let j = 0; j < halfStar; j++) {
                starjsx.push(<div key={j + 'half'} className="star halfstar"></div>)
            }
        }
        // 渲染0星jsx
        if (nullStar) {
            for (let k = 0; k < nullStar; k++) {
                starjsx.push(<div key={k + 'null'} className="star nullstar"></div>)
            }
        }
        return starjsx;
    }

    render(){
        return <div className="star-score">
            {this.renderScore()}
        </div>
    }
}

export default StarScore;