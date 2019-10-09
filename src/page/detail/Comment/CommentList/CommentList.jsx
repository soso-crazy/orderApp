import './CommentList.scss';

import React from 'react';

import { connect } from 'react-redux';

import ScrollView from 'component/ScrollView/ScrollView.jsx';
import CommentItem from './CommentItem/CommentItem';

import { getListData } from '../../actions/commentAction';

class CommentList extends React.Component {
    renderList(){
        let list = this.props.commentList;
        return list.map((item,index) => {
            return <CommentItem key={index} data={item}></CommentItem>
        })
    }

    onLoadPage(){
        this.props.dispatch(getListData())
    }

    render() {
        return (
            <div className="comment-list">
                <ScrollView loadCallback={this.onLoadPage.bind(this)} isEnd={0}>
                    {this.renderList()}
                </ScrollView>
            </div>
        )
    }
}

export default connect(
    state => ({
        commentList: state.commentReducer.commentList
    })
)(CommentList);