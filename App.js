import { createStackNavigator, createAppContainer } from 'react-navigation';
import HomeScreen from './src/screens/HomeScreen';
import RequestScreen from './src/screens/RequestScreen';
import CommunityScreen from './src/screens/CommunityScreen';
import HelpScreen from './src/screens/HelpScreen';

const navigator = createStackNavigator(
  {
    Home: HomeScreen,
    Request: RequestScreen,
    Community: CommunityScreen,
    Help: HelpScreen
  },
  {
    initialRouteName: 'Home',
    defaultNavigationOptions: {
      header:null
    }
  }
);

export default createAppContainer(navigator);
