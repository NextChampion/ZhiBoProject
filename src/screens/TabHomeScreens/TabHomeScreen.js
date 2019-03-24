import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from '../../redux';
import Container from '../../components/Container';
import CXScrollableTabView from '../../components/CXScrollableTabView';
import UI from '../../UI';

export default class Splash extends Component {
    static propTypes = {
        navigation: PropTypes.shape({
            navigate: PropTypes.func.isRequired,
        }).isRequired,
    };

    state = {
        list: [
            {
                title: '推荐',
                id: 1,
            },
            {
                title: 'LOL',
                id: 2,
            },
            {
                title: 'Dota2',
                id: 3,
            },
            {
                title: 'DNF',
                id: 4,
            },
            {
                title: '绝地求生',
                id: 5,
            },
            {
                title: '刺激战场',
                id: 6,
            },
            {
                title: '王者荣耀',
                id: 7,
            },
        ]
    }

    componentDidMount() { }

    render() {
        return (
            <Container style={{ paddingBottom: UI.IS_IPHONE_X ? 24 : 0 }}>
                <CXScrollableTabView data={this.state.list} tabItemStyle={styles.tabItemStyle} />
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    tabItemStyle: {
        backgroundColor: UI.color.primary1,
    }
});
