import { StyleSheet, Dimensions } from 'react-native';
import { FONT_14, FONT_18 } from '../../../themes/fontSize';

const { width, height } = Dimensions.get('window');

export const styles = StyleSheet.create({
    fullScreen: {
        flex: 1,
        backgroundColor: '#F7F4EB',
    },
    vMenu: {
        flex: 1,
        backgroundColor: '#F7F4EB'
    },
    vClose: {
        width: width * 0.075,
        height: width * 0.075,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: height * 0.074,
        left: width * 0.05
    },
    sImgClose: {
        width: width * 0.046875,
        height: width * 0.046875,
    },
    sImgLogo: {
        position: 'absolute',
        width: width * 0.075,
        height: width * 0.075,
        top: height * 0.07394,
        left: width * 0.4625
    },
    vContentMenu: {
        width: width,
        height: height * 0.565141,
        position: 'absolute',
        top: height * 0.1866197,
        alignItems: 'center',
        padding: 0
    },
    vListMenuAbove: {
        width: width,
        height: height * 0.32394,
        padding: 0,
        top: 0,
        left: 0
    },
    vLineMenu: {
        width: width * 0.85,
        height: height * 0.0017606,
        top: height * 0.36619718,
        backgroundColor: '#DCD2BD',
        position: 'absolute'
    },
    vListMenuUnder: {
        height: height * 0.15493,
        width: width,
        top: height * 0.4102113,
        position: 'absolute'
    },
    vFotter: {
        width: width,
        height: height * 0.165493,
        backgroundColor: '#637C5A',
        bottom: 0,
        position: 'absolute',
        justifyContent: 'center'
    },
    vContentFooter: {
        height: height * 0.08099,
        marginLeft: width * 0.075
    },
    sTextAjust: {
        fontSize: FONT_18,
        fontWeight: '400',
        lineHeight: FONT_18 * 1.3,
        letterSpacing: FONT_18 * 0.0038889,
        color: '#F7F4EB'
    },
    sTextReTakeQuiz: {
        fontSize: FONT_14,
        fontWeight: '500',
        lineHeight: FONT_14 * 1.57142,
        letterSpacing: FONT_14 * 0.0185714,
        color: '#F2EDE0',
        textDecorationLine: 'underline'
    }
});
