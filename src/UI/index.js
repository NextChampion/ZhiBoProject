import { Dimensions, Platform } from 'react-native';

const { width, height } = Dimensions.get('window');

const IS_IPHONE_SE = width < 350;
const IS_IPAD_PRO_97 = height === 480;
const IS_IPHONE_X = height === 812 || height === 896;
const IS_IPHONE_PLUS = height === 736;

let unit;
if (IS_IPHONE_PLUS) {
    unit = 7;
} else if (IS_IPHONE_SE) {
    unit = 5;
} else {
    unit = 6;
}

const color = {
    primary1: '#FFB911',
    unselected: '#cdcdcd',
    border: '#D8D7DC',
    disable: '#E6EFFA',
    transparent: 'transparent',

    bg1: '#FFFFFF', // '#FCFDFF',
    bg2: '#F5F9FD',

    black: '#1f2233',
    green1: '#add56b',
    yellow1: '#f9d35b',
    purple: '#a466af',
    red1: '#ed6474',
    black1: '#453E56',
    white1: '#FFFFFF',
    gray1: '#2F405047',
    gray2: '#2F405085',
    gray9: '#1F223384',
    gray10: '#1F223316',
};

const size = {
    screenWidth: width,
    screenHeight: height,
};

const fontSize = {
    tiny: IS_IPHONE_SE ? 8 : 12,
    regular: IS_IPHONE_SE ? 14 : 16,
    big: IS_IPHONE_SE ? 16 : 18,
    large: IS_IPHONE_SE ? 26 : 30,
    huge: IS_IPHONE_SE ? 32 : 36,
};

const font = {
    title: {
        fontFamily: 'Avenir Next',
        color: color.black,
        fontSize: fontSize.large,
    },
    regular: {
        fontFamily: 'Avenir Next',
        color: color.white1,
        fontSize: fontSize.regular,
    },
    bold: {
        fontFamily: 'Avenir Next',
        fontWeight: '500',
        color: color.black,
        fontSize: fontSize.regular,
    },
};

export default {
    color,
    size,
    font,
    fontSize,
    IS_IPHONE_SE,
    IS_IPHONE_X,
    IS_IPHONE_PLUS,
    IS_IPAD_PRO_97,
    unit,
};
