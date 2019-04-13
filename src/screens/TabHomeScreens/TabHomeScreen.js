import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import PropTypes from 'prop-types';

// import { connect } from '../../redux';
import Container from '../../components/Container';
import CXScrollableTabView from '../../components/CXScrollableTabView';
import RecommandScreen from './RecommandScreen';
import LiveListScreen from './LiveListScreen';
import UI from '../../UI';
import LocalData from './LocalData';

export default class Splash extends Component {
    static propTypes = {
        navigation: PropTypes.shape({
            navigate: PropTypes.func.isRequired,
        }).isRequired,
    };

    state = {
        list: LocalData.tabbarListData,
    };

    componentDidMount() {}

    renderListItem = ({ item }) => {
        const { title } = item;
        return (
            <View>
                <Text>{title}</Text>
            </View>
        );
    };

    renderGameTypeView = data => {
        const components = [];
        if (data != null) {
            data.forEach(b => {
                const { id, title } = b;
                if (id === 1) {
                    components.push(
                        <RecommandScreen key={id} {...this.props} />,
                    );
                } else {
                    components.push(
                        <LiveListScreen key={id} {...this.props} />,
                    );
                }
            });
        }
        return components;
    };

    render() {
        const { list } = this.state;
        return (
            <Container style={{ flex: 1 }}>
                <CXScrollableTabView
                    data={list}
                    tabItemStyle={styles.tabItemStyle}
                >
                    {this.renderGameTypeView(list)}
                </CXScrollableTabView>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    tabItemStyle: {
        backgroundColor: UI.color.primary1,
    },
    content: {
        flex: 1,
    },
    swiperContainer: {
        height: 220,
    },
    wrapper: {},
    slide1: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#9DD6EB',
    },
    slide2: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#97CAE5',
    },
    slide3: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#92BBD9',
    },
    text: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold',
    },
});
