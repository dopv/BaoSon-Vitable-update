import { StyleSheet, Dimensions } from 'react-native';
import { FONT_14 } from '../../../../../themes/fontSize';
import { size } from '../../../../../themes/size';
const { width, height } = Dimensions.get('window');
export const styles = StyleSheet.create({
    vBackground: {
        width: width,
        // height: height * 0.3328,
        // height:'40%',
        // flex: 1
    },
    vImgMenu: {
        position: 'absolute',
        width: width * 0.075,
        height: height * 0.042253,
        marginLeft: size[20],
        top: height * 0.0466,
    },
    vImgPack: {
        position: 'absolute',
        width: width * 0.33125,
        height: height * 0.09155,
        top: height * 0.036,
        right:0
    },
    vContent: {
        width: width * 0.9,
        marginTop: height * 0.12,
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
        paddingBottom: size[10]
    },
    sTextTakeQuiz: {
        textAlign: 'center',
        fontSize: FONT_14,
        lineHeight: FONT_14 * 1.3,
        paddingTop: size[8],
        paddingLeft: height * 0.00704,
        alignSelf: 'center',
        color: '#F5785A',
        letterSpacing: FONT_14 * 0.01857,
        textDecorationColor: '#F5785A',
        textDecorationStyle: 'solid',
        textDecorationLine: 'underline',
        paddingBottom: size[18]
    }
});
