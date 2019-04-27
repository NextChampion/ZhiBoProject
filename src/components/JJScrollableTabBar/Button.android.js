const React = require('react');
const ReactNative = require('react-native');
const {
  TouchableNativeFeedback,
  TouchableOpacity,
  View,
} = ReactNative;

const Button = (props) => {
  return <TouchableOpacity
    // delayPressIn={0}
    // background={TouchableNativeFeedback.SelectableBackground()} // eslint-disable-line new-cap
    {...props}
  >
    {props.children}
  </TouchableOpacity>;
};

module.exports = Button;
