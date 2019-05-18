import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import Swiper from 'react-native-swiper';
// import { connect } from '../../../redux';
import Container from '../../../components/Container';
import RoomListItem from '../../../components/RoomListItem';
import UI from '../../../UI';
import LocalData from '../LocalData';
import NavigationHeader from '../../../components/NavigatorHeader';
import LiveRoomTabView from './LiveRoomTabView';

const TAG = '[]LiveRoomScreen]';

export default class LiveRoomScreen extends Component {
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

    goBack = () => {
        const { navigation } = this.props;
        if (navigation) {
            navigation.goBack();
        }
    };

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
            <Container style={{ paddingBottom: 0, marginTop: 0 }}>
                <View style={styles.playerContainer}>
                    <Text>播放器</Text>
                </View>
                <View style={styles.liveInfoContainer}>
                    <LiveRoomTabView />
                </View>
                <NavigationHeader
                    leftItem={
                        <TouchableOpacity onPress={this.goBack}>
                            <Text style={styles.backText}>返回</Text>
                        </TouchableOpacity>
                    }
                    isAbsolute
                />
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    playerContainer: {
        flex: 1,
        backgroundColor: UI.color.black,
    },
    liveInfoContainer: {
        flex: 2,
        backgroundColor: UI.color.bg1,
    },
    backText: {
        color: 'white',
    },
});
