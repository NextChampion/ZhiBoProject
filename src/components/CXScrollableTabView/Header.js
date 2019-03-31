/**
 *
 * 带有默认背景的图片组件
 *
 * created by 张存夏 on 20190322
 *
 * [功能描述]:
 * 1.首先显示默认图片
 * 2.当网络图片缓存完后,显示网络图片
 *
 */

import React, { Component } from 'react';
import {
    StyleSheet,
    FlatList,
    View,
    Text,
    findNodeHandle,
    Dimensions,
    Animated,
} from 'react-native';
import PropTypes from 'prop-types';
import { UIManager } from 'NativeModules';

import Button from './Button';

const { width: screenWidth } = Dimensions.get('window');

export default class Header extends Component {
    static propTypes = {
        data: PropTypes.array,
        onItemChanged: PropTypes.func,
        defaultIndex: PropTypes.number,
    };

    static defaultProps = {
        data: [],
        onItemChanged: null,
        defaultIndex: 0,
    };

    constructor(props) {
        super(props);
        this.state = {
            list: [],
            leftOfTabUnderline: new Animated.Value(0),
            widthOfTabUnderline: new Animated.Value(100),
            isShowDarkBtn: false,
        };
        this.tabPositions = [];
        this.defaultOffSet = 0;
        this.currentIndex = 0;
    }

    componentWillMount() {
        const { data, defaultIndex } = this.props;
        this.currentIndex = defaultIndex;
        const list = data.map((d, index) => {
            if (this.currentIndex === index) {
                return { ...d, selected: true, _id: `${index}` };
            }
            return { ...d, selected: false, _id: `${index}` };
        });
        this.setState({ list });
    }

    componentWillReceiveProps(props) {
        const { data } = props;
        const list = data.map((d, index) => {
            if (this.currentIndex === index) {
                return { ...d, selected: true, _id: `${index}` };
            }
            return { ...d, selected: false, _id: `${index}` };
        });
        this.setState({ list });
    }

    shouldComponentUpdate(nextProps, nextState) {
        return (
            this.props.data !== nextProps.data ||
            this.state.list !== nextState.list
        );
    }

    scrollToIndex = (index, animated = true) => {
        let marginLeft = this.defaultOffSet;
        let marginRight = 0;
        let widthOfTabUnderline;
        let currentWidth = 0;
        this.tabPositions.forEach((position, idx) => {
            if (idx < index) {
                const { width } = position;
                marginLeft += width;
            }
            if (idx === index) {
                const { width } = position;
                marginLeft += Math.floor(width / 2);
                marginRight = Math.ceil(width / 2);
                currentWidth = width;
                widthOfTabUnderline = new Animated.Value(width);
            }
            if (idx > index) {
                const { width } = position;
                marginRight += width;
            }
        });

        const midPointOfScreen = Math.floor(screenWidth / 2);
        const offsetLeft = marginLeft - midPointOfScreen;
        const offsetRight = midPointOfScreen - marginRight;
        const leftOfTabUnderline = new Animated.Value(
            midPointOfScreen - currentWidth / 2,
        );

        const { leftDarkComponent } = this.props;
        // 设置背景 or 底部横线的位置
        const newState = { leftOfTabUnderline, widthOfTabUnderline };
        if (index !== 0 && leftDarkComponent) {
            newState.isShowDarkBtn = true; // 左侧的返回按钮
        } else {
            newState.isShowDarkBtn = false;
        }
        // 设置背景 or 底部横线的位置
        this.setState(newState);
        // 移动button的位置
        if (offsetLeft < 0) {
            this.list.scrollToOffset({ animated, offset: 0 });
            return;
        }
        if (offsetRight > 0) {
            this.list.scrollToEnd();
            return;
        }
        this.list.scrollToOffset({ animated, offset: offsetLeft });
    };

    goToIndex = index => {
        const { list } = this.state;
        const newList = list.map((d, idx) => {
            if (index === idx) {
                return { ...d, selected: true };
            }
            return { ...d, selected: false };
        });
        this.setState({ list: newList });
        this.scrollToIndex(index);
    };

    onClickItem = ({ item, index }) => {
        const { onItemChanged } = this.props;
        this.scrollToIndex(index);
        if (this.currentIndex === index) {
            return;
        }
        this.currentIndex = index;
        onItemChanged && onItemChanged(index, item);
        const { list } = this.state;
        const newList = list.map((d, idx) => {
            if (index === idx) {
                return { ...d, selected: true };
            }
            return { ...d, selected: false };
        });
        this.setState({ list: newList });
    };

