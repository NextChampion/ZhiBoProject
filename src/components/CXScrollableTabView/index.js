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
    DeviceEventEmitter,
} from 'react-native';
import PropTypes from 'prop-types';

import Header from './Header';
import Content from './Content';

export default class JJScrollableTabView extends Component {
    static propTypes = {
        data: PropTypes.array,
        isAbsolutePosition: PropTypes.bool,
        type: PropTypes.string,
        locked: PropTypes.bool,
        onTabBarChenged: PropTypes.func,
    };

    static defaultProps = {
        data: [],
        isAbsolutePosition: false,
        type: 'home',
        locked: false,
        onTabBarChenged: null,
    };

    constructor(props) {
        super(props);
        this.state = {};
        this.currentIndex = 0;
    }

    componentDidMount() {
        this.listener = DeviceEventEmitter.addListener(
            'didTabBarChanged',
            this.onRootTabBarChanged,
        );
    }

    componentWillUnmount() {
        this.listener && this.listener.remove();
    }

    onTabbarChanged = index => {
        this.currentIndex = index;
        const { onTabBarChenged } = this.props;
        onTabBarChenged && onTabBarChenged(index);
        this.content.goToPage(index);
    };

    onRootTabBarChanged = index => {
        if (index === 0) {
            const { onTabBarChenged } = this.props;
            onTabBarChenged && onTabBarChenged(this.currentIndex);
        }
    };

    onContentPageChanged = index => {
        this.tabbar.goToIndex(index);
    };

    render() {
        const {
            data,
            initialPage,
            children,
            leftComponent,
            leftDarkComponent,
            isAbsolutePosition,
            type,
            locked,
            headerStyle,
            contentStyle,
        } = this.props;
        if (isAbsolutePosition) {
            return (
                <View style={styles.container}>
                    <Content
                        ref={a => (this.content = a)}
                        onPageChanged={this.onContentPageChanged}
                        initialPage={initialPage}
                        data={data}
                        locked={locked}
                    >
                        {children.length
                            ? children
                            : data.map((d, index) => (
                                  <View
                                      key={index}
                                      tabLabel={d.title}
                                      style={[
                                          styles.innerContainer,
                                          index > 0 && contentStyle,
                                      ]}
                                  >
                                      <Text>{d.title}</Text>
                                  </View>
                              ))}
                    </Content>
                    <Header
                        type={type}
                        style={headerStyle}
                        leftComponent={leftComponent}
                        leftDarkComponent={leftDarkComponent}
                        ref={a => (this.tabbar = a)}
                        data={data}
                        onItemChanged={this.onTabbarChanged}
                    />
                </View>
            );
        }
        return (
            <View style={styles.container}>
                <Header
                    leftComponent={leftComponent}
                    leftDarkComponent={leftDarkComponent}
                    ref={a => (this.tabbar = a)}
                    data={data}
                    onItemChanged={this.onTabbarChanged}
                    style={styles.header}
                />
                <Content
                    ref={a => (this.content = a)}
                    onPageChanged={this.onContentPageChanged}
                    initialPage={initialPage}
                    data={data}
                    locked={locked}
                >
                    {children.length
                        ? children
                        : data.map((d, index) => (
                              <View
                                  key={index}
                                  tabLabel={d.title}
                                  style={[
                                      styles.innerContainer,
                                      index > 0 && { marginTop: 64 },
                                  ]}
                              >
                                  <Text>{d.title}</Text>
                              </View>
                          ))}
                </Content>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    tabbarContainer: {
        height: 44,
    },
    header: {
        position: 'relative',
        backgroundColor: 'red',
    },
    headerLeft: {},
    tabbarList: {},
    tabbar: {},
    content: {
        flex: 1,
    },
    innerContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'green',
    },
});
