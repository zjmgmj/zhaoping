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
import ReleaseDynamic from './ReleaseDynamic';

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
    // defaultNavigationOptions: ({ navigation }) => ({
    //   tabBarIcon: ({ focused, horizontal, tintColor }) => {
    //     const { routeName } = navigation.state;
    //     let iconName;
    //     if (routeName === 'Home') {
    //       iconName = 'home'
    //     } else if (routeName === 'Settings') {
    //       iconName = `gear`;
    //     }
    //     return <Icon name={iconName} size={25} color={tintColor} />;
    //   },
    // }),
    tabBarOptions: {
      activeTintColor: '#D9B06F',
      inactiveTintColor: '#333333',
      showIcon: true,
    },
    initialRouteName: 'Home',
    // initialRouteName: 'Login',
  },
);

const StackRouteConfigs = createStackNavigator(
  {
    ReleaseDynamic: {
      screen: ReleaseDynamic,
    },
    Main: {
      screen: TabNavigator,
      navigationOptions: {
        header: null,
      },
    },
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
    initialRouteName: 'Main',
    // initialRouteName: 'Login',
  },
);
const MainComponent = createAppContainer(StackRouteConfigs);

export default MainComponent;
