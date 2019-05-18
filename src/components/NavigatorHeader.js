import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';
import UI from '../UI';

export default class NavigationHeader extends Component {
    static propTypes = {
        leftItem: PropTypes.shape({}),
        rightItem: PropTypes.shape({}),
        titleView: PropTypes.shape({}),
        hideStatusBar: PropTypes.bool,
        hide: PropTypes.bool,
        height: PropTypes.number,
        isAbsolute: PropTypes.bool,
    };

    static defaultProps = {
        leftItem: null,
        rightItem: null,
        titleView: null,
        hideStatusBar: false,
        hide: false,
        height: 44,
        isAbsolute: false,
    };

    shouldComponentUpdate(nextProps) {
        const { leftItem, rightItem, titleView } = this.props;
        if (
            leftItem !== nextProps.leftItem ||
            rightItem !== nextProps.rightItem ||
            titleView !== nextProps.titleView
        ) {
            return true;
        }
        return false;
    }

    render() {
        console.debug('[render] NavigationHeader');
        const {
            leftItem,
            rightItem,
            titleView,
            height,
            hideStatusBar,
            hide,
            isAbsolute,
        } = this.props;
        return (
            <View style={isAbsolute ? styles.absolute : null}>
                {hideStatusBar ? null : <View style={styles.statusBar} />}
                {hide ? null : (
                    <View style={[styles.container, height && { height }]}>
                        {leftItem && leftItem}
                        {titleView && titleView}
                        {rightItem && rightItem}
                    </View>
                )}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        height: 44,
        backgroundColor: UI.color.bg1,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    absolute: {
        position: 'absolute',
        top: 0,
        width: '100%',
    },
    statusBar: {
        height: UI.IS_IPHONE_X ? 44 : 20,
        backgroundColor: UI.color.bg1,
    },
});
