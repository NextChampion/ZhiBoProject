import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableWithoutFeedback,
    Image,
} from 'react-native';
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

    onPressTextinput = () => {
        alert('onPressTextinput');
    };

    render() {
        console.debug('[render]', TAG);
        return (
            <View style={styles.container}>
                <View style={styles.chatView}>
                    <Text>ChatView</Text>
                </View>
                <View style={styles.textinputContainer}>
                    <View>
                        <Image style={styles.badgeImage} />
                    </View>
                    <View style={styles.textinputView}>
                        <Image style={styles.emojImage} />
                        <TouchableWithoutFeedback
                            onPress={this.onPressTextinput}
                            style={styles.textinput}
                        >
                            <View style={{ flex: 1, borderWidth: 1 }}>
                                <Text style={styles.textinputText}>
                                    长按语音按钮发语音
                                </Text>
                            </View>
                        </TouchableWithoutFeedback>
                        <Image style={styles.voiceImage} />
                    </View>
                    <View>
                        <Image style={styles.giftImage} />
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    chatView: {
        flex: 1,
    },
    textinputContainer: {
        // height: 50,
        backgroundColor: 'red',
        flexDirection: 'row',
        alignItems: 'center',
    },
    badgeImage: {
        width: 50,
        height: 40,
        backgroundColor: 'green',
    },
    textinputView: {
        flex: 1,
        flexDirection: 'row',
        // alignItems: 'center',
        backgroundColor: 'blue',
    },
    emojImage: {
        width: 36,
        height: 36,
        backgroundColor: 'yellow',
    },
    textinput: {
        flex: 1,
    },
    textinputText: {},
    voiceImage: {
        width: 36,
        height: 36,
        backgroundColor: 'yellow',
    },
    giftImage: {
        width: 40,
        height: 40,
        backgroundColor: 'green',
    },
});
