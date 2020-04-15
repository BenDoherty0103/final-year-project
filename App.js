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
import YourProfileScreen from './screens/YourProfileScreen'
import YourDetailsScreen from './screens/YourDetailsScreen'
import YourResponsesScreen from './screens/YourResponsesScreen'
import ResponseScreen from './screens/ResponseScreen'
import EditScreen from './screens/EditRequestScreen'
import RequestResponsesScreen from './screens/RequestResponsesScreen'
import { YellowBox } from 'react-native';
import _ from 'lodash';

YellowBox.ignoreWarnings(['Setting a timer', 'crypto not usable', 'Each child in a list']);
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
    YourProfile: YourProfileScreen,
    YourDetails: YourDetailsScreen,
    YourResponses: YourResponsesScreen,
    Response: ResponseScreen,
    Edit: EditScreen,
    Responses: RequestResponsesScreen
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
