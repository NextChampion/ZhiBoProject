import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import Swiper from 'react-native-swiper';
// import { connect } from '../../../redux';
import Container from '../../../components/Container';
import RoomListItem from '../../../components/RoomListItem';
import UI from '../../../UI';
import LocalData from '../LocalData';
import NavigationHeader from '../../../components/NavigatorHeader';
import LiveRoomTabView from './LiveRoomTabView';

const TAG = '[ChatView]';

export default class ChatView extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {}

    render() {
        console.debug('[render]', TAG);
        return (
            <View style={styles.container}>
                <Text>ChatView</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
