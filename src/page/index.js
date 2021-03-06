import React from 'react';
import localStorage from '../global/storage';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';
// import CardStackStyleInterpolator from 'react-navigation/src/views/CardStack/CardStackStyleInterpolator';
import TabBarIcon from '../components/TabBarIcon';
import Home from './Home';
import Mine from './Mine';
import Dynamic from './Dynamic';
import Position from './Position';
import Login from './Login';
import Reg from './Reg';
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
import PositionChooseBg from './Position/chooseBg';
import InfoChat from './Info/chat';
import PositionFilter from './Position/filter';
import Progress from './Progress';
import FollowPosition from './FollowPosition';
import Followig from './Followig';
import PersonalInfo from './PersonalInfo';
import Community from './Community';
import HrHome from './HR/Home';
import PostPosition from './HR/PostPosition';
import PositionCategory from './HR/PositionCategory';
import PositionDes from './HR/PositionDes';
import PositionBenefits from './HR/PositionBenefits';
import PositionName from './HR/PositionName';
import RecruitmentManagement from './HR/RecruitmentManagement';
import RecruitmentResume from './HR/RecruitmentResume';
import ResumeList from './HR/ResumeList';
import CompanyList from './HR/CompanyList';
import AddCompany from './HR/AddCompany';
import IndustryNews from './HR/IndustryNews';
// import IndustryRelease from './HR/IndustryNews/release';
import AddressBook from './HR/AddressBook';
import PersonInfo from './HR/PersonInfo';
import Evaluation from './Resume/evaluation';
import Rreview from './Resume/rreview';
import PostResumeList from './PostResumeList';
import Refuse from './HR/ResumeList/Refuse';
import InviteInterview from './HR/InviteInterview';
import Feedback from './HR/ResumeList/Feedback';
import SkillTags from './HR/SkillTags';
import Housekeeper from './HR/Housekeeper';
import InviteSet from './HR/ResumeList/Invite';
import OnboardingSet from './HR/ResumeList/OnboardingSet';
import InterviewList from './Position/InterviewList';
import CompanyAddress from './HR/AddCompany/companyAddress';
import EntryInfor from './HR/Housekeeper/EntryInfor';
import SkillDesc from './HR/Housekeeper/SkillDesc';
import ProfessionalAdvisers from './HR/Housekeeper/ProfessionalAdvisers';
import Applydesc from './HR/Housekeeper/applicationReason';
import LoginHome from './Login/login';
import ResumeDelivered from './HR/ResumeDelivered';
import CompanyInfo from './companyInfo';
import ResumeVideo from './Resume/ResumeVideo.js';
import SetOnboardTime from './HR/SetOnboardTime';
import NewsDetail from './HR/IndustryNews/newDetail';

const personNavigator = {
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
      // tabBarOnPress: obj => {
      //   console.log('tabBarOnPress', obj);
      //   // 任务数据redux修改，点击每次查询
      //   if (obj.scene.route.params && obj.scene.route.params.queryList) {
      //     obj.scene.route.params.queryList(); //查询数据
      //   }
      //   obj.jumpToIndex(obj.scene.index); //跳转B页面
      // },
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
};
const HrNavigator = {
  Home: {
    screen: HrHome,
    navigationOptions: () => ({
      tabBarLabel: '首页',
    }),
  },
  // RecruitmentManagement: {
  //   screen: RecruitmentManagement,
  //   navigationOptions: () => ({
  //     tabBarLabel: '招聘管理',
  //   }),
  // },
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
  // AddressBook: {
  //   screen: AddressBook,
  //   navigationOptions: () => ({
  //     tabBarLabel: '通讯录',
  //   }),
  // },
  Mine: {
    screen: Mine,
    navigationOptions: ({navigation}) => ({
      tabBarLabel: '我的',
    }),
  },
};
const TabNavigatorDefault = {
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
};
const personTabNavigator = createBottomTabNavigator(
  personNavigator,
  TabNavigatorDefault,
);
const HrTabNavigator = createBottomTabNavigator(
  HrNavigator,
  TabNavigatorDefault,
);

// const TransitionConfiguration = () => ({
//   screenInterpolator: sceneProps => {
//     const {scene} = sceneProps;
//     const {route} = scene;
//     const params = route.params || {};
//     const transition = params.transition || 'forHorizontal';
//     return CardStackStyleInterpolator[transition](sceneProps);
//   },
// });
const routes = {
  Main: personTabNavigator,
  HrMain: HrTabNavigator,
  RecruitmentManagement,
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
  PositionChooseBg,
  InfoChat,
  PositionFilter,
  Progress,
  FollowPosition,
  Followig,
  PersonalInfo,
  Community,
  Login,
  Reg,
  PostPosition,
  PositionCategory,
  PositionDes,
  PositionBenefits,
  PositionName,
  RecruitmentResume,
  ResumeList,
  CompanyList,
  AddCompany,
  IndustryNews,
  // IndustryRelease,
  PersonInfo,
  Dynamic,
  Evaluation,
  Rreview,
  PostResumeList,
  Refuse,
  InviteInterview,
  Feedback,
  SkillTags,
  Housekeeper,
  InviteSet,
  OnboardingSet,
  InterviewList,
  CompanyAddress,
  EntryInfor,
  SkillDesc,
  ProfessionalAdvisers,
  Applydesc,
  LoginHome,
  ResumeDelivered,
  CompanyInfo,
  ResumeVideo,
  SetOnboardTime,
  NewsDetail,
};
const StackRouteConfigs = createStackNavigator(routes, {
  defaultNavigationOptions: {
    headerShown: false,
  },
  initialRouteName: 'LoginHome',
});
// const MainStackNavigator = createStackNavigator(routes, {
//   defaultNavigationOptions: {
//     headerShown: false,
//   },
//   initialRouteName: 'Main',
// });

const MainComponent = createAppContainer(StackRouteConfigs);

// global.localStorage
//   .get({key: 'currentUser'})
//   .then(res => {
//     console.log(res);
//     MainComponent = createAppContainer(MainStackNavigator);
//   })
//   .catch(value => {
//     MainComponent = createAppContainer(StackRouteConfigs);
//   });
export default MainComponent;
