import React, { Component } from 'react';
import { StyleSheet, View, TouchableHighlight, Image } from 'react-native';
import PropTypes from 'prop-types';
import UI from '../UI';

export default class ItemLine extends Component {
  static propTypes = {
    children: PropTypes.object,
    narrow: PropTypes.bool,
    height: PropTypes.number,
    onPress: PropTypes.func,
    Icon: PropTypes.object,
    Left: PropTypes.object,
    disabled: PropTypes.bool,
    noBorder: PropTypes.bool,
    lineHeight: PropTypes.number,
    narrowPaddingLeft: PropTypes.bool,
    isInput: PropTypes.bool
  };

  static defaultProps = {
    children: null,
    narrow: false,
    height: UI.IS_IPHONE_SE ? 60 : 70,
    onPress: null,
    Icon: null,
    Left: null,
    Right: null,
    disabled: false,
    stateImage: null,
    noBorder: false,
    lineHeight: null,
    narrowPaddingLeft: false,
    isInput: false
  };
  shouldComponentUpdate(props) {
    return (
      props.children !== this.props.children ||
      props.Icon !== this.props.Icon ||
      props.Left !== this.props.Left ||
      props.Right !== this.props.Right ||
      props.disabled !== this.props.disabled ||
      props.narrow !== this.props.narrow ||
      props.warn !== this.props.warn ||
      props.lineHeight !== this.props.lineHeight ||
      props.style !== this.props.style
    );
  }

  render() {
    console.debug('[render] ItemLine');
    const {
      children,
      narrow,
      onPress,
      Icon,
      Left,
      Right,
      disabled,
      stateImage,
      height,
      noBorder,
      lineHeight,
      narrowPaddingLeft,
      style,
      isInput,
    } = this.props;
    if (onPress) {
      return (
        <TouchableHighlight
          {...this.props}
          disabled={disabled}
          underlayColor="#eee"
          style={[
            styles.container,
            narrow ? { height: UI.IS_IPHONE_SE ? 50 : 60 } : { height },
            narrowPaddingLeft && { paddingLeft: UI.unit * 3 },
            lineHeight && { height: lineHeight },
            style && style,
          ]}
          onPress={onPress}
        >
          <View style={[styles.content, noBorder && { borderBottomWidth: 0 }]}>
            {Icon && (
              <View
                style={{
                  marginRight: narrowPaddingLeft ? UI.unit * 2 : UI.unit * 3,
                }}
              >
                {Icon}
              </View>
            )}
            {stateImage && <Image source={stateImage} style={styles.warn} />}
            {Left}
            {Right}
          </View>
        </TouchableHighlight>
      );
    }

    return (
      <View
        {...this.props}
        style={[
          styles.container,
          narrow ? { height: UI.IS_IPHONE_SE ? 50 : 60 } : { height },
          narrowPaddingLeft && { paddingLeft: UI.unit * 3 },
          lineHeight && { height: lineHeight },
          style && style,
        ]}
      >
        <View style={[styles.content, noBorder && { borderBottomWidth: 0 }, isInput && {borderColor: UI.color.border2}]}>
          {Icon && <View style={{ marginRight: UI.unit * 3 }}>{Icon}</View>}
          {Left}
          {Right}
        </View>
      </View>
    );
  }
}

ItemLine.Left = ({ children }) => (
  <View style={{ flex: 1, flexDirection: 'column' }}>{children}</View>
);

ItemLine.Right = ({ children }) => (
  <View
    style={{
      flexDirection: 'column',
      alignItems: 'flex-end',
    }}
  >
    {children}
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    height: UI.IS_IPHONE_SE ? 60 : 70,
    backgroundColor: UI.color.bg1,
    paddingLeft: UI.unit * 4,
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: UI.unit * 4,
    borderColor: UI.color.border,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  warn: {
    position: 'absolute',
    left: 20,
    top: UI.IS_IPHONE_SE ? 33 : 38,
    width: 18,
    height: 18,
    borderRadius: 5,
  },
});
