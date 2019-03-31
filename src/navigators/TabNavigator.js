import React from 'react';
import { createBottomTabNavigator } from 'react-navigation';
import { Image } from 'react-native';
import TabHomeScreen from '../screens/TabHomeScreens/TabHomeScreen';
import TabMatchScreen from '../screens/TabMatchScreens/TabMatchScreen';
import TabVideoScreen from '../screens/TabVideoScreens/TabVideoScreen';
import TabMineScreen from '../screens/TabMineScreens/TabMineScreen';
import UI from '../UI';

const TabNavigator = createBottomTabNavigator(
    {
        Home: TabHomeScreen,
        Match: TabMatchScreen,
        Video: TabVideoScreen,
        Mine: TabMineScreen,
    },
    {
        defaultNavigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ focused, horizontal, tintColor }) => {
                const { routeName } = navigation.state;
                let source;
                if (routeName === 'Mine') {
                    if (focused) {
                        source = require('./tabImages/tab_mine_selected.png');
                    } else {
                        source = require('./tabImages/tab_mine.png');
                    }
                }
                if (routeName === 'Match') {
                    if (focused) {
                        source = require('./tabImages/tab_match_selected.png');
                    } else {
                        source = require('./tabImages/tab_match.png');
                    }
                }
                if (routeName === 'Video') {
                    if (focused) {
                        source = require('./tabImages/tab_video_selected.png');
                    } else {
                        source = require('./tabImages/tab_video.png');
                    }
                }
                if (routeName === 'Home') {
                    if (focused) {
                        source = require('./tabImages/tab_home_selected.png');
                    } else {
                        source = require('./tabImages/tab_home.png');
                    }
                }
                return (
                    <Image source={source} style={{ width: 26, height: 26 }} />
                );
            },
        }),
        tabBarOptions: {
            activeTintColor: UI.color.primary1,
            inactiveTintColor: UI.color.unselected,
        },
    },
);

TabNavigator.navigationOptions = ({ navigation }) => {
    const { routeName } = navigation.state.routes[navigation.state.index];
    const headerTitle = routeName;
    return { headerTitle };
};

export default TabNavigator;
