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
    // initialRouteName: 'Login',
  },
);

const StackRouteConfigs = createStackNavigator(
  {
    ReleaseDynamic: {
      screen: ReleaseDynamic,
      navigationOptions: {
        headerShown: false,
      },
    },
    Main: {
      screen: TabNavigator,
      navigationOptions: {
        headerShown: false,
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
