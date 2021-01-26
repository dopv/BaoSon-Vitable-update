import { StyleSheet, Dimensions, StatusBar } from 'react-native';
import { FONT_14 } from '../../../../../themes/fontSize';
const { height: heightScr, width } = Dimensions.get('window');
const statusBarHeight = StatusBar.currentHeight &&
    StatusBar.currentHeight >= 38 &&
    StatusBar.currentHeight || 0;
const height = heightScr + statusBarHeight;

export const styles = StyleSheet.create({
    vBackground: {
        width: width
    },
    vImgMenu: {
        position: 'absolute',
        width: width * 0.075,
        height: height * 0.042253,
        marginLeft: width * 0.05,
        top: height * 0.074,
    },
    vImgPack: {
        position: 'absolute',
        width: width * 0.33125,
        height: height * 0.09155,
        top: height * 0.06162,
        right: 0
    },
    vContent: {
        width: width * 0.9,
        marginTop: height * 0.13028,
        alignSelf: 'center'
    },
    sTextHi: {
        textAlign: 'center',
        letterSpacing: FONT_14 * 0.015,
        fontSize: FONT_14,
        fontWeight: '400',
        lineHeight: FONT_14 * 1.3,
        paddingTop: height * 0.00704,
        paddingBottom: height * 0.00704
    },
    sTextRemider: {
        textAlign: 'center',
        fontSize: FONT_14,
        lineHeight: FONT_14 * 1.3,
        letterSpacing: FONT_14 * 0.015,
        paddingBottom: height * 0.0140845
    },
    sTextTakeQuiz: {
        textAlign: 'center',
        fontSize: FONT_14,
        lineHeight: FONT_14 * 1.3,
        paddingTop: height * 0.008802,
        paddingBottom: height * 0.008802,
        alignSelf: 'center',
        color: '#F5785A',
        letterSpacing: FONT_14 * 0.01857,
        textDecorationColor: '#F5785A',
        textDecorationStyle: 'solid',
        textDecorationLine: 'underline',
        marginBottom: height * 0.028169
    }
});
