import React from 'react'
import { StyleSheet, Platform, Image, Text, View } from 'react-native'
import { createStackNavigator, createAppContainer } from 'react-navigation'
// import the different screens
import LoadingScreen from './screens/LoadingScreen'
import SignUpScreen from './screens/SignUpScreen'
import LoginScreen from './screens/LoginScreen'
import MainScreen from './screens/MainScreen'
import YourRequestsScreen from './screens/YourRequestsScreen';
import CommunityScreen from './screens/CommunityScreen';
import HelpScreen from './screens/HelpScreen';
import MakeNewRequestScreen from './screens/MakeNewRequestScreen';
import ViewAllRequests from './screens/ViewAllRequests';
import RequestDetailsScreen from './screens/RequestDetailsScreen'
import ChatScreen from './screens/LiveChatScreen'
import { YellowBox } from 'react-native';
import _ from 'lodash';

YellowBox.ignoreWarnings(['Setting a timer']);
const _console = _.clone(console);
console.warn = message => {
  if (message.indexOf('Setting a timer') <= -1) {
    _console.warn(message);
  }
};

const App = createStackNavigator(
  {
    Loading: LoadingScreen,
    SignUp: SignUpScreen,
    Login: LoginScreen,
    Main: MainScreen,
    YourRequests: YourRequestsScreen,
    Community: CommunityScreen,
    Help: HelpScreen,
    MakeNewRequest: MakeNewRequestScreen,
    ViewAll: ViewAllRequests,
    RequestDetails: RequestDetailsScreen,
    Chat: ChatScreen
  },
  {
    initialRouteName: 'Loading',
    defaultNavigationOptions: {
      header:null
    }
  }
);

const navigator = createAppContainer(App)

export default navigator