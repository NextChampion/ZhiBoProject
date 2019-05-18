import React, { Component } from 'react';
import { StyleSheet, View, Text, SectionList } from 'react-native';
import PropTypes from 'prop-types';
import Swiper from 'react-native-swiper';
// import { connect } from '../../../redux';
import Container from '../../../components/Container';
import RoomListItem from '../../../components/RoomListItem';
import JJRefreshControl, {
    RefreshControlStatus,
} from '../../../components/JJListView/JJRefreshControl';
import UI from '../../../UI';
import LocalData from '../LocalData';

const RefreshThreshold = 68; // 触发刷新的临界值

export default class RecommandScreen extends Component {
    static propTypes = {
        navigation: PropTypes.shape({
            navigate: PropTypes.func.isRequired,
        }).isRequired,
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
        // y值为负数,加个负号,相当于取绝对值
        this.currentOffsetY = -event.nativeEvent.contentOffset.y;
        if (this.currentOffsetY > RefreshThreshold) {
            if (this.currentRefreshStatus !== RefreshControlStatus.default) {
                return;
            }
            this.currentRefreshStatus = RefreshControlStatus.holding;
            this.setState({
                refreshControlStatus: RefreshControlStatus.holding,
            });
        }
    };

    onScrollBeginDrag = () => {};

    onScrollEndDrag = () => {
        if (this.currentOffsetY > RefreshThreshold) {
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

    onClickItem = () => {
        const { navigation } = this.props;
        if (navigation) {
            navigation.navigate('LiveRoom');
        }
    };

    renderItem = ({ index, section }) => {
        const numColumns = 2;
        if (index % numColumns !== 0) return null;
        const items = [];
        for (let i = index; i < index + numColumns; i += 1) {
            if (i >= section.data.length) {
                break;
            }
            const data = section.data[i];
            items.push(
                <RoomListItem
                    onPress={this.onClickItem}
                    key={data.roomId}
                    data={data}
                />,
            );
        }
        return (
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                }}
            >
                {items}
            </View>
        );
    };

    renderSectionHeader = ({ section: { title } }) => (
        <View style={styles.headerContainerView}>
            <Text key={title} style={{ fontWeight: 'bold' }}>
                {title}
            </Text>
        </View>
    );

    renderListHeaderComponent = () => {
        const { refreshControlStatus } = this.state;
        const marginTop = this.getMarginTop(refreshControlStatus);
        return (
            <View style={[styles.swiperContainer, { marginTop }]}>
                <JJRefreshControl
                    status={refreshControlStatus}
                    style={styles.refreshControl}
                />
                <Swiper style={styles.wrapper} autoplay>
                    <View style={styles.slide1}>
                        <Text style={styles.text}>Hello Swiper</Text>
                    </View>
                    <View style={styles.slide2}>
                        <Text style={styles.text}>Beautiful</Text>
                    </View>
                    <View style={styles.slide3}>
                        <Text style={styles.text}>And simple</Text>
                    </View>
                </Swiper>
            </View>
        );
    };

    render() {
        return (
            <Container style={{ paddingBottom: 0 }}>
                <SectionList
                    renderItem={this.renderItem}
                    ListHeaderComponent={this.renderListHeaderComponent}
                    numColumns={2}
                    renderSectionHeader={this.renderSectionHeader}
                    sections={LocalData.roomListData}
                    keyExtractor={item => item.roomId}
                    onScroll={this.onScroll}
                    onScrollBeginDrag={this.onScrollBeginDrag}
                    onScrollEndDrag={this.onScrollEndDrag}
                />
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    tabItemStyle: {
        backgroundColor: UI.color.primary1,
    },
    content: {
        flex: 1,
    },
    headerContainerView: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 50,
        borderTopWidth: StyleSheet.hairlineWidth,
        borderColor: UI.color.border,
        backgroundColor: UI.color.white1,
    },
    refreshControl: {},
    swiperContainer: {
        height: 270,
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
