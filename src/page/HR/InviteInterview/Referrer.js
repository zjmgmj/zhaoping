import React, {Component} from 'react';
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {Longlist} from 'beeshell/dist/components/Longlist';
import {baseStyle} from '../../../components/baseStyle';
import ItemComp from './ItemComp';

class Referrer extends Component {
  constructor(props) {
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
        recordStatus: 2,
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
    return (
      <Longlist
        ref={longList => {
          this.longList = longList;
        }}
        total={total}
        data={list}
        renderItem={({item, index}) => {
          return (
            <View style={baseStyle.borderBottom} key={item.id}>
              <ItemComp
                updatePositionRecord={userId => {
                  this.updatePositionRecord(userId, item.positionRecordId);
                }}
                refuse={() => {
                  this.props.navigation.navigate('Refuse', {
                    userId: item.userId,
                    positionId: this.state.positionId,
                  });
                }}
                item={item}
                navigation={this.props.navigation}
              />
            </View>
          );
        }}
        onEndReached={() => {
          const page = this.state.page + 1;
          this.setState({
            page: page,
          });
          return this.refresh();
        }}
        onRefresh={() => {
          this.setState({
            page: 1,
          });
          return this.refresh();
        }}
      />
    );
  }
}
export default Referrer;
