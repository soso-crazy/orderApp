import './ContentList.scss';

import React from 'react';

import getListData from '../actions/contentListAction';

import { connect } from 'react-redux';

import ListItem from 'component/ListItem/ListItem';
import ScrollView from 'component/ScrollView/ScrollView';


class ContentList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isEnd: false
        }

        this.fetchData();
    }

    fetchData() {
        this.props.dispatch(getListData({}));
    }

    onLoadPage() {
        if (this.props.page <= 3) {
            this.fetchData();
        }
    }

    renderItems() {
        let list = this.props.list;
        return list.map((item, index) => {
            return <ListItem key={index} itemData={item}></ListItem>
        })
    }

    render() {
        return (
            <div className="list-content">
                <ScrollView loadCallback={this.onLoadPage.bind(this)} isEnd={this.props.isEnd}>
                    {this.renderItems()}
                </ScrollView>
            </div>
        )
    }
}

export default connect(
    state => ({
        list: state.contentListReducer.list,
        page: state.contentListReducer.page,
        isEnd: state.contentListReducer.isEnd
    })
)(ContentList);