import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import PropTypes from 'prop-types';
import Swiper from 'react-native-swiper';
import { connect } from '../redux';
import Container from '../components/Container';
import UI from '../UI';
import Button from '../components/Button';

class Splash extends Component {
    static propTypes = {
        navigation: PropTypes.shape({
            navigate: PropTypes.func.isRequired,
        }).isRequired,
    };

    state = {
        showsPagination: true,
    };

    componentWillMount() {
        const { version } = this.props;
        console.log('version', version);
    }

    componentDidMount() {}

    onStart = () => {
        const { navigation } = this.props;
        navigation.navigate('main');
    };

    onIndexChanged = index => {
        if (index > 2) {
            this.setState({ showsPagination: false });
        } else {
            this.setState({ showsPagination: true });
        }
    };

    render() {
        const { showsPagination } = this.state;
        return (
            <Container style={{ paddingBottom: UI.IS_IPHONE_X ? 24 : 0 }}>
                <Swiper
                    style={styles.wrapper}
                    loop={false}
                    onIndexChanged={this.onIndexChanged}
                    showsPagination={showsPagination}
                >
                    <View style={styles.slide4}>
                        <View
                            style={{
                                flex: 1,
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <Text style={styles.text}>SplashScreen</Text>
                        </View>
                        <Button
                            type="small"
                            name="Get Started"
                            onPress={this.onStart}
                        />
                    </View>
                    <View style={styles.slide1}>
                        <Text style={styles.text}>Hello Swiper</Text>
                    </View>
                    <View style={styles.slide2}>
                        <Text style={styles.text}>Beautiful</Text>
                    </View>
                    <View style={styles.slide3}>
                        <Text style={styles.text}>Beautiful</Text>
                    </View>
                </Swiper>
            </Container>
        );
    }
}

export default connect(['version'])(Splash);

const styles = StyleSheet.create({
    slide1: {
        flex: 1,
        backgroundColor: UI.color.green1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    slide2: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: UI.color.yellow1,
    },
    slide3: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: UI.color.purple,
    },
    slide4: {
        flex: 1,
        paddingVertical: UI.unit * 4,
        backgroundColor: UI.color.red1,
    },
    images: {
        paddingTop: 112,
        alignItems: 'center',
    },
    image: {
        width: 327,
        height: 216,
        backgroundColor: 'red',
    },
    content: {
        flex: 1,
        marginTop: 56,
        paddingHorizontal: UI.unit * 4,
    },
    text: {
        fontSize: 20,
        color: UI.color.black,
        fontFamily: 'AvenirNext-Medium',
    },
});
