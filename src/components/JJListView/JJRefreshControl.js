/**
 * 下拉刷新的视图
 * 状态
 * 1: 显示"下拉刷新"文字.
 * 2: 显示"松开刷新"
 * 3: "刷新中..."
 * 4: 刷新成功
 */
import React, { Component } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import PropTypes from 'prop-types';
// import UI from '../UI';
export const RefreshControlStatus = {
    pullToRefresh: 1,
    releaseToRefresh: 2,
    refreshing: 3,
    refreshed: 4,
};

export default class JJRefreshControl extends Component {
    static propTypes = {
        status: PropTypes.number,
    };

    static defaultProps = {
        status: 1,
    };

    shouldComponentUpdate(nextProps) {
        const { status } = this.props;
        return status !== nextProps.status;
    }

    render() {
        console.debug('[render] JJRefreshControll');
        const { status } = this.props;
        if (status === RefreshControlStatus.pullToRefresh) {
            return (
                <View style={styles.container}>
                    <Image style={styles.image} />
                    <Text style={styles.text}>下拉刷新</Text>
                </View>
            );
        }
        if (status === RefreshControlStatus.releaseToRefresh) {
            return (
                <View style={styles.container}>
                    <Image style={styles.image} />
                    <Text style={styles.text}>松开刷新</Text>
                </View>
            );
        }
        if (status === RefreshControlStatus.refreshing) {
            return (
                <View style={styles.container}>
                    <Image style={styles.image} />
                    <Text style={styles.text}>刷新中...</Text>
                </View>
            );
        }
        if (status === RefreshControlStatus.refreshed) {
            return (
                <View style={styles.container}>
                    <Image style={styles.image} />
                    <Text style={styles.text}>刷新成功</Text>
                </View>
            );
        }
        // status === 1
        return (
            <View style={styles.container}>
                <Image style={styles.image} />
                <Text style={styles.text}>下拉刷新</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: 30,
        height: 30,
        backgroundColor: 'red',
        marginRight: 12,
    },
    text: {
        color: 'green',
    },
});
