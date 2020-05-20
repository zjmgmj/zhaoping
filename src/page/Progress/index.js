import React, {Component} from 'react';
import {Text, View} from 'react-native';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import {setStatusBar} from '../../components/setStatusBar';
import TabBar from '../../components/TabBar';
import Header from '../../components/Header';
import ResumeSubmit from './ResumeSubmit';
import InviteInterview from './InviteInterview';
import {baseStyle} from '../../components/baseStyle';
import InterviewProgress from './InterviewProgress';
import OnboardingSituation from './OnboardingSituation';

@setStatusBar({
  translucent: true,
  backgroundColor: 'transparent',
})
class Progress extends Component {
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
  getSalaryName(id) {
    const resSalary = this.state.salaryList.find(item => {
      return item.id === id;
    });
    if (resSalary) {
      return resSalary.dvalue;
    } else {
      return '';
    }
  }
  render() {
    const currentUser = this.state.currentUser;
    return (
      <View style={[{flex: 1, backgroundColor: '#fff'}]}>
        <Header
          title="职位进展"
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
            <View tabLabel="已投简历">
              <ResumeSubmit
                currentUser={currentUser}
                navigation={this.props.navigation}
              />
            </View>
            <View tabLabel="邀请面试">
              <InviteInterview
                currentUser={currentUser}
                navigation={this.props.navigation}
              />
            </View>
            <View tabLabel="面试进度">
              <InterviewProgress
                navigation={this.props.navigation}
                currentUser={currentUser}
              />
            </View>
            <View tabLabel="入职情况">
              <OnboardingSituation
                navigation={this.props.navigation}
                currentUser={currentUser}
              />
              {/* <Text>入职情况</Text> */}
            </View>
          </ScrollableTabView>
        ) : null}
      </View>
    );
  }
}

export default Progress;
