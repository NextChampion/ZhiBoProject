/**
 *
 * 带有默认背景的图片组件
 *
 * created by 张存夏 on 20190323
 * [功能描述]:
 * 1.显示tabbar内部的内容
 *
 */


import React, { Component } from 'react';
import {
    StyleSheet,
    FlatList,
    Platform,
    View,
    Animated,
    Dimensions,
    Text,
    ScrollView,
} from 'react-native';
import PropTypes from 'prop-types';
import SceneComponent from './SceneComponent';

const { height, width: screenWidth } = Dimensions.get('window');

const TAG = '[RN_Header]';

export default class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPage: 0,
        };
        this.currentPageIndex = 0;
    }

    static propTypes = {
        data: PropTypes.array,
        prerenderingSiblingsNumber: PropTypes.number,
        initialPage: PropTypes.number,
        locked: PropTypes.bool,
        onPageChanged: PropTypes.func,
    };

    static defaultProps = {
        data: [],
        prerenderingSiblingsNumber: 0,
        initialPage: 0,
        locked: false,
        onPageChanged: null,
    };

    onMomentumScrollBeginAndEnd = e => {
        const offsetX = e.nativeEvent.contentOffset.x;
        const page = Math.round(offsetX / screenWidth);
        const { onPageChanged } = this.props;
        if (this.currentPageIndex === page) {
            return;
        }
        this.currentPageIndex = page;
        onPageChanged && onPageChanged(page);
    };

    goToPage = pageNumber => {
        const offset = pageNumber * screenWidth;
        this.scrollView.getNode().scrollTo({ x: offset, y: 0, animated: true });
    };

    makeSceneKey = (child, idx) => {
        return `${child.props.tabLabel  }_${  idx}`;
    };

    shouldRenderSceneKey = (idx, currentPageKey) => {
        const numOfSibling = this.props.prerenderingSiblingsNumber;
        return (
            idx < currentPageKey + numOfSibling + 1 &&
            idx > currentPageKey - numOfSibling - 1
        );
    };

    composeScenes = () => {
        return this.props.children.map((child, idx) => {
            const key = this.makeSceneKey(child, idx);
            return (
                <SceneComponent
                    key={child.key}
                    shouldUpdated={this.shouldRenderSceneKey(
                        idx,
                        this.state.currentPage,
                    )}
                    style={{ width: screenWidth }}
                >
                    {child}
                </SceneComponent>
            );
        });
    };

    render() {
        const { data, children, initialPage } = this.props;
        const contentContainerWidth = screenWidth * children.length;
        const offsetX = initialPage * screenWidth;
        const scenes = this.composeScenes();
        return (
            <Animated.ScrollView
                horizontal
                pagingEnabled
                automaticallyAdjustContentInsets={false}
                contentContainerStyle={{ width: contentContainerWidth }}
                contentOffset={{ x: offsetX }}
                ref={scrollView => {
                    this.scrollView = scrollView;
                }}
                onScroll={Animated.event(
                    [
                        {
                            nativeEvent: {
                                contentOffset: {
                                    x: this.state.scrollXIOS,
                                },
                            },
                        },
                    ],
                    {
                        useNativeDriver: true,
                    },
                )}
                onMomentumScrollBegin={this.onMomentumScrollBeginAndEnd}
                onMomentumScrollEnd={this.onMomentumScrollBeginAndEnd}
                scrollEventThrottle={16}
                scrollsToTop={false}
                showsHorizontalScrollIndicator={false}
                scrollEnabled={!this.props.locked}
                directionalLockEnabled
                alwaysBounceVertical={false}
                keyboardDismissMode="on-drag"
            >
                {scenes}
            </Animated.ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    tabbarContainer: {
        height: 44,
    },
    headerLeft: {},
    tabbarList: {},
    tabbar: {},
    content: {
        flex: 1,
    },
});
