import { StyleSheet, Dimensions, StatusBar } from 'react-native';
const { height: heightScr, width } = Dimensions.get('window');
const statusBarHeight = StatusBar.currentHeight &&
    StatusBar.currentHeight >= 38 &&
    StatusBar.currentHeight || 0;
const height = heightScr + statusBarHeight;

export const styles = StyleSheet.create({
    vImgMenu: {
        position: 'absolute',
        width: width * 0.075,
        height: height * 0.042253,
        marginLeft: width * 0.05,
        top: height * 0.074,
    }
});
