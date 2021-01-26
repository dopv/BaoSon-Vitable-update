import { StyleSheet, Dimensions } from 'react-native';
import { FONT_10, FONT_12, FONT_14, FONT_24 } from '../../../../../themes/fontSize';
import { size } from '../../../../../themes/size';
const { width, height } = Dimensions.get('window');
export const styles = StyleSheet.create({
    vStreakAccumu: {
        width: width * 0.85,
        height: height * 0.22535,
        // top: height * 0.579225,
        // position: 'absolute',
        // left: width * 0.075,
        marginTop: size[28],
        borderRadius: 3,
        padding: 16,
        borderColor: '#BED0A2',
        borderStyle: 'solid',
        borderWidth: 1
    },
    vPointInfo: {
        width: width * 0.475,
        height: height * 0.091549,
        padding: 0
    },
    vCurrentPoint: {
        width: width * 0.6625,
        height: height * 0.05633,
    },
    sTextPoints: {
        fontWeight: '400',
        fontSize: FONT_24,
        lineHeight: FONT_24 * 1.3,
        letterSpacing: FONT_24 * 0.00375,
        color: '#637C5A'
    },
    sTextPointUnit: {
        fontWeight: '400',
        fontSize: FONT_14,
        letterSpacing: FONT_14 * 0.015,
    },
    vPointCondition: {
        width: width * 0.503125,
        left: 0
    },
    sTextPointCondition: {
        fontSize: FONT_12,
        lineHeight: FONT_12 * 1.83333333,
        letterSpacing: FONT_12 * 0.0175,
        color: 'black'
    },
    vContentReward: {
        width: width * 0.225,
        height: width * 0.225,
        position: 'absolute',
        left: width * 0.575,
        right: 0,
        top: height * 0.028169,
        opacity: 0.3,
        borderColor: '#272626',
        borderWidth: 1,
        borderStyle: 'solid',
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center'
    },
    vReward: {
        width: width * 0.175,
        height: height * 0.068662,
        justifyContent: 'center',
        alignItems: 'center'
    },
    sImgTags: {
        width: width * 0.075,
        height: width * 0.075
    },
    sTextGet: {
        fontWeight: '500',
        fontSize: FONT_10,
        lineHeight: FONT_10 * 1.5,
        letterSpacing: FONT_10 * 0.021,
        textAlign: 'center'
    },
    vProcess: {
        width: width * 0.475,
        height: width * 0.0125,
        backgroundColor: '#BED0A2',
        marginTop: height * 0.014085,
        borderRadius: 8,
    },
    vCurrentProcess: {
        width: width * 0.3,
        borderRadius: 8,
        backgroundColor: '#637C5A',
        height: width * 0.0125
    },
    sTextEarnExtra: {
        width: width * 0.475,
        fontSize: FONT_12,
        lineHeight: FONT_12 * 1.8333333,
        letterSpacing: FONT_12 * 0.021666666,
        paddingTop: height * 0.0140845,
        textDecorationStyle: 'solid',
        textDecorationLine: 'underline',
        textDecorationColor: '#a9a7a1'
    }
});
