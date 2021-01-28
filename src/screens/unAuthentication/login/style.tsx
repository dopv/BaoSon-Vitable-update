import { StyleSheet, Dimensions, StatusBar } from 'react-native';
import {
    FONT_14,
    FONT_32
} from '../../../themes/fontSize';
const { height: heightScr, width } = Dimensions.get('window');
const statusBarHeight = StatusBar.currentHeight &&
    StatusBar.currentHeight >= 38 &&
    StatusBar.currentHeight || 0;
const height = heightScr + statusBarHeight;


export const styles = StyleSheet.create({
    fullScreen: {
        flex: 1,
        backgroundColor: '#F7F4EB'
    },
    vHeader: {
        height: height * 0.2394366,
        top: height * 0.1443662,
        left: width * 0.075
    },
    sTextTopHeader: {
        fontWeight: '400',
        fontSize: FONT_32,
        lineHeight: FONT_32 * 1.5,
        letterSpacing: FONT_32 * 0.0034375,
        color: '#272626',
        left: 0,
        top: 0,
        fontFamily: 'SolaireDT'
    },
    sTextContentHeader: {
        fontWeight: '500',
        fontSize: FONT_14,
        lineHeight: FONT_14 * 1.3,
        letterSpacing: FONT_14 * 0.015,
        color: '#272626',
        left: 0,
        top: height * 0.028169,
        fontFamily: 'NHaasGroteskTXPro'
    },
    sTextLink: {
        fontWeight: 'bold',
        textDecorationLine: 'underline',
        fontFamily: 'NHaasGroteskTXProBold'
    },
    vFormInput: {
        width: width * 0.85,
        position: 'absolute',
        top: height * 0.4401408,
        left: width * 0.075
    },
    vInputEmail: {
        left: 0,
        top: 0,
        width: width * 0.85
    },
    sTextLabel: {
        fontSize: FONT_14,
        fontWeight: '500',
        lineHeight: FONT_14 * 1.3,
        letterSpacing: FONT_14 * 0.005,
        color: '#000000',
        paddingBottom: height * 0.00704,
        fontFamily: 'NHaasGroteskTXProBold'
    },
    sInput: {
        backgroundColor: '#F7F4EB',
        height: height * 0.059859,
        borderWidth: width * 0.0015625,
        borderColor: '#000000',
        borderStyle: 'solid',
        paddingLeft: width * 0.025,
        fontSize: FONT_14,
        fontWeight: '400',
        lineHeight: FONT_14 * 1.3,
        letterSpacing: FONT_14 * 0.015,
        fontFamily: 'NHaasGroteskTXPro'
    },
    vFormAction: {
        width: width * 0.85,
        height: height * 0.14612676,
        position: 'absolute',
        top: height * 0.7834507,
        left: width * 0.075
    },
    vButton: {
        backgroundColor: '#F5785A',
        height: height * 0.065141,
        width: width * 0.85,
        justifyContent: 'center',
        borderWidth: width * 0.0015625,
        borderColor: '#000000',
        borderStyle: 'solid'
    },
    sTextSingIn: {
        fontSize: FONT_14,
        lineHeight: FONT_14 * 1.5714286,
        letterSpacing: FONT_14 * 0.015,
        color: '#272626',
        textAlign: 'center',
        fontFamily: 'NHaasGroteskTXPro'
    },
    sTextForgot: {
        fontSize: FONT_14,
        fontWeight: '500',
        lineHeight: FONT_14 * 1.5714286,
        letterSpacing: FONT_14 * 0.018571,
        textAlign: 'center',
        marginTop: height * 0.0422535,
        textDecorationLine: 'underline',
        fontFamily: 'NHaasGroteskTXProBold'
    },
    sTextInvalid: {
        paddingTop: height * 0.007042,
        fontSize: FONT_14,
        lineHeight: FONT_14 * 1.3,
        letterSpacing: FONT_14 * 0.005,
        color: '#F5785A',
        fontFamily: 'NHaasGroteskTXPro'
    },
    sTextLoginFailed: {
        paddingTop: height * 0.007042,
        fontSize: FONT_14,
        lineHeight: FONT_14 * 1.3,
        letterSpacing: FONT_14 * 0.005,
        color: '#F5785A',
        top: height * 0.7,
        position: 'absolute',
        width: width,
        textAlign: 'center',
        fontFamily: 'NHaasGroteskTXPro'
    },
    vContent: {
        width: width * 0.85
    },
    sImgLogo: {
        position: 'absolute',
        width: width * 0.075,
        height: width * 0.075,
        top: height * 0.07394,
        left: width * 0.4625
    }
});