    measureTab = (index, event) => {
        const { x, width, height } = event.nativeEvent.layout;
        this.tabPositions[index] = { left: x, right: x + width, width, height };
    };

    getStyles = (index, selected) => {
        const { type } = this.props;
        let viewStyle;
        let textStyle;
        if (type === 'vod') {
            // 第二个以及后面的tab
            if (selected) {
                viewStyle = styles.selectedTextViewStyle;
                textStyle = styles.selectedTextStyle;
                return { viewStyle, textStyle };
            }
            viewStyle = styles.textViewStyle;
            textStyle = styles.textStyle;
            return { viewStyle, textStyle };
        }
        // index为第一个时候单独处理时候
        // 白色 透明度0.4
        if (index === 0) {
            // 如果选择第一个
            if (selected) {
                textStyle = {
                    fontSize: 18,
                    lineHeight: 24,
                    color: '#FFFFFF',
                };
                viewStyle = {
                    width: 50,
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: 28,
                    paddingBottom: 1,
                };
            } else {
                textStyle = {
                    fontSize: 14,
                    lineHeight: 18,
                    color: '#545454',
                };
                viewStyle = {
                    width: 50,
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: 28,
                    paddingBottom: 1,
                };
            }
            return { viewStyle, textStyle };
        }
        // 第二个以及后面的tab
        if (selected) {
            viewStyle = styles.selectedTextViewStyle;
            textStyle = styles.selectedTextStyle;
            return { viewStyle, textStyle };
        }
        if (this.currentIndex === 0) {
            viewStyle = styles.textViewStyle;
            textStyle = [styles.textStyle, { color: '#000000', opacity: 0.6 }];
        } else {
            viewStyle = styles.textViewStyle;
            textStyle = styles.textStyle;
        }
        return { viewStyle, textStyle };
    };

    renderTabBarItem = ({ item, index }) => {
        const { selected } = item;
        const { viewStyle, textStyle } = this.getStyles(index, selected);
        return (
            <Button
                onPress={() => this.onClickItem({ item, index })}
                style={styles.tabbar}
                onLayout={this.measureTab.bind(this, index)}
            >
                <View style={viewStyle}>
                    <Text style={textStyle}>{item.title || item.name}</Text>
                </View>
            </Button>
        );
    };

    render() {
        const { leftComponent, leftDarkComponent, style } = this.props;
        const { list, isShowDarkBtn } = this.state;
        const dynamicTabUnderline = {
            left: this.state.leftOfTabUnderline,
            width: this.state.widthOfTabUnderline,
        };
        return (
            <View style={[styles.container, style]}>
                {/* <Animated.View style={[styles.tabUnderlineStyle,dynamicTabUnderline]} /> */}
                <View
                    ref={a => (this.left = a)}
                    style={styles.headerLeft}
                    onLayout={() => {
                        const handle = findNodeHandle(this.left);
                        UIManager.measure(handle, (x, width) => {
                            this.defaultOffSet = x + width;
                        });
                    }}
                >
                    {isShowDarkBtn ? leftDarkComponent : leftComponent}
                </View>
                <FlatList
                    ref={a => (this.list = a)}
                    data={list}
                    horizontal
                    initialNumToRender={5}
                    style={styles.tabbarList}
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={item => item._id}
                    renderItem={this.renderTabBarItem}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 44,
        position: 'absolute',
        left: 0,
        right: 0,
        top: 20,
    },
    tabbarContainer: {
        height: 44,
    },
    headerLeft: {},
    tabbarList: {},
    tabbar: {
        height: 30,
        justifyContent: 'center',
    },
    content: {
        flex: 1,
    },
    tabUnderlineStyle: {
        position: 'absolute',
        height: 24,
        borderRadius: 12,
        backgroundColor: '#ffc000',
        bottom: 0,
    },
    textStyle: {
        fontSize: 14,
        lineHeight: 18,
        color: '#545454',
    },
    selectedTextStyle: {
        color: '#FFFFFF',
        lineHeight: 18,
        fontSize: 14,
    },
    textViewStyle: {
        paddingHorizontal: 10,
        borderRadius: 12,
        height: 24,
        justifyContent: 'center',
        alignItems: 'center',
    },
    selectedTextViewStyle: {
        paddingHorizontal: 10,
        borderRadius: 12,
        height: 24,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FDBB3F',
    },
});
