import React, {Component} from 'react';
import {Text, View, Image} from 'react-native';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import TabBar from '../../components/TabBar';
import {setStatusBar} from '../../components/setStatusBar';
import Header from '../../components/Header';
import PositionList from './PositionList';
import {baseStyle} from '../../components/baseStyle';

@setStatusBar({
  translucent: true,
  backgroundColor: 'transparent',
})
class ChallengePosition extends Component {
  render() {
    return (
      <View style={[{flex: 1, backgroundColor: '#fff'}]}>
        <Header
          title="推荐职位"
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
          <View tabLabel="猎头职位">
            <PositionList positionType={1} navigation={this.props.navigation} />
          </View>
          <View tabLabel="普通职位">
            <PositionList positionType={2} navigation={this.props.navigation} />
          </View>
        </ScrollableTabView>
      </View>
    );
  }
}

export default ChallengePosition;
