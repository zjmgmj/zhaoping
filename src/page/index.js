import React from 'react';
import {Image} from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import TabBarIcon from '../components/TabBarIcon';
import Home from './Home';
import Mine from './Mine';
import Dynamic from './Dynamic';
import Position from './Position';
import Login from './Login';
import ReleaseDynamic from './ReleaseDynamic';
import Info from './Info';
import Resume from './Resume';
import ResumeAdd from './Resume/add';
import ResumeInfo from './Resume/info';
import ResumeWorkExperience from './Resume/workExperience';
import ResumeProjectExperience from './Resume/projectExperience';
import ResumeEducationalExperience from './Resume/educationalExperience';
import ResumeJobStatus from './Resume/jobStatus';
import ResumePrivacySet from './Resume/privacySet';
import ChallengePosition from './Home/challengePosition';
import RecommendPosition from './Home/recommendPosition';
import PositionDetail from './Position/detail';

const TabNavigator = createBottomTabNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: () => ({
        tabBarLabel: '首页',
      }),
    },
    Position: {
      screen: Position,
      navigationOptions: () => ({
        tabBarLabel: '职位',
      }),
    },
    Dynamic: {
      screen: Dynamic,
      navigationOptions: () => ({
        tabBarLabel: '动态',
      }),
    },
    Info: {
      screen: Info,
      navigationOptions: () => ({
        tabBarLabel: '消息',
      }),
    },
    Mine: {
      screen: Mine,
      navigationOptions: ({navigation}) => ({
        tabBarLabel: '我的',
      }),
    },
  },
  {
    defaultNavigationOptions: ({navigation}) => {
      const {routeName} = navigation.state;
      return {
        tabBarIcon: ({focused}) => (
          <TabBarIcon focused={focused} routeName={routeName} />
        ),
      };
    },
    tabBarOptions: {
      activeTintColor: '#D9B06F',
      inactiveTintColor: '#333333',
      showIcon: true,
    },
    initialRouteName: 'Home',
  },
);

const StackRouteConfigs = createStackNavigator(
  {
    Main: TabNavigator,
    ReleaseDynamic,
    Resume,
    ResumeAdd,
    ResumeInfo,
    ResumeWorkExperience,
    ResumeProjectExperience,
    ResumeEducationalExperience,
    ResumeJobStatus,
    ResumePrivacySet,
    ChallengePosition,
    RecommendPosition,
    PositionDetail,
  },
  {
    defaultNavigationOptions: {
      headerShown: false,
    },
    initialRouteName: 'Main',
    // initialRouteName: 'ResumeJobStatus',
  },
);
const MainComponent = createAppContainer(StackRouteConfigs);

export default MainComponent;
