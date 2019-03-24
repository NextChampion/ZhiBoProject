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
'use strict';
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

const {height, width: screenWidth} = Dimensions.get('window');
const TAG = "[RN_Header]";

export default class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
            leftOfTabUnderline: new Animated.Value(0),
            widthOfTabUnderline: new Animated.Value(100),
        }
        this.tabPositions = [];
        this.defaultOffSet = 0;
        this.currentIndex = 0;
    }

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

    componentWillMount() {
        const { data, defaultIndex } = this.props;
        this.currentIndex = defaultIndex;
        const list = data.map((d, index) => {
            if (this.currentIndex === index) {
                return { ...d, selected: true, _id: `${index}`};
            } else {
                return { ...d, selected: false, _id: `${index}`};
            }
        })
        this.setState({ list });
    }

    componentDidMount() {
    }

    scrollToIndex = (index, animated = true) => {
        let marginLeft = this.defaultOffSet;
        let marginRight = 0;
        let widthOfTabUnderline;
        let currentWidth=0;
        this.tabPositions.forEach((position, idx) => {
            if (idx < index) {
                const { width } = position
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
                const { width } = position
                marginRight += width;
            }
        })
        
        const midPointOfScreen = Math.floor(screenWidth / 2);
        const offsetLeft = marginLeft - midPointOfScreen;
        const offsetRight = midPointOfScreen - marginRight;
        const leftOfTabUnderline = new Animated.Value(midPointOfScreen- currentWidth/ 2);

        // 设置背景 or 底部横线的位置
        this.setState({
            leftOfTabUnderline,
            widthOfTabUnderline
        })
        // 移动button的位置
        if (offsetLeft < 0 ) {
        this.list.scrollToOffset({animated, offset: 0});
        return;
        }
        if (offsetRight > 0) {
            this.list.scrollToEnd();
            return;
        }
        this.list.scrollToOffset({animated, offset: offsetLeft});
        
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
        const newList = list.map((d,idx) => {
            if (index === idx) {
                return { ...d, selected: true };
            } else {
                return { ...d, selected: false };
            }
        })
        this.setState({list: newList });
    }

    goToIndex = index => {
        const { list } = this.state;
        const newList = list.map((d,idx) => {
            if (index === idx) {
                return { ...d, selected: true };
            } else {
                return { ...d, selected: false };
            }
        })
        this.setState({list: newList });
    }

    measureTab = (index, event) => {
        const { x, width, height, } = event.nativeEvent.layout;
        this.tabPositions[index] = { left: x, right: x + width, width, height };
    }

    getStyles = (index, selected) => {
        let viewStyle; 
        let textStyle;
        if (index === 0) {
            if (selected) {
                textStyle = {
                    fontSize: 18,
                    color: '#FFFFFF',
                };
                viewStyle = {
                    width: 50, 
                    alignItems: 'center', 
                    justifyContent: 'center',
                }
            } else {
                textStyle = {
                    fontSize: 14,
                };
                viewStyle = {
                    width: 50, 
                    alignItems: 'center', 
                    justifyContent: 'center',
                }
            }
            return { viewStyle, textStyle };
        }

        if (selected) {
            viewStyle = styles.selectedTextViewStyle;
            textStyle = styles.selectedTextStyle;
            return { viewStyle, textStyle };
        } 
        viewStyle = styles.textViewStyle;
        textStyle = styles.textStyle;
        return { viewStyle, textStyle };
    }

    renderTabBarItem = ({ item, index }) => {
        const { selected } = item;
        const { viewStyle, textStyle } = this.getStyles(index, selected);
        return (
            <Button
                onPress={() => {
                    this.onClickItem({ item, index })
                }}
                style={styles.tabbar}
                onLayout={this.measureTab.bind(this, index)}
            >   
                <View style={viewStyle}>
                    <Text style={textStyle}>{item.title}</Text>
                </View>
            </Button>
        )
    }

    render() {
        const { list } = this.state;
        const dynamicTabUnderline = {
            left: this.state.leftOfTabUnderline,
            width: this.state.widthOfTabUnderline,
        };
        return (
            <View style={styles.container}>
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
                    <Text>返回</Text>
                </View>
                <FlatList
                    ref={a => (this.list = a)}
                    data={list}
                    horizontal
                    initialNumToRender={5}
                    style={styles.tabbarList}
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item) => item._id}
                    renderItem={this.renderTabBarItem}
                />
            </View>
        );
    }
};

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
    headerLeft: {
        paddingHorizontal: 10,
    },
    tabbarList: {
    },
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
        color: 'rgba(0,0,0,0.8)',
    },
    selectedTextStyle: {
        color: '#FFFFFF',
    },
    textViewStyle: {
        paddingHorizontal: 10,
        borderRadius: 8,
        paddingVertical: 4,
    },
    selectedTextViewStyle: {
        paddingHorizontal: 10,
        borderRadius: 10,
        paddingVertical: 4,
        backgroundColor: '#FDBB3F'
    },
    
});