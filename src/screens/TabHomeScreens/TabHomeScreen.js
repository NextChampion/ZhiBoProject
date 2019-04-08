import React, { Component } from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import PropTypes from 'prop-types';
import Swiper from 'react-native-swiper';

// import { connect } from '../../redux';
import Container from '../../components/Container';
import CXScrollableTabView from '../../components/CXScrollableTabView';
import UI from '../../UI';
import LocalData from './LocalData';

export default class Splash extends Component {
    static propTypes = {
        navigation: PropTypes.shape({
            navigate: PropTypes.func.isRequired,
        }).isRequired,
    };

    state = {
        list: LocalData.swiperListData,
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
                        <View style={styles.content} key={0} tabLabel={title}>
                            <View style={styles.swiperContainer}>
                                <Swiper style={styles.wrapper} autoplay>
                                    <View style={styles.slide1}>
                                        <Text style={styles.text}>
                                            Hello Swiper
                                        </Text>
                                    </View>
                                    <View style={styles.slide2}>
                                        <Text style={styles.text}>
                                            Beautiful
                                        </Text>
                                    </View>
                                    <View style={styles.slide3}>
                                        <Text style={styles.text}>
                                            And simple
                                        </Text>
                                    </View>
                                </Swiper>
                            </View>
                            <FlatList
                                data={LocalData.listData}
                                renderItem={this.renderListItem}
                            />
                        </View>,
                    );
                } else {
                    components.push(
                        <View style={styles.content} key={id} tabLabel={title}>
                            <Text>2222</Text>
                        </View>,
                    );
                }
            });
        }
        return components;
    };

    render() {
        const { list } = this.state;
        return (
            <Container style={{ paddingBottom: UI.IS_IPHONE_X ? 24 : 0 }}>
                <CXScrollableTabView
                    data={list}
                    isAbsolutePosition
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
