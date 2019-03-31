import React from 'react';
import { TouchableOpacity } from 'react-native';

const Button = props => {
    const { children } = props;
    return <TouchableOpacity {...props}>{children}</TouchableOpacity>;
};

module.exports = Button;
