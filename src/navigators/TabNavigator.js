import React from 'react';
import { createBottomTabNavigator } from 'react-navigation';
import { Image } from 'react-native';
import TabHomeScreen from '../screens/TabHomeScreens/TabHomeScreen';
import TabMatchScreen from '../screens/TabMatchScreens/TabMatchScreen';
import TabVideoScreen from '../screens/TabVideoScreens/TabVideoScreen';
import TabMineScreen from '../screens/TabMineScreens/TabMineScreen';
import UI from '../UI';

const tabMineSelected = require('./tabImages/tab_mine_selected.png');
const tabMine = require('./tabImages/tab_mine.png');
const tabMatchSelected = require('./tabImages/tab_match_selected.png');
const tabMatch = require('./tabImages/tab_match.png');
const tabVideoSelected = require('./tabImages/tab_video_selected.png');
const tabVideo = require('./tabImages/tab_video.png');
const tabHomeSelected = require('./tabImages/tab_home_selected.png');
const tabHome = require('./tabImages/tab_home.png');

const TabNavigator = createBottomTabNavigator(
    {
        Home: TabHomeScreen,
        Match: TabMatchScreen,
        Video: TabVideoScreen,
        Mine: TabMineScreen,
    },
    {
        defaultNavigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ focused }) => {
                const { routeName } = navigation.state;
                let source;
                if (routeName === 'Mine') {
                    if (focused) {
                        source = tabMineSelected;
                    } else {
                        source = tabMine;
                    }
                }
                if (routeName === 'Match') {
                    if (focused) {
                        source = tabMatchSelected;
                    } else {
                        source = tabMatch;
                    }
                }
                if (routeName === 'Video') {
                    if (focused) {
                        source = tabVideoSelected;
                    } else {
                        source = tabVideo;
                    }
                }
                if (routeName === 'Home') {
                    if (focused) {
                        source = tabHomeSelected;
                    } else {
                        source = tabHome;
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
