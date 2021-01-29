import { StyleSheet, Dimensions, StatusBar } from 'react-native';
import { StatusBarHeight } from '../../../config/heightStatusbar';
const { height: heightScr, width } = Dimensions.get('window');
const statusBarHeight = StatusBar.currentHeight &&
    StatusBar.currentHeight >= 38 &&
    StatusBar.currentHeight || 0;
const height = heightScr + statusBarHeight;

export const styles = StyleSheet.create({
    fullScreen:{
        flex: 1,
        backgroundColor: '#F7F4EB',
    },
    vImgMenu: {
        position: 'absolute',
        width: width * 0.075,
        // height: height * 0.042253,
        left: width * 0.05,
        top: height * 0.074,
    }
});
