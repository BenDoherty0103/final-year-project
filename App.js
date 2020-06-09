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
import NewCommodityScreen from './screens/NewCommodityScreen';
import NewExperienceScreen from './screens/NewExperienceScreen';
import NewRideshareScreen from './screens/NewRideshareScreen';
import ViewAllRequests from './screens/ViewAllRequests';
import RequestDetailsScreen from './screens/RequestDetailsScreen'
import YourProfileScreen from './screens/YourProfileScreen'
import YourDetailsScreen from './screens/YourDetailsScreen'
import ResponseScreen from './screens/ResponseScreen'
import RequestResponsesScreen from './screens/RequestResponsesScreen'
import ResponseDetailsScreen from './screens/ResponseDetailsScreen'
import EditScreen from './screens/EditRequestScreen'
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
    NewCommodity: NewCommodityScreen,
    NewExperience: NewExperienceScreen,
    NewRideshare: NewRideshareScreen,
    ViewAll: ViewAllRequests,
    RequestDetails: RequestDetailsScreen,
    YourProfile: YourProfileScreen,
    YourDetails: YourDetailsScreen,
    Response: ResponseScreen,
    Edit: EditScreen,
    Responses: RequestResponsesScreen,
    ResponseDetails: ResponseDetailsScreen
  },
  {
    initialRouteName: 'Loading'
  }
);

const navigator = createAppContainer(App)

export default navigator
