import { createStackNavigator } from 'react-navigation';

import Tab from './TabNavigator';
import NavigationOptionsWithHeader from './NavigationOptionsWithHeader';
import LiveRoomScreen from '../screens/TabHomeScreens/LiveRoomScreen';

export default createStackNavigator(
    {
        main: Tab,
        LiveRoom: { screen: LiveRoomScreen },
    },
    NavigationOptionsWithHeader,
);
