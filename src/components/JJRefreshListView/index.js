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
import JJRefreshControl, {
    RefreshControlStatus,
} from '../JJListView/JJRefreshControl';
import UI from '../../UI';

export default class JJRefreshListView extends Component {
    static propTypes = {
        refreshThreshold: PropTypes.number,
        isSection: PropTypes.bool,
        refreshControlHeight: PropTypes.number,
    };

    static defaultProps = {
        refreshThreshold: 68, // 触发刷新的临界值
        isSection: false,
        refreshControlHeight: 50,
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
            listContentMinHeight: 0, // 内容的最小值
        };
        // 记录当前的滑动的距离
        this.currentOffsetY = 0;
        // 因为修改state是异步的,所以在修改state的同时,为了保证一些状态变更时候的问题,通过变量也记录一下
        this.currentRefreshStatus = RefreshControlStatus.pullToRefresh;
        // 该对象仅仅用来处理刷新视图的显示区域,如果列表内指定了header,对应的header高度与该对象无关
        this.HeaderSize = {};
        // 实际的临界值,为了区分不同平台的临界值,该值在不同平台根据属性内的值计算后得出
        this.actualRefreshThreshold = 68;
        // android平台默认默认的原点位置,iOS因为列表有弹簧效果,所以原点位置为0, Android的原点需要通过设定的上面空白区域的高度加上刷新视图的高度,如果有必要可能还需要加上statusbar的高度
        this.androidOriginY = 0;
        // 当前页面是否处于scrolling状态中
        this.isScrolling = false;
    }

    componentWillMount() {
        /**
         * 布局相关的数据的初始化
         */
        const { refreshControlHeight, refreshThreshold } = this.props;
        this.HeaderSize = {
            height: Platform.OS === 'ios' ? 0 : 100,
            marginTop: Platform.OS === 'ios' ? -refreshControlHeight : 0, // ios可以通过margintop的方式,把刷新视图隐藏在屏幕之外, Android则不行
            blankAresHeight: Platform.OS === 'ios' ? 0 : 50, // iOS为0, 只用于Android
        };
        // 通过计算,得出Android默认滚动到的坐标位置,即坐标"伪原点", 每次刷新结束后,都要滚动到这个位置
        this.androidOriginY =
            refreshControlHeight + this.HeaderSize.blankAresHeight;
        this.actualRefreshThreshold =
            Platform.OS === 'ios'
                ? refreshThreshold
                : this.androidOriginY - refreshThreshold;
    }

    componentDidMount() {
        // Android系统上面  显示完成后,将列表移动到恰好隐藏起来header的位置, 直接设置不生效,使用计时器可以生效.不确定什么原因
        // if (Platform.OS === 'android') {
        //     this.initializationTimer = setTimeout(() => {
        //         const params = {
        //             offset: this.androidOriginY,
        //             animated: false,
        //         };
        //         this.callListScrollWithParams(params);
        //     }, 100);
        // }
    }

    shouldComponentUpdate(nextProps, nextState) {
        // 此处未做性能优化
        // 如果正在拖动中,则不作处理
        if (!this.isScrolling) {
            this.listScrollToOffsetWithRefreshState(
                nextState.refreshControlStatus,
            );
        }
        return true;
    }

    componentWillUnmount() {
        if (this.initializationTimer) {
            clearTimeout(this.initializationTimer);
        }
    }

    /**
     * 获取组件header的marginTop的值,
     */
    getMarginTop = refreshControlStatus => {
        if (refreshControlStatus === RefreshControlStatus.pullToRefresh) {
            return this.HeaderSize.marginTop;
        }
        return 0;
    };

    /**
     * 组件开始滚动的方法
     */
    onScrollBeginDrag = () => {
        this.isScrolling = true;
    };

    /**
     * 组件滚动时候的回调方法
     */
    onScroll = event => {
        const { onScroll } = this.props;
        if (onScroll) {
            onScroll(event);
        }
        // y值为负数,加个负号,表示下拉的偏移量
        this.currentOffsetY = event.nativeEvent.contentOffset.y;
        console.log('onScroll', this.currentOffsetY);

        // 如果处于下拉刷新的状态,则需要变成松开刷新
        const { refreshControlStatus } = this.state;
        //  如果不是下拉刷新和松开刷新的状态,即处于正在刷新,刷新成功状态,则return什么也不做
        if (
            refreshControlStatus === RefreshControlStatus.refreshing ||
            refreshControlStatus === RefreshControlStatus.refreshed
        ) {
            return;
        }
        // 如果处于下拉刷新的状态,当滚动的位置 小于临界值,就将状态改为松开刷新 大于临界值 改为下拉刷新
        const { actualRefreshThreshold } = this;
        if (this.currentOffsetY < actualRefreshThreshold) {
            this.changeRefreshState(RefreshControlStatus.releaseToRefresh);
        } else {
            this.changeRefreshState(RefreshControlStatus.pullToRefresh);
        }
    };

    /**
     * 当滚动结束时候的回调
     */
    onScrollEndDrag = () => {
        this.isScrolling = false;
        // 处理原始属性的内容,做一次调用
        const { onScrollEndDrag } = this.props;
        if (onScrollEndDrag) {
            onScrollEndDrag();
        }
        const { refreshControlStatus } = this.state;
        switch (refreshControlStatus) {
            // 如果当前仍处于松开刷新的状态
            case RefreshControlStatus.releaseToRefresh:
                this.onRefresh();
                break;
            default:
                // 如果当前仍处于下拉刷新的状态,直接让页面滚回顶部
                // 如果当前仍处于刷新中的的状态,直接让页面滚回刷新中的样式
                // 如果当前仍处于刷新成功的状态,直接让页面滚回刷新成功的样子
                this.listScrollToOffsetWithRefreshState(refreshControlStatus);
                break;
        }
    };

    /**
     * 刷新方法
     */
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
    listScrollToOffsetWithRefreshState = state => {
        // 如果是iOS 则不需要回滚
        if (Platform.OS === 'ios') {
            return;
        }
        if (!state) {
            return;
        }
        const offset = this.getOffset(state);
        const params = {
            offset,
            animated: true,
        };
        console.log('listScrollToOffsetWithRefreshState', params);
        this.callListScrollWithParams(params);
    };

    /**
     * 调用组件的滚动方法,param表示滚动的参数
     */
    callListScrollWithParams = params => {
        console.log('callListScrollWithParams', params);
        if (this.listView) {
            const { isSection } = this.props;
            if (isSection) {
                const { offset, animated } = params;
                const newParams = {
                    viewPosition: offset,
                    sectionIndex: 0,
                    itemIndex: -1,
                    animated,
                };
                this.listView.scrollToLocation(newParams);
            } else {
                this.listView.scrollToOffset(params);
            }
        }
    };

    /**
     * 根据不同的状态获取当前的偏移量
     */
    getOffset = refreshControlStatus => {
        let offset = 0;
        const { refreshControlHeight } = this.props;
        switch (refreshControlStatus) {
            // 下拉刷新
            case RefreshControlStatus.pullToRefresh:
                offset = this.androidOriginY;
                break;
            // 松开刷新
            case RefreshControlStatus.releaseToRefresh:
                offset = this.androidOriginY - refreshControlHeight;
                break;
            // 刷新中
            case RefreshControlStatus.refreshing:
                offset = this.androidOriginY - refreshControlHeight;
                break;
            // 刷新成功
            case RefreshControlStatus.refreshed:
                offset = this.androidOriginY - refreshControlHeight;
                break;
            default:
                break;
        }
        return offset;
    };

    /**
     * 刷新完成的方法
     */
    onRefreshFinished = () => {
        setTimeout(() => {
            this.changeRefreshState(RefreshControlStatus.pullToRefresh);
        }, 500);
    };

    /**
     * 组件布局完成后的回调方法,通过该方法获取到当前列表组件的高度,然后计算拼接上刷新视图后 最小高度
     */
    onListLayout = event => {
        const { onLayout } = this.props;
        const { height } = event.nativeEvent.layout;
        const { listContentMinHeight } = this.state;
        if (listContentMinHeight < height) {
            if (Platform.OS === 'android') {
                this.setState({
                    listContentMinHeight: height + this.androidOriginY,
                });
            }
        }
        if (onLayout) {
            onLayout(event);
        }
    };

    /**
     * 修改当前组件刷新的状态值
     */
    changeRefreshState = (state, callBack = null) => {
        if (this.currentRefreshStatus === state) {
            return;
        }
        this.currentRefreshStatus = state;
        this.setState(
            {
                refreshControlStatus: state,
            },
            callBack,
        );
    };

    /**
     * 渲染header
     */
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
        const { listContentMinHeight } = this.state;
        const {
            isSection,
            onScroll,
            ListHeaderComponent,
            onScrollEndDrag,
            contentContainerStyle,
            ...others
        } = this.props;
        if (!isSection) {
            return (
                <FlatList
                    ref={a => {
                        this.listView = a;
                    }}
                    style={{ flex: 1 }}
                    onLayout={this.onListLayout}
                    contentContainerStyle={{
                        ...contentContainerStyle,
                        minHeight: listContentMinHeight,
                    }}
                    onScrollBeginDrag={this.onScrollBeginDrag}
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
                onLayout={this.onListLayout}
                // contentContainerStyle={{
                //     ...contentContainerStyle,
                //     minHeight: listContentMinHeight,
                // }}
                contentContainerStyle={{ minHeight: listContentMinHeight }}
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
        // backgroundColor: UI.color.white1,
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
