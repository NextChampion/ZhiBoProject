import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import PropTypes from 'prop-types';
import Swiper from 'react-native-swiper';
// import { connect } from '../../../redux';
import Container from '../../components/Container';
import RoomListItem from '../../components/RoomListItem';
import JJListView from '../../components/JJListView';
import UI from '../../UI';
import LocalData from './LocalData';

const TAG = '[]LiveListScreen';

export default class LiveListScreen extends Component {
    static propTypes = {
        navigation: PropTypes.shape({
            navigate: PropTypes.func.isRequired,
        }).isRequired,
    };

    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {}

    renderItem = ({ index, section }) => {
        const numColumns = 2;
        if (index % numColumns !== 0) return null;
        const items = [];
        for (let i = index; i < index + numColumns; i += 1) {
            if (i >= section.data.length) {
                break;
            }
            const data = section.data[i];
            items.push(<RoomListItem key={data.roomId} data={data} />);
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

    renderFlatItem = ({ item }) => {
        return <RoomListItem key={item.roomId} data={item} />;
    };

    renderSectionHeader = ({ section: { title } }) => (
        <View style={styles.headerContainerView}>
            <Text key={title} style={{ fontWeight: 'bold' }}>
                {title}
            </Text>
        </View>
    );

    renderListHeaderComponent = () => {
        return (
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
        );
    };

    render() {
        console.debug('[render]', TAG);
        return (
            <Container style={{ paddingBottom: 0 }}>
                <JJListView
                    renderItem={this.renderFlatItem}
                    ListHeaderComponent={this.renderListHeaderComponent}
                    numColumns={2}
                    refreshThreshold={50}
                    showsVerticalScrollIndicator={false}
                    columnWrapperStyle={styles.columnWrapperStyle}
                    renderSectionHeader={this.renderSectionHeader}
                    data={LocalData.flatListData}
                    keyExtractor={item => item.roomId}
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
    headerContainerView: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 50,
        borderTopWidth: StyleSheet.hairlineWidth,
        borderColor: UI.color.border,
        backgroundColor: UI.color.white1,
    },
    columnWrapperStyle: {
        justifyContent: 'space-between',
    },
    refreshControl: {},
    swiperContainer: {
        height: 270,
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
