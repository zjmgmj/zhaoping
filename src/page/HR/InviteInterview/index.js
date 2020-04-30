import React, {Component} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import {setStatusBar} from '../../../components/setStatusBar';
import TabBar from '../../../components/TabBar';
import Header from '../../../components/Header';
import {baseStyle} from '../../../components/baseStyle';
import Referrer from './Referrer';

@setStatusBar({
  translucent: true,
  backgroundColor: 'transparent',
})
class InviteInterview extends Component {
  constructor() {
    super();
    this.state = {
      currentUser: null,
    };
  }
  UNSAFE_componentWillMount() {
    global.localStorage.get({key: 'currentUser'}).then(res => {
      console.log(res);
      this.setState({
        currentUser: res,
      });
    });
  }
  render() {
    const currentUser = this.state.currentUser;
    return (
      <View style={[{flex: 1, backgroundColor: '#FBFBFB'}]}>
        <Header
          title="邀请面试"
          onPressBack={() => {
            this.props.navigation.goBack();
          }}
          fullScreen
          isBorder={false}
        />
        {currentUser ? (
          <ScrollableTabView
            renderTabBar={() => <TabBar />}
            tabBarBackgroundColor="#3671ff"
            tabBarActiveTextColor="#fff"
            tabBarInactiveTextColor="#fff"
            style={baseStyle.bgWhite}>
            <View tabLabel="推荐者">
              <Referrer currentUser={this.state.currentUser} />
            </View>
            <View tabLabel="HR">
              <Text>入职情况</Text>
            </View>
          </ScrollableTabView>
        ) : null}
      </View>
    );
  }
}

export default InviteInterview;

const sty = StyleSheet.create({
  author: {
    width: 47,
    height: 47,
  },
  buttonSty: {
    borderColor: '#D9B06F',
    borderWidth: 0.5,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 5,
    paddingBottom: 5,
    marginLeft: 10,
    marginBottom: 10,
  },
});
