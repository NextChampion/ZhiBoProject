import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import PropTypes from 'prop-types';
import UI from '../UI';

const marginTops = {
  small: 0,
  large: 20,
  popup: 24,
  popup2: 20,
};

export default class Button extends Component {
  static propTypes = {
    onPress: PropTypes.func,
    name: PropTypes.string.isRequired,
    noFill: PropTypes.bool,
    color: PropTypes.string,
    type: PropTypes.string,
    imageSource: PropTypes.number,
    enabled: PropTypes.bool,
    asynchronous: PropTypes.bool,
  };

  static defaultProps = {
    onPress: null,
    noFill: false,
    color: UI.color.primary1,
    type: 'large',
    imageSource: null,
    enabled: true,
    asynchronous: false,
  };

  state = {
    loading: false,
  };

  shouldComponentUpdate(nextProps, state) {
    if (
      this.props.name !== nextProps.name ||
      this.props.enabled !== nextProps.enabled ||
      this.props.asynchronous !== nextProps.asynchronous ||
      this.state.loading !== state.loading
    ) {
      return true;
    }
    return false;
  }

  onPress = () => {
    const { onPress } = this.props;
    this.setState({ loading: true });
    onPress();
  };

  render() {
    console.debug('[render] Button');
    const {
      name,
      onPress,
      noFill,
      color,
      type,
      imageSource,
      enabled,
      asynchronous,
    } = this.props;
    const buttonStyle = [
      styles.button,
      styles[`${type}Button`],
      color && {
        backgroundColor:
          enabled && !this.state.loading ? color : UI.color.disable,
      },
      noFill && {
        backgroundColor: UI.color.bg1,
        borderColor: enabled && !this.state.loading ? color : UI.color.disable,
        borderWidth: 1,
      },
    ];
    const textStyle = [styles.text, styles[`${type}Text`], noFill && { color }];
    return (
      <TouchableOpacity
        style={{ marginTop: marginTops[type] }}
        disabled={!enabled || this.state.loading}
        onPress={asynchronous ? this.onPress : onPress}
      >
        <View style={buttonStyle}>
          {this.state.loading ? (
            <ActivityIndicator style={{ marginRight: 12 }} />
          ) : (
            imageSource && (
              <Image
                source={imageSource}
                style={{ width: 24, height: 24, marginRight: 12 }}
              />
            )
          )}
          <Text style={textStyle}>{name}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  largeButton: {
    height: UI.unit * 8,
    borderRadius: 12,
    marginHorizontal: UI.unit * 4,
    flexDirection: 'row',
  },
  popupButton: {
    height: UI.unit * 8,
    borderRadius: 12,
    marginHorizontal: 0,
  },
  popup2Button: {
    height: UI.unit * 8,
    width: 120,
    borderRadius: 12,
    marginHorizontal: 0,
  },
  smallButton: {
    paddingHorizontal: 18,
    height: UI.unit * 8,
    borderRadius: 12,
    flexDirection: 'row',
    marginHorizontal: UI.unit * 4,
  },
  text: {
    fontFamily: 'Avenir Next',
    fontWeight: '500',
    fontSize: 16,
    lineHeight: 24,
    height: 24,
    color: UI.color.white1,
  },
  smallText: { fontSize: 16, lineHeight: 24, height: 24 },
  largeText: { fontSize: 20, lineHeight: 30, height: 30 },
});
