import React, {Component} from 'react';
import {Text, View} from 'react-native';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import TabBar from '../../components/TabBar';
import News from './News';

export default class Dynamic extends Component {
  render() {
    return (
      <ScrollableTabView
        renderTabBar={() => <TabBar />}
        tabBarBackgroundColor="#3671ff"
        tabBarActiveTextColor="#fff"
        tabBarInactiveTextColor="#fff">
        <View tabLabel="最新动态">
          <News
            openRelease={() => {
              debugger;
              this.props.navigation.navigate('ReleaseDynamic');
            }}
          />
        </View>
        <View tabLabel="热门社群">
          <Text>热门社群</Text>
        </View>
      </ScrollableTabView>
    );
  }
}
