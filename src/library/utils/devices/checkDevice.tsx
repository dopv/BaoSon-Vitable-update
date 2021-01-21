import { Dimensions, Platform } from 'react-native';
const { width, height } = Dimensions.get('window');

export const iphoneXandAbove = () => {
    if (width === 375 && height === 812 ||
        width === 414 && height === 896 ||
        width === 428 && height === 926 ||
        width === 390 && height === 844
    ) {
        return true;
    }
    return false;
}