import { StyleSheet, Dimensions } from 'react-native';
import { FONT_14 } from '../../../../../themes/fontSize';
const { width, height } = Dimensions.get('window');
export const styles = StyleSheet.create({
    vBackground: {
        width: width,
        height: height * 0.3328,
        flex: 1
    },
    vImgMenu: {
        position: 'absolute',
        width: width * 0.075,
        height: height * 0.042253,
        top: height * 0.074,
        left: width * 0.05
    },
    vImgPack: {
        position: 'absolute',
        width: width * 0.33125,
        height: height * 0.09155,
        top: height * 0.06162,
        left: width * 0.66875,
    },
    vContent: {
        width: width * 0.9,
        height: height * 0.1742958,
        position: 'absolute',
        top: height * 0.13028,
        alignSelf: 'center'
    },
    sTextHi: {
        textAlign: 'center',
        letterSpacing: FONT_14 * 0.015,
        fontSize: FONT_14,
        fontWeight: '400',
        lineHeight: FONT_14 * 1.3,
        paddingTop: height * 0.00704,
        paddingLeft: height * 0.00704
    },
    sTextRemider: {
        textAlign: 'center',
        fontSize: FONT_14,
        lineHeight: FONT_14 * 1.3,
        paddingTop: height * 0.00704,
        letterSpacing: FONT_14 * 0.015,
        left: 0
    },
    sTextTakeQuiz: {
        textAlign: 'center',
        fontSize: FONT_14,
        lineHeight: FONT_14 * 1.3,
        paddingTop: height * 0.00704,
        paddingLeft: height * 0.00704,
        position: 'absolute',
        top: height * 0.13204,
        alignSelf: 'center',
        color: '#F5785A',
        letterSpacing: FONT_14 * 0.01857,
        textDecorationColor: '#F5785A',
        textDecorationStyle: 'solid',
        textDecorationLine: 'underline'
    }
});
