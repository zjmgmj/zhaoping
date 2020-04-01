import React from 'react';
import {Image} from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';

import Home from './Home';
import Mine from './Mine';
import Dynamic from './Dynamic';
import Position from './Position';
import Login from './Login';

const StackRouteConfigs = createStackNavigator(
  {
    Login: {
      screen: Login,
    },
    Home: {
      screen: Home,
    },
    Position: {
      screen: Position,
    },
    Dynamic: {
      screen: Dynamic,
    },
    Mine: {
      screen: Mine,
    },
  },
  {
    initialRouteName: 'Home',
    // initialRouteName: 'Login',
  },
);

const TabNavigator = createBottomTabNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: ({navigation}) => ({
        tabBarLabel: '首页',
        tabBarIcon: focused => {
          console.log('navigation', navigation);
          console.log('focused', focused);
          const imgPath = focused
            ? require('../images/home_active_icon.png')
            : require('../images/home_icon.png');
          return <Image source={imgPath} />;
        },
      }),
    },
    Position: {
      screen: Position,
      navigationOptions: ({navigation}) => ({
        tabBarLabel: '职位',
        tabBarIcon: focused => {
          const imgPath = focused
            ? require('../images/position_active_icon.png')
            : require('../images/position_icon.png');
          return <Image source={imgPath} />;
        },
      }),
    },
    Dynamic: {
      screen: Dynamic,
      navigationOptions: ({navigation}) => ({
        tabBarLabel: '动态',
        tabBarIcon: focused => {
          const imgPath = focused
            ? require('../images/dynamic_active_icon.png')
            : require('../images/dynamic_icon.png');
          return <Image source={imgPath} />;
        },
      }),
    },
    Mine: {
      screen: Mine,
      navigationOptions: ({navigation}) => ({
        tabBarLabel: '我的',
        tabBarIcon: focused => {
          // const {routeName} = navigation.state;
          const imgPath = focused
            ? require('../images/mine_active_icon.png')
            : require('../images/mine_icon.png');
          return <Image source={imgPath} />;
        },
      }),
    },
  },
  {
    tabBarOptions: {
      activeTintColor: '#D9B06F',
      inactiveTintColor: '#333333',
      showIcon: true,
    },
    initialRouteName: 'Home',
    // initialRouteName: 'Login',
  },
);

const MainComponent = createAppContainer(TabNavigator, StackRouteConfigs);

export default MainComponent;
