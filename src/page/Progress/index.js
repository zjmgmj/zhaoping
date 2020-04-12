import React, {Component} from 'react';
import {Text, View} from 'react-native';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import {setStatusBar} from '../../components/setStatusBar';
import TabBar from '../../components/TabBar';
import Header from '../../components/Header';
import Item from './item';
import {baseStyle} from '../../components/baseStyle';

@setStatusBar({
  translucent: true,
  backgroundColor: 'transparent',
})
class Progress extends Component {
  render() {
    const list = [1, 2, 3, 4];
    return (
      <View style={[{flex: 1, backgroundColor: '#FBFBFB'}]}>
        <Header
          title="职位进展"
          onPressBack={() => {
            this.props.navigation.goBack();
          }}
          fullScreen
          isBorder={false}
        />
        <ScrollableTabView
          renderTabBar={() => <TabBar />}
          tabBarBackgroundColor="#3671ff"
          tabBarActiveTextColor="#fff"
          tabBarInactiveTextColor="#fff">
          <View tabLabel="已投简历">
            {list.map((item, index) => {
              return (
                <View
                  key={index}
                  style={{marginBottom: 10, backgroundColor: '#fff'}}>
                  <Item />
                </View>
              );
            })}
          </View>
          <View tabLabel="邀请面试">
            <Text>邀请面试</Text>
          </View>
          <View tabLabel="面试进度">
            <Text>面试进度</Text>
          </View>
          <View tabLabel="待入职">
            <Text>待入职</Text>
          </View>
        </ScrollableTabView>
      </View>
    );
  }
}

export default Progress;
