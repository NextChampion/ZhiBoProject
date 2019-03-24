import { createSwitchNavigator, createAppContainer } from 'react-navigation';

import MainNavigator from './MainNavigator';
import SplashScreen from '../screens/SplashScreen';

const RootNavigator = createSwitchNavigator({
  splash: SplashScreen,
  main: MainNavigator,
});

export default createAppContainer(RootNavigator);
