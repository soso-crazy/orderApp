import './CommentItem.scss';

import React from 'react';

import { connect } from 'react-redux';

// 引入默认用户头像图片
import defaultUserAvatar from './img/avatar.jpg';

import StarScore from 'component/StarScore/StarScore';
/**
 * 评论单页组件
 * @description <CommentItem />
 */
class CommentList extends React.Component {
    /**
     * 转换数据的时间格式
     */
    formatTime(time) {
        // new Date( year, month, date, hrs, min, sec)  按给定的参数创建一日期对象  
        let date = new Date(Number(time + '000')); // 000代表hrs,min,sec

        return date.getFullYear() + '.' + (date.getMonth() + 1) + '.' + date.getDate();
    }


    /**
     * 渲染用户头像
     */
    renderImgs(item) {
        let imgs = item.comment_pics || [];
        if (imgs.length) {
            return (
                <div className="img-content clearfix">
                    {imgs.map((item, index) => {
                        let src = item.url;
                        let style = {
                            backgroundImage: 'url(' + src + ')'
                        }
                        return <div key={index} className={'img-item'} style={style}></div>
                    })}
                </div>
            )
        } else {
            return null;
        }
    }

    renderTags(label) {
        return label.map((item) => {
            return item.content + '，'
        });
    }

    render() {
        let item = this.props.data; // 接收父组件传递的数据
        return (
            <div className="comment-item">
                <div className="comment-time">{this.formatTime(item.comment_time)}</div>
                {item.user_pic_url ? <img className="avatar" src={item.user_pic_url} /> : <img className="avatar" src={defaultUserAvatar} />}
                <div className="item-right">
                    <p className="nickname">{item.user_name}</p>
                    <div className="star-and-time">
                        <div className="star-content">
                            <StarScore score={item.order_comment_score} />
                        </div>
                        <div className="send-time">{item.ship_time + '分钟送达'}</div>
                    </div>
                    <div className="comment-text">{item.comment}</div>
                    {this.renderImgs(item)}
                    {item.praise_food_tip ? <div className="like-info">{item.praise_food_tip}</div> : null}
                    {item.comment_labels.length ? <div className="tag-info">{this.renderTags(item.comment_labels)}</div> : null}
                </div>
            </div>
        )
    }
}

export default connect()(CommentList);