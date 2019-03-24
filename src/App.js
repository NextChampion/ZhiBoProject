import React, { Component } from 'react';
import SplashScreen from 'react-native-splash-screen';
import { store, onLoadRedux, Provider } from './redux';

import Navigator from './navigators/index';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
    };
  }

  componentDidMount() {
    SplashScreen.hide();
    onLoadRedux(states => {
      this.setState({ loaded: true });
    });
  }

  render() {
    const { loaded } = this.state;
    if (!loaded) {
      return null;
    }
    return (
      <Provider store={store}>
        <Navigator />
      </Provider>
    );
  }
}
