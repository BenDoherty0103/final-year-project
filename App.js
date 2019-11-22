import React from 'react'
import { StyleSheet, Platform, Image, Text, View } from 'react-native'
import { createStackNavigator, createAppContainer } from 'react-navigation'
// import the different screens
import LoadingScreen from './screens/LoadingScreen.js'
import SignUpScreen from './screens/SignUpScreen'
import LoginScreen from './screens/LoginScreen'
import MainScreen from './screens/MainScreen'
import YourRequestsScreen from './screens/YourRequestsScreen';
import CommunityScreen from './screens/CommunityScreen';
import HelpScreen from './screens/HelpScreen';
import MakeNewRequestScreen from './screens/MakeNewRequestScreen';
import ViewAllRequests from './screens/ViewAllRequests';
// create our app's navigation stack

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