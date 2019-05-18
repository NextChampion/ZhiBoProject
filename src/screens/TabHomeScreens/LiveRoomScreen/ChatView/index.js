import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableWithoutFeedback,
    Image,
} from 'react-native';
import PropTypes from 'prop-types';
// import { connect } from '../../../redux';
import Modal from 'react-native-modal';
// import Container from '../../../../components/Container';
// import RoomListItem from '../../../../components/RoomListItem';
// import UI from '../../../../UI';
// import LocalData from '../../LocalData';
// import NavigationHeader from '../../../../components/NavigatorHeader';
// import LiveRoomTabView from '../LiveRoomTabView';
import ChatInputView from './ChatInputView';
import UI from '../../../../UI';

const TAG = '[ChatView]';

export default class ChatView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isBadgeModalVisiable: false,
            isEmojiModalVisiable: false,
            isInputModalVisiable: false,
            isVoiceModalVisiable: false,
            isGiftModalVisiable: false,
        };
    }

    componentDidMount() {}

    onBadgeClick = () => {
        const { isBadgeModalVisiable } = this.state;
        this.setState({ isBadgeModalVisiable: !isBadgeModalVisiable });
    };

    onEmojiClick = () => {
        const { isEmojiModalVisiable } = this.state;
        this.setState({ isEmojiModalVisiable: !isEmojiModalVisiable });
    };

    onInputClick = () => {
        const { isInputModalVisiable } = this.state;
        this.setState({ isInputModalVisiable: !isInputModalVisiable });
    };

    onVoiceClick = () => {
        const { isVoiceModalVisiable } = this.state;
        this.setState({ isVoiceModalVisiable: !isVoiceModalVisiable });
    };

    onGiftClick = () => {
        const { isGiftModalVisiable } = this.state;
        this.setState({ isGiftModalVisiable: !isGiftModalVisiable });
    };

    hideModal = () => {
        this.setState({
            isBadgeModalVisiable: false,
            isEmojiModalVisiable: false,
            isInputModalVisiable: false,
            isVoiceModalVisiable: false,
            isGiftModalVisiable: false,
        });
    };

    render() {
        console.debug('[render]', TAG);
        const {
            isBadgeModalVisiable,
            isEmojiModalVisiable,
            isInputModalVisiable,
            isVoiceModalVisiable,
            isGiftModalVisiable,
        } = this.state;
        return (
            <View style={styles.container}>
                <View style={styles.chatView}>
                    <Text>ChatView</Text>
                </View>
                <ChatInputView
                    onBadgeClick={this.onBadgeClick}
                    onEmojiClick={this.onEmojiClick}
                    onInputClick={this.onInputClick}
                    onVoiceClick={this.onVoiceClick}
                    onGiftClick={this.onGiftClick}
                />
                <Modal
                    style={styles.modal}
                    backdropColor={UI.color.transparent}
                    isVisible={isBadgeModalVisiable}
                >
                    <ModalCloseView onPress={this.hideModal} />
                    <View style={styles.modalContentView}>
                        <Text>
                            I am the isBadgeModalVisiable modal content!
                        </Text>
                    </View>
                </Modal>
                <Modal
                    style={styles.modal}
                    backdropColor={UI.color.transparent}
                    isVisible={isEmojiModalVisiable}
                >
                    <ModalCloseView onPress={this.hideModal} />

                    <View style={styles.modalContentView}>
                        <Text>
                            I am the isEmojiModalVisiable modal content!
                        </Text>
                    </View>
                </Modal>
                <Modal
                    style={styles.modal}
                    backdropColor={UI.color.transparent}
                    isVisible={isInputModalVisiable}
                >
                    <ModalCloseView onPress={this.hideModal} />
                    <View style={styles.modalContentView}>
                        <Text>
                            I am the isInputModalVisiable modal content!
                        </Text>
                    </View>
                </Modal>
                <Modal
                    style={styles.modal}
                    backdropColor={UI.color.transparent}
                    isVisible={isVoiceModalVisiable}
                >
                    <ModalCloseView onPress={this.hideModal} />
                    <View style={styles.modalContentView}>
                        <Text>
                            I am the isVoiceModalVisiable modal content!
                        </Text>
                    </View>
                </Modal>
                <Modal
                    style={styles.modal}
                    backdropColor={UI.color.transparent}
                    isVisible={isGiftModalVisiable}
                >
                    <ModalCloseView onPress={this.hideModal} />
                    <View style={styles.modalContentView}>
                        <Text>I am the isGiftModalVisiable modal content!</Text>
                    </View>
                </Modal>
            </View>
        );
    }
}

function ModalCloseView({ onPress }) {
    return (
        <TouchableWithoutFeedback onPress={onPress}>
            <View style={styles.modalCloseView} />
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    chatView: {
        flex: 1,
    },
    modal: {
        margin: 0,
    },
    modalCloseView: {
        flex: 2,
        backgroundColor: UI.color.transparent,
    },
    modalContentView: {
        flex: 1,
        backgroundColor: UI.color.bg1,
        alignItems: 'center',
        justifyContent: 'center',
        borderTopWidth: StyleSheet.hairlineWidth,
    },
});
