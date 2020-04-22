import React, {Component} from 'react';
import {Text, View} from 'react-native';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import TabBar from '../../components/TabBar';
import News from './News';
import Community from './Community';
import {setStatusBar} from '../../components/setStatusBar';
import Header from '../../components/Header';
@setStatusBar({
  translucent: true,
  backgroundColor: 'transparent',
})
class Dynamic extends Component {
  render() {
    return (
      <View style={[{flex: 1, backgroundColor: '#fff'}]}>
        <Header isHeader={false} />
        <ScrollableTabView
          renderTabBar={() => <TabBar />}
          tabBarBackgroundColor="#3671ff"
          tabBarActiveTextColor="#fff"
          tabBarInactiveTextColor="#fff">
          <View tabLabel="最新动态">
            <News navigation={this.props.navigation} />
          </View>
          <View tabLabel="热门社群">
            {/* <Text>热门社群</Text> */}
            <Community />
          </View>
        </ScrollableTabView>
      </View>
    );
  }
}

export default Dynamic;
