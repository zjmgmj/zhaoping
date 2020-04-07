import React, {Component} from 'react';
import {Text, View} from 'react-native';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import {setStatusBar} from '../../components/setStatusBar';
import TabBar from '../../components/TabBar';
import Header from '../../components/Header';
import News from './News';

@setStatusBar({
  translucent: true,
  backgroundColor: 'transparent',
})
class Info extends Component {
  render() {
    return (
      <View style={[{flex: 1, backgroundColor: '#fff'}]}>
        <Header title="消息" fullScreen />
        <ScrollableTabView
          renderTabBar={() => <TabBar />}
          tabBarBackgroundColor="#3671ff"
          tabBarActiveTextColor="#fff"
          tabBarInactiveTextColor="#fff">
          <View tabLabel="消息">
            <News />
          </View>
          <View tabLabel="社群消息">
            <Text>社群消息</Text>
          </View>
          <View tabLabel="系统消息">
            <Text>系统消息</Text>
          </View>
        </ScrollableTabView>
      </View>
    );
  }
}

export default Info;
