import { StyleSheet, Dimensions } from 'react-native';
import { FONT_10, FONT_12, FONT_14, FONT_24 } from '../../../../../themes/fontSize';
import { size } from '../../../../../themes/size';
const { width, height } = Dimensions.get('window');
export const styles = StyleSheet.create({
    vMarkPoint: {
        // width: width * 0.85,
        marginTop: size[28],

    },
    vMarkBtn: {
        width: width * 0.734375,
        borderWidth: 0.5,
        borderStyle: 'solid',
        borderColor: '#272626',
        backgroundColor: '#F5785A',
        alignItems: 'center',
        justifyContent:'center'
    },
    sTextMarkBtn: {
        paddingHorizontal: height * 0.042254,
        paddingVertical: height * 0.014085,
        fontSize: FONT_14,
        fontWeight: '400',
        lineHeight: FONT_14 * 1.5714,
        // letterSpacing: FONT_14 * 0.015, 
        textAlign:'center'
    },
    sTextMarkPoint: {
        fontWeight: '400',
        fontSize: FONT_12,
        lineHeight: FONT_12 * 1.8333333,
        letterSpacing: FONT_12 * 0.0175,
        textAlign: 'center',
        color: '#F5785A',
        // paddingVertical: height * 0.00704
    }
});
