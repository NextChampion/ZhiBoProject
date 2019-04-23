/**
 * 支持下拉刷新功能的列表组件
 */
import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    SectionList,
    Platform,
    FlatList,
} from 'react-native';
import PropTypes from 'prop-types';
import JJRefreshControl, { RefreshControlStatus } from './JJRefreshControl';
import UI from '../../UI';

export default class JJListView extends Component {
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
             * 下拉刷新的视图状态 RefreshControlStatus
             * pullToRefresh: 1,
             * releaseToRefresh: 2,
             * refreshing: 3,
             * refreshed: 4,
             */
            refreshControlStatus: RefreshControlStatus.pullToRefresh,
        };
        // 记录当前的滑动的距离
        this.currentOffsetY = 0;
        // 因为修改state是异步的,所以在修改state的同时,为了保证一些状态变更时候的问题,通过变量也记录一下
        this.currentRefreshStatus = RefreshControlStatus.pullToRefresh;
        // 刷新视图的高度
        this.refreshControlHeight = 50;
        // 该对象仅仅用来处理刷新视图的显示区域,如果列表内指定了header,对应的header高度与该对象无关
        this.HeaderSize = {};
        // android平台默认上移的高度
        this.androidDefaultOffset = 0;
        // 实际的临界值,为了区分不同平台的临界值,该值在不同平台根据属性内的值计算后得出
        this.actualRefreshThreshold = 68;
    }

    componentWillMount() {
        this.HeaderSize = {
            height: Platform.OS === 'ios' ? 0 : 100,
            marginTop: Platform.OS === 'ios' ? -this.refreshControlHeight : 0, // ios可以通过margintop的方式,把刷新视图隐藏在屏幕之外, Android则不行
            blankAresHeight: Platform.OS === 'ios' ? 0 : 50, // 只用于Android
        };
        this.androidDefaultOffset =
            this.refreshControlHeight + this.HeaderSize.blankAresHeight;
    }

    componentDidMount() {
        // Android系统上面  显示完成后,将列表移动到恰好隐藏起来header的位置, 直接设置不生效,使用计时器可以生效.不确定什么原因
        if (Platform.OS === 'android') {
            this.initializationTimer = setTimeout(() => {
                const params = {
                    offset: this.androidDefaultOffset,
                    animated: true,
                };
                if (this.listView) {
                    this.listView.scrollToOffset(params);
                }
            }, 50);
        }
    }

    componentWillUnmount() {
        if (this.initializationTimer) {
            clearTimeout(this.initializationTimer);
        }
    }

    getMarginTop = refreshControlStatus => {
        if (refreshControlStatus === RefreshControlStatus.pullToRefresh) {
            return this.HeaderSize.marginTop;
        }
        return 0;
    };

    onScroll = event => {
        const { onScroll } = this.props;
        if (onScroll) {
            onScroll(event);
        }
        const { actualRefreshThreshold } = this;
        // y值为负数,加个负号,表示下拉的偏移量
        this.currentOffsetY =
            Platform.OS === 'ios'
                ? -event.nativeEvent.contentOffset.y
                : this.androidDefaultOffset - event.nativeEvent.contentOffset.y;
        // console.log('onScroll', this.currentOffsetY, actualRefreshThreshold);
        if (this.currentOffsetY === RefreshControlStatus.refreshing) {
            return;
        }
        if (this.currentOffsetY > actualRefreshThreshold) {
            if (
                this.currentRefreshStatus !== RefreshControlStatus.pullToRefresh
            ) {
                return;
            }
            this.changeRefreshState(RefreshControlStatus.releaseToRefresh);
        }
    };

    onScrollEndDrag = () => {
        const { onScrollEndDrag } = this.props;
        if (onScrollEndDrag) {
            onScrollEndDrag();
        }
        const { actualRefreshThreshold } = this;
        if (this.currentOffsetY > actualRefreshThreshold) {
            if (
                this.currentRefreshStatus !==
                RefreshControlStatus.releaseToRefresh
            ) {
                return;
            }
            this.onRefresh();
            return;
        }
        this.changeRefreshState(RefreshControlStatus.pullToRefresh);
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

    // 每次滚动完毕后,iOS的会自动回滚,但是Android的不可以,所以需要手动调用滚动函数,使的Android也滚动到某个位置,不同的状态对应的对应不一样
    scrollToOffset = () => {
        // 如果是iOS 则不需要回滚
        if (Platform.OS === 'ios') {
            return;
        }
        const offset = this.getOffset();
        if (this.listView) {
            this.listView.scrollToOffset({ offset, animated: true });
        }
    };

    getOffset = () => {
        const { refreshControlStatus } = this.state;
        let offset = 0;
        switch (refreshControlStatus) {
            // 下拉刷新
            case RefreshControlStatus.pullToRefresh:
                offset = this.androidDefaultOffset;
                break;
            // 松开刷新
            case RefreshControlStatus.releaseToRefresh:
                offset = this.androidDefaultOffset - this.refreshControlHeight;
                break;
            // 刷新中
            case RefreshControlStatus.refreshing:
                offset = this.androidDefaultOffset - this.refreshControlHeight;
                break;
            // 刷新成功
            case RefreshControlStatus.refreshed:
                offset = this.androidDefaultOffset - this.refreshControlHeight;
                break;
            default:
                break;
        }
        return offset;
    };

    onRefreshFinished = () => {
        setTimeout(() => {
            this.changeRefreshState(RefreshControlStatus.pullToRefresh);
        }, 1000);
    };

    changeRefreshState = (state, callBack = null) => {
        if (this.currentRefreshStatus === state) {
            return;
        }
        this.currentRefreshStatus = state;
        this.setState(
            {
                refreshControlStatus: state,
            },
            () => {
                this.scrollToOffset();
                if (callBack) {
                    callBack();
                }
            },
        );
    };

    renderListHeaderComponent = () => {
        const { ListHeaderComponent } = this.props;
        const { refreshControlStatus } = this.state;
        const marginTop = this.getMarginTop(refreshControlStatus);
        const paddingTop = this.HeaderSize.blankAresHeight;
        return (
            <View
                style={[styles.listHeaderContainer, { marginTop, paddingTop }]}
            >
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
            onScrollEndDrag,
            ...others
        } = this.props;
        if (!isSection) {
            return (
                <FlatList
                    ref={a => {
                        this.listView = a;
                    }}
                    onScroll={this.onScroll}
                    onScrollEndDrag={this.onScrollEndDrag}
                    ListHeaderComponent={() => this.renderListHeaderComponent()}
                    {...others}
                />
            );
        }
        return (
            <SectionList
                ref={a => {
                    this.listView = a;
                }}
                onScroll={this.onScroll}
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
