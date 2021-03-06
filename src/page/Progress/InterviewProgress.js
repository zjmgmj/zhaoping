import React, {Component} from 'react';
import {Text, View} from 'react-native';
import Item from './item';
import {Longlist} from 'beeshell/dist/components/Longlist';

class InterviewProgress extends Component {
  constructor(props) {
    super(props);
    this.state = {
      total: 0,
      list: [],
      page: 1,
    };
  }
  UNSAFE_componentWillMount() {
    this.refresh();
  }
  refresh() {
    return global
      .httpGetPromise('positionrecord/list', {
        page: this.state.page,
        size: 10,
        recordStatus: 3,
        userId: this.props.currentUser.userId,
      })
      .then(res => {
        console.log('res', res);
        const page = this.state.page;
        let oldList = this.state.list;
        const resData = res.data;
        if (page > 1) {
          oldList.push(...resData.result);
        } else {
          oldList = resData.result;
        }
        this.setState({
          list: oldList,
          total: resData.total,
        });
      });
  }
  render() {
    const {total, list} = this.state;
    console.log('list', list);
    return (
      <View>
        <Longlist
          ref={longList => {
            this.longList = longList;
          }}
          total={total}
          data={list}
          renderItem={(item, idx) => {
            return (
              <Item
                navigation={this.props.navigation}
                getSalaryName={() => {
                  this.props.getSalaryName(item.id);
                }}
                refresh={() => {
                  this.refresh();
                }}
                item={item}
                key={idx}
              />
            );
          }}
          onEndReached={() => {
            const page = this.state.page + 1;
            this.setState({
              page: page,
            });
            console.log('onEndReached');
            return this.refresh();
          }}
          onRefresh={() => {
            console.log('onRefresh');
            this.setState({
              page: 1,
            });
            return this.refresh();
          }}
        />
      </View>
    );
  }
}
export default InterviewProgress;
