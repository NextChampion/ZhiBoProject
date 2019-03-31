/**
 *
 * 带有默认背景的图片组件
 *
 * created by 张存夏 on 20190323
 * [功能描述]:
 * 1.首先显示tabbar内部的内容
 *
 */

import React, { Component } from 'react';
import { Platform, Animated, Dimensions, ViewPagerAndroid } from 'react-native';
import PropTypes from 'prop-types';
import SceneComponent from './SceneComponent';

const { width: screenWidth } = Dimensions.get('window');

const AnimatedViewPagerAndroid =
    Platform.OS === 'android'
        ? Animated.createAnimatedComponent(ViewPagerAndroid)
        : undefined;

export default class Header extends Component {
    static propTypes = {
        data: PropTypes.array,
        prerenderingSiblingsNumber: PropTypes.number,
        initialPage: PropTypes.number,
        locked: PropTypes.bool,
        onPageChanged: PropTypes.func,
        onScroll: PropTypes.func,
    };

    static defaultProps = {
        data: [],
        prerenderingSiblingsNumber: 0,
        initialPage: 0,
        locked: false,
        onPageChanged: null,
        onScroll: null,
    };

    constructor(props) {
        super(props);
        this.state = {
            currentPage: 0,
            containerWidth: screenWidth,
        };
        this.currentPageIndex = 0;
    }

    onMomentumScrollBeginAndEnd = e => {
        const offsetX = e.nativeEvent.contentOffset.x;
        const page = Math.round(offsetX / screenWidth);
        const { onPageChanged } = this.props;
        if (this.currentPageIndex === page) {
            return;
        }
        this.currentPageIndex = page;
        if (onPageChanged) {
            onPageChanged(page);
        }
    };

    onScrollViewScroll = e => {
        const { onScroll } = this.props;
        if (Platform.OS === 'ios') {
            const { containerWidth } = this.props;
            const offsetX = e.nativeEvent.contentOffset.x;
            if (offsetX === 0 && !this.scrollOnMountCalled) {
                this.scrollOnMountCalled = true;
            } else if (onScroll) {
                onScroll(offsetX / containerWidth);
            }
        } else {
            const { position, offset } = e.nativeEvent;
            if (onScroll) {
                onScroll(position + offset);
            }
        }
        // const offsetX = e.nativeEvent.contentOffset.x;
        // console.debug('onScrollViewScroll', offsetX);
    };

    onPageScrollStateChanged = () => {
        // console.debug('onPageScrollStateChanged status', status);
    };

    goToPage = pageNumber => {
        const { scrollWithoutAnimation } = this.props;
        const { containerWidth } = this.state;
        if (Platform.OS === 'ios') {
            const offset = pageNumber * containerWidth;
            if (this.scrollView) {
                this.scrollView.getNode().scrollTo({
                    x: offset,
                    y: 0,
                    animated: !scrollWithoutAnimation,
                });
            }
            return;
        }
        if (this.scrollView) {
            if (scrollWithoutAnimation) {
                this.scrollView.getNode().setPageWithoutAnimation(pageNumber);
            } else {
                this.scrollView.getNode().setPage(pageNumber);
            }
        }
        // const offset = pageNumber * screenWidth;
        // this.scrollView.getNode().scrollTo({ x: offset, y: 0, animated: true });
    };

    makeSceneKey = (child, idx) => {
        return `${child.props.tabLabel}_${idx}`;
    };

    shouldRenderSceneKey = (idx, currentPageKey) => {
        const { prerenderingSiblingsNumber } = this.props;
        const numOfSibling = prerenderingSiblingsNumber;
        return (
            idx < currentPageKey + numOfSibling + 1 &&
            idx > currentPageKey - numOfSibling - 1
        );
    };

    composeScenes = () => {
        const { children } = this.props;
        const { currentPage } = this.state;
        return children.map((child, idx) => {
            // const key = this.makeSceneKey(child, idx);
            return (
                <SceneComponent
                    key={child.key}
                    shouldUpdated={this.shouldRenderSceneKey(idx, currentPage)}
                    style={{ width: screenWidth }}
                >
                    {child}
                </SceneComponent>
            );
        });
    };

    onPageSelected = event => {
        const { position } = event.nativeEvent;
        const { onPageChanged } = this.props;
        if (onPageChanged) {
            onPageChanged(position);
        }
    };

    render() {
        const { children, initialPage, locked, contentProps } = this.props;
        const contentContainerWidth = screenWidth * children.length;
        const offsetX = initialPage * screenWidth;
        const scenes = this.composeScenes();
        if (Platform.OS === 'ios') {
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
                            listener: this.onScrollViewScroll,
                        },
                    )}
                    onMomentumScrollBegin={this.onMomentumScrollBeginAndEnd}
                    onMomentumScrollEnd={this.onMomentumScrollBeginAndEnd}
                    scrollEventThrottle={16}
                    scrollsToTop={false}
                    showsHorizontalScrollIndicator={false}
                    scrollEnabled={!locked}
                    directionalLockEnabled
                    alwaysBounceVertical={false}
                    keyboardDismissMode="on-drag"
                >
                    {scenes}
                </Animated.ScrollView>
            );
        }
        return (
            <AnimatedViewPagerAndroid
                // key={this._children().length}
                style={{ flex: 1 }}
                initialPage={initialPage}
                onPageSelected={this.onPageSelected}
                keyboardDismissMode="on-drag"
                scrollEnabled={!locked}
                onPageScrollStateChanged={this.onPageScrollStateChanged}
                onPageScroll={Animated.event(
                    [
                        {
                            nativeEvent: {
                                position: this.state.positionAndroid,
                                offset: this.state.offsetAndroid,
                            },
                        },
                    ],
                    {
                        useNativeDriver: true,
                        listener: this.onScrollViewScroll,
                    },
                )}
                ref={scrollView => {
                    this.scrollView = scrollView;
                }}
                {...contentProps}
            >
                {scenes}
            </AnimatedViewPagerAndroid>
        );
    }
}
