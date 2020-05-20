import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import routes from './routes';

// const currentUser = localStorage.getItem('currentUser');
const StackRouteConfigs = createStackNavigator(routes, {
  defaultNavigationOptions: {
    headerShown: false,
  },
  initialRouteName: 'LoginHome',
});

const LoginComponent = createAppContainer(StackRouteConfigs);

// const currentUser = localStorage.getItem('currentUser');
// console.log('currentUser', currentUser);
// if (currentUser.isLogin) {
//   MainComponent = createAppContainer(MainStackNavigator);
// } else {
//   MainComponent = createAppContainer(StackRouteConfigs);
// }

// localStorage
//   .get({key: 'currentUser'})
//   .then(res => {
//     console.log(res);
//   })
//   .catch(err => {
//     // export default MainComponent;
//     console.log(err);
//   });
// if (!MainComponent) {
//   return false;
// }
export default LoginComponent;

// export default MainComponent;
