import React, { Component } from 'react';
import { TouchableOpacity, findNodeHandle } from 'react-native';
import PropTypes from 'prop-types';
import { UIManager } from 'NativeModules';

const Button = props => {
    return <TouchableOpacity {...props}>{props.children}</TouchableOpacity>;
};

module.exports = Button;
