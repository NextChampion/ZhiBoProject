import React, { Component } from 'react';
import { StyleSheet, View, SectionList } from 'react-native';
import PropTypes from 'prop-types';
import { FlatList } from 'react-native-gesture-handler';
import JJRefreshControl, { RefreshControlStatus } from './JJRefreshControl';
import UI from '../../UI';

export default class RecommandScreen extends Component {
    static propTypes = {
        refreshThreshold: PropTypes.number,
        isSection: PropTypes.bool,
    };

    static defaultProps = {
        refreshThreshold: 68, // 触发刷新的临界值
        isSection: false,
    };

    constructor(props) {
        super(props);
        this.state = {
            /**
             * 下拉刷新的视图状态
             * default: 1,
             * holding: 2,
             * refreshing: 3,
             * refreshed: 4,
             */
            refreshControlStatus: RefreshControlStatus.default,
        };
        this.currentOffsetY = 0;
        this.currentRefreshStatus = RefreshControlStatus.default;
    }

    componentDidMount() {}

    getMarginTop = refreshControlStatus => {
        if (refreshControlStatus === RefreshControlStatus.default) {
            return -50;
        }
        return 0;
    };

    onScroll = event => {
        const { refreshThreshold } = this.props;
        // y值为负数,加个负号,相当于取绝对值
        this.currentOffsetY = -event.nativeEvent.contentOffset.y;
        if (this.currentOffsetY > refreshThreshold) {
            if (this.currentRefreshStatus !== RefreshControlStatus.default) {
                return;
            }
            this.changeRefreshState(RefreshControlStatus.holding);
        }
    };

    onScrollBeginDrag = () => {};

    onScrollEndDrag = () => {
        const { refreshThreshold } = this.props;
        if (this.currentOffsetY > refreshThreshold) {
            if (this.currentRefreshStatus !== RefreshControlStatus.holding) {
                return;
            }
            this.onRefresh();
            return;
        }
        this.changeRefreshState(RefreshControlStatus.default);
    };

    onRefresh = () => {
        this.changeRefreshState(RefreshControlStatus.refreshing);
        setTimeout(() => {
            this.changeRefreshState(
                RefreshControlStatus.refreshed,
                this.onRefreshFinished,
            );
        }, 2000);
    };

    onRefreshFinished = () => {
        setTimeout(() => {
            this.changeRefreshState(RefreshControlStatus.default);
        }, 1000);
    };

    changeRefreshState = (state, callBack = null) => {
        this.setState(
            {
                refreshControlStatus: state,
            },
            callBack,
        );
        this.currentRefreshStatus = state;
    };

    renderListHeaderComponent = () => {
        const { ListHeaderComponent } = this.props;
        const { refreshControlStatus } = this.state;
        const marginTop = this.getMarginTop(refreshControlStatus);
        return (
            <View style={[styles.listHeaderContainer, { marginTop }]}>
                <JJRefreshControl
                    status={refreshControlStatus}
                    style={styles.refreshControl}
                />
                {ListHeaderComponent()}
            </View>
        );
    };

    render() {
        console.debug('[render] [JJListView]', this.props);
        const {
            isSection,
            onScroll,
            ListHeaderComponent,
            onScrollBeginDrag,
            onScrollEndDrag,
            ...others
        } = this.props;
        if (!isSection) {
            return (
                <FlatList
                    onScroll={this.onScroll}
                    onScrollBeginDrag={this.onScrollBeginDrag}
                    onScrollEndDrag={this.onScrollEndDrag}
                    ListHeaderComponent={this.renderListHeaderComponent}
                    {...others}
                />
            );
        }
        return (
            <SectionList
                onScroll={this.onScroll}
                onScrollBeginDrag={this.onScrollBeginDrag}
                onScrollEndDrag={this.onScrollEndDrag}
                ListHeaderComponent={() => this.renderListHeaderComponent()} // 不知道为什么不使用箭头函数就不会调用
                {...others}
            />
        );
    }
}

const styles = StyleSheet.create({
    content: {
        flex: 1,
    },
    listHeaderContainer: {},
    headerContainerView: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 50,
        borderTopWidth: StyleSheet.hairlineWidth,
        borderColor: UI.color.border,
        backgroundColor: UI.color.white1,
    },
    refreshControl: {},
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
