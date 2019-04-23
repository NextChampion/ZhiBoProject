/*
 * JJRefreshFlatList.js
 * created by wk on 20180716
 * 海豚转动小动画
 */

import React, { Component } from 'react';
import { StyleSheet, View, Animated, Easing, Text } from 'react-native';
import PropTypes from 'prop-types';

const refreshingImg = require('./img/refreshing.png');

export default class JJLiveLoading extends Component {
    static propTypes = {
        text: PropTypes.string,
    };

    static defaultProps = {
        text: '加载中...',
    };

    constructor(props) {
        super(props);
        this.state = {
            // 转圈的动画初始化
            arrowAngle: new Animated.Value(0),
        };
    }

    componentDidMount() {
        this.stopFlag = true;
        if (!this.animated) {
            this.startAnimation();
        }
    }

    componentWillUnmount() {
        this.stopFlag = false;
        this.animated.stop(() => {});
    }

    /**
     * 执行海豚外环动画
     * @private
     */
    startAnimation = () => {
        const { arrowAngle } = this.state;
        arrowAngle.setValue(0);
        this.animated = Animated.timing(arrowAngle, {
            toValue: 1,
            duration: 800,
            easing: Easing.linear,
        });
        this.animated.start(() => {
            if (this.stopFlag) {
                return this.startAnimation();
            }
            return null;
        });
    };

    render() {
        const { text, imageStyle, textStyle } = this.props;
        const { arrowAngle } = this.state;
        return (
            <View style={styles.container} {...this.props}>
                <Animated.Image
                    style={[
                        [styles.iconStyle, imageStyle],
                        {
                            transform: [
                                {
                                    rotate: arrowAngle.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: ['0deg', '360deg'],
                                    }),
                                },
                            ],
                        },
                    ]}
                    source={refreshingImg}
                />
                <Text style={textStyle}>{text}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    iconStyle: {
        width: 19,
        height: 19,
    },
});
