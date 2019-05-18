import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableWithoutFeedback,
    Image,
} from 'react-native';
import PropTypes from 'prop-types';
import { tabHome } from '../../../../images';
import UI from '../../../../UI';
// import { connect } from '../../../redux';
// import Container from '../../../../components/Container';
// import RoomListItem from '../../../../components/RoomListItem';
// import UI from '../../../../UI';
// import LocalData from '../../LocalData';
// import NavigationHeader from '../../../../components/NavigatorHeader';
// import LiveRoomTabView from '../LiveRoomTabView';

const TAG = '[ChatInputView]';

export default class ChatInputView extends Component {
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
        const {
            onBadgeClick,
            onEmojiClick,
            onInputClick,
            onVoiceClick,
            onGiftClick,
        } = this.props;
        return (
            <View style={styles.textinputContainer}>
                <TouchableWithoutFeedback onPress={onBadgeClick}>
                    <View>
                        <Image
                            source={tabHome.liveRoomBadge}
                            style={styles.badgeImage}
                        />
                    </View>
                </TouchableWithoutFeedback>

                <View style={styles.textinputView}>
                    <TouchableWithoutFeedback onPress={onEmojiClick}>
                        <Image
                            source={tabHome.liveRoomEmoji}
                            style={styles.emojImage}
                        />
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback
                        onPress={onInputClick}
                        style={styles.textinput}
                    >
                        <View style={{ flex: 1 }}>
                            <Text style={styles.textinputText}>
                                长按语音按钮发语音~
                            </Text>
                        </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={onVoiceClick}>
                        <Image
                            source={tabHome.liveRoomVoice}
                            style={styles.voiceImage}
                        />
                    </TouchableWithoutFeedback>
                </View>
                <TouchableWithoutFeedback onPress={onGiftClick}>
                    <View>
                        <Image
                            source={tabHome.liveRoomGift}
                            style={styles.giftImage}
                        />
                    </View>
                </TouchableWithoutFeedback>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    textinputContainer: {
        height: 40,
        flexDirection: 'row',
        alignItems: 'center',
        borderTopWidth: StyleSheet.hairlineWidth,
        borderColor: UI.color.border,
    },
    badgeImage: {
        width: 26,
        height: 26,
        // marginVertical: 12,
        marginHorizontal: 8,
    },
    textinputView: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: UI.color.bg2,
        borderRadius: 8,
    },
    emojImage: {
        width: 20,
        height: 20,
        marginHorizontal: 8,
    },
    textinput: {
        flex: 1,
    },
    textinputText: {
        color: UI.color.gray1,
    },
    voiceImage: {
        width: 20,
        height: 20,
        marginVertical: 5,
        marginHorizontal: 8,
    },
    giftImage: {
        width: 30,
        height: 30,
        marginHorizontal: 8,
    },
});
