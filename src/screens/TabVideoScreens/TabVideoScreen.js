import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from '../../redux';
import Container from '../../components/Container';
import UI from '../../UI';

export default class TabVideoScreen extends Component {
  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func.isRequired,
    }).isRequired,
  };

  componentDidMount() {}

  render() {
    return (
      <Container style={{ paddingBottom: UI.IS_IPHONE_X ? 24 : 0 }}>
        <Text>TabVideoScreen</Text>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
});
