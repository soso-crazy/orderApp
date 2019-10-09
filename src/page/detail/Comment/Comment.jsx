import './Comment.scss';
import React from 'react';
import { connect } from 'react-redux';

import StarScore from 'component/StarScore/StarScore';
import CommentList from './CommentList/CommentList';

import { getListData } from '../actions/commentAction';

class Comment extends React.Component {
    constructor(props) {
        super(props);
        this.fetchData(); // 因为是异步请求数据，可以放在constructor里，同步的话放在ComponentDidMount里
    }

    /**
     * 发送action并请求数据
     */
    fetchData() {
        this.props.dispatch(getListData())
    }

    render() {
        let data = this.props.commentData;
        return (
            <div className="comment-inner">
                <div className="comment-score">
                    <div className="mail-score-content">
                        {/* js数字类型的toFixed方法：四舍五入1位小数 */}
                        <div className="mail-score">{data.comment_score ? data.comment_score.toFixed(1) : ''}</div>
                        <div className="mail-text">商家评价</div>
                    </div>
                    <div className="other-score-content">
                        <div className="taste-score">
                            <div className="taste-text">口味</div>
                            <div className="taste-star-wrap">
                                <StarScore score={data.food_score}></StarScore>
                            </div>
                            <div className="taste-score-text">{data.food_score ? data.food_score.toFixed(1) : ''}</div>
                        </div>
                        <div className="package-score">
                            <div className="package-text">包装</div>
                            <div className="package-star-wrap">
                                <StarScore store={data.pack_score}></StarScore>
                            </div>
                            <div className="package-score-text">{data.pack_score?data.pack_score.toFixed(1):''}</div>
                        </div>
                    </div>
                    <div className="send-score-content">
                        <div className="send-score">{data.delivery_score?data.delivery_score.toFixed(1):''}</div>
                        <div className="send-text">商家评价</div>
                    </div>
                </div>
                <CommentList />
            </div>
        )
    }
}

export default connect(
    state => ({
        commentData: state.commentReducer.commentData
    })
)(Comment);