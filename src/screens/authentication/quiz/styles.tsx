import { StyleSheet, Dimensions, StatusBar } from 'react-native';
const { height: heightScr, width } = Dimensions.get('window');
const statusBarHeight = StatusBar.currentHeight &&
    StatusBar.currentHeight >= 38 &&
    StatusBar.currentHeight || 0;
const height = heightScr + statusBarHeight;

export const styles = StyleSheet.create({
    vClose: {
        width: width * 0.075,
        height: width * 0.075,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: height * 0.074,
        right: width * 0.05
    },
    sImgClose: {
        width: width * 0.046875,
        height: width * 0.046875
    }
});
