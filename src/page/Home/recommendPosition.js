import React, {Component} from 'react';
import {Text, View, Image} from 'react-native';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import TabBar from '../../components/TabBar';
import {setStatusBar} from '../../components/setStatusBar';
import Header from '../../components/Header';
import PositionList from '../../components/PositionList';
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
          <View tabLabel="普通职位">
            <PositionList />
            {/* <Text>挑战职位</Text> */}
          </View>
          <View tabLabel="内推职位">
            <PositionList />
          </View>
        </ScrollableTabView>
      </View>
    );
  }
}

export default ChallengePosition;
