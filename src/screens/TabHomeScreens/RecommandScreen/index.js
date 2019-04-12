import React, { Component } from 'react';
import { StyleSheet, View, Text, SectionList } from 'react-native';
import PropTypes from 'prop-types';
import Swiper from 'react-native-swiper';
import { connect } from '../../../redux';
import Container from '../../../components/Container';
import RoomListItem from '../../../components/RoomListItem';
import UI from '../../../UI';
import LocalData from '../LocalData';

export default class RecommandScreen extends Component {
    static propTypes = {
        navigation: PropTypes.shape({
            navigate: PropTypes.func.isRequired,
        }).isRequired,
    };

    componentDidMount() {}

    renderItem = ({ item, index, section }) => {
        const numColumns = 2;

        if (index % numColumns !== 0) return null;

        const items = [];

        for (let i = index; i < index + numColumns; i += 1) {
            if (i >= section.data.length) {
                break;
            }

            items.push(<RoomListItem data={section.data[i]} />);
        }

        return (
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                }}
            >
                {items}
            </View>
        );
    };

    renderSectionHeader = ({ section: { title } }) => (
        <Text style={{ fontWeight: 'bold' }}>{title}</Text>
    );

    render() {
        return (
            <Container style={{ paddingBottom: UI.IS_IPHONE_X ? 24 : 0 }}>
                <View style={styles.swiperContainer}>
                    <Swiper style={styles.wrapper} autoplay>
                        <View style={styles.slide1}>
                            <Text style={styles.text}>Hello Swiper</Text>
                        </View>
                        <View style={styles.slide2}>
                            <Text style={styles.text}>Beautiful</Text>
                        </View>
                        <View style={styles.slide3}>
                            <Text style={styles.text}>And simple</Text>
                        </View>
                    </Swiper>
                </View>
                <SectionList
                    renderItem={this.renderItem}
                    numColumns={2}
                    renderSectionHeader={this.renderSectionHeader}
                    sections={LocalData.roomListData}
                    keyExtractor={(item, index) => item.roomId}
                />
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
