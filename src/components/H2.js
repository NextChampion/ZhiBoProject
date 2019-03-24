import React, { Component } from 'react';
import { StyleSheet, Text } from 'react-native';
import PropTypes from 'prop-types';
import UI from '../UI';

export default class H2 extends Component {
  static propTypes = {
    children: PropTypes.string.isRequired,
    nopadding: PropTypes.bool,
    topless: PropTypes.bool,
    extraTopMargin: PropTypes.bool,
  };

  static defaultProps = {
    nopadding: false,
    topless: false,
    extraTopMargin: false,
  };

  shouldComponentUpdate(nextProps) {
    return this.props.children !== nextProps.children;
  }

  render() {
    console.debug('[render] H2');
    const { children, nopadding, topless, extraTopMargin } = this.props;
    return (
      <Text
        style={[
          styles.h2,
          nopadding && styles.nopadding,
          topless && {
            marginTop: UI.unit * 2,
          },
          extraTopMargin && {
            marginTop: UI.unit * 7,
          },
        ]}
      >
        {children}
      </Text>
    );
  }
}

const styles = StyleSheet.create({
  h2: {
    ...UI.font.title,
    color: UI.color.black,
    fontSize: UI.fontSize.large,
    marginHorizontal: UI.unit * 4,
    marginTop: UI.unit * 5,
    marginBottom: UI.unit * 1,
  },
  nopadding: {
    marginLeft: 0,
  },
});
