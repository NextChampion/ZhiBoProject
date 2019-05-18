import React, { Component } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native-gesture-handler';
import UI from '../UI';

const width = UI.size.screenWidth / 2 - 2;
const heightOfBg = width * 0.6;
const height = heightOfBg + 40;

export default class RoomListItem extends Component {
    static propTypes = {
        data: PropTypes.shape({
            name: PropTypes.string,
            coverUrl: PropTypes.string,
            anchorName: PropTypes.string,
            category: PropTypes.string,
            popularity: PropTypes.number,
            roomId: PropTypes.number,
        }),
        onPress: PropTypes.func,
    };

    static defaultProps = {
        data: null,
        onPress: null,
    };

    shouldComponentUpdate(nextProps) {
        const { data } = this.props;
        return data !== nextProps.data;
    }

    render() {
        console.debug('[render] RoomListItem');
        const { data, onPress } = this.props;
        const { name, coverUrl, anchorName, category, popularity } = data;
        console.log('data', data);

        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={onPress}>
                    <View style={styles.contentView}>
                        <Image
                            style={styles.bgImage}
                            source={{ uri: coverUrl }}
                        />
                        <View style={styles.contentTopView}>
                            <View style={styles.categoryView}>
                                <Text style={styles.categoryText}>
                                    {category}
                                </Text>
                            </View>
                        </View>
                        <View style={styles.contetnBottomView}>
                            <Text style={styles.anchorName}>{anchorName}</Text>
                            <Text style={styles.popularity}>{popularity}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
                <View>
                    <Text>{name}</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width,
        height,
    },
    contentView: {
        width,
        height: heightOfBg,
        justifyContent: 'space-between',
    },
    bgImage: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
    },
    contentTopView: {
        flexDirection: 'row',
    },
    categoryView: {
        paddingVertical: 2,
        paddingHorizontal: 5,
        borderRadius: 4,
    },
    categoryText: {
        color: UI.color.white1,
    },
    contetnBottomView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    anchorName: {
        color: UI.color.white1,
        paddingHorizontal: 5,
    },
    popularity: {
        color: UI.color.white1,
        paddingHorizontal: 5,
    },
});
