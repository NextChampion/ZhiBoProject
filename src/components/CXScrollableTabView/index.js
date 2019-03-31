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
import { StyleSheet, FlatList, View, Text } from 'react-native';
import PropTypes from 'prop-types';

import Header from './Header';
import Content from './Content';

const TAG = '[RN_JJScrollableTabView]';

export default class JJScrollableTabView extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    static propTypes = {
        data: PropTypes.array,
    };

    static defaultProps = {
        data: [],
    };

    onTabbarChanged = index => {
        this.content.goToPage(index);
    };

    onContentPageChanged = index => {
        this.tabbar.goToIndex(index);
    };

    render() {
        const { data, initialPage, leftComponent, tabItemStyle } = this.props;
        return (
            <View style={styles.container}>
                <Content
                    ref={a => (this.content = a)}
                    onPageChanged={this.onContentPageChanged}
                    initialPage={initialPage}
                    data={data}
                >
                    {data.map((d, index) => (
                        <View
                            key={d.title}
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
                <Header
                    leftComponent={leftComponent}
                    tabItemStyle={tabItemStyle}
                    ref={a => (this.tabbar = a)}
                    data={data}
                    onItemChanged={this.onTabbarChanged}
                />
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
