import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import PropTypes from 'prop-types';
import ScrollTabView, {
    ScrollableTabBar,
} from 'react-native-scrollable-tab-view';
// import { connect } from '../../redux';
import UI from '../../../UI';
import LocalData from '../LocalData';

export default class LiveRoomTabView extends Component {
    state = {
        list: LocalData.LiveRoomTabList,
    };

    componentDidMount() {}

    renderListItem = ({ item }) => {
        const { title } = item;
        return (
            <View>
                <Text>{title}</Text>
            </View>
        );
    };

    renderGameTypeView = data => {
        const components = [];
        if (data != null) {
            data.forEach(b => {
                const { id, name } = b;
                components.push(
                    <View tabLabel={name} key={id} {...this.props} />,
                );
            });
        }
        return components;
    };

    render() {
        const { list } = this.state;
        return (
            <ScrollTabView
                renderTabBar={() => <ScrollableTabBar />}
                tabItemStyle={styles.tabItemStyle}
            >
                {this.renderGameTypeView(list)}
            </ScrollTabView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingBottom: 0,
    },
    tabItemStyle: {
        backgroundColor: UI.color.primary1,
    },
    content: {
        flex: 1,
    },
    swiperContainer: {
        height: 220,
    },
    wrapper: {},
    slide1: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#9DD6EB',
    },
    slide2: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#97CAE5',
    },
    slide3: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#92BBD9',
    },
    text: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold',
    },
});
