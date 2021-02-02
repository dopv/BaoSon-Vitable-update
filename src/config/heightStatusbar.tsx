// functions-file.js
import { Dimensions, Platform, StatusBar } from 'react-native';
import { size } from '../themes/size';

const X_WIDTH = 375;
const X_HEIGHT = 812;

const XSMAX_WIDTH = 414;
const XSMAX_HEIGHT = 896;
const defaultHeight = 44;
const { height, width } = Dimensions.get('window');

export const isIPhoneX = () => Platform.OS === 'ios' && !Platform.isPad && !Platform.isTVOS
    ? width === X_WIDTH && height === X_HEIGHT || width === XSMAX_WIDTH && height === XSMAX_HEIGHT
    : false;

export const StatusBarHeight = Platform.select({
    ios: isIPhoneX() ? size[44] : size[20],
    android: StatusBar.currentHeight || defaultHeight > 40 ? StatusBar.currentHeight : StatusBar.currentHeight || defaultHeight + size[20],
    default: 0
})

export const checkHeight = Platform.select({
    ios: isIPhoneX() ? 44 : 20,
    android: StatusBar.currentHeight,
    default: 0
})