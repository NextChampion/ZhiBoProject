import { createStackNavigator } from 'react-navigation';

import Tab from './TabNavigator';
import NavigationOptionsWithHeader from './NavigationOptionsWithHeader';

export default createStackNavigator(
  {
    main: Tab,
  },
  NavigationOptionsWithHeader,
);
