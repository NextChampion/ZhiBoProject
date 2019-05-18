import React from 'react';
import { StyleSheet } from 'react-native';
// import PropTypes from 'prop-types';
import ScrollTabView, {
    ScrollableTabBar,
} from 'react-native-scrollable-tab-view';
// import { connect } from '../../redux';
// import UI from '../../../UI';
import AnchorView from './AnchorView';
import ChatView from './ChatView';
import GiftRankView from './GiftRankView';
import VisitantView from './VisitantView';

export default function LiveRoomTabView() {
    return (
        <ScrollTabView renderTabBar={() => <ScrollableTabBar />}>
            <ChatView tabLabel="聊天" />
            <AnchorView tabLabel="主播" />
            <GiftRankView tabLabel="排行" />
            <VisitantView tabLabel="贵宾" />
        </ScrollTabView>
    );
}

// eslint-disable-next-line no-unused-vars
const styles = StyleSheet.create({});
