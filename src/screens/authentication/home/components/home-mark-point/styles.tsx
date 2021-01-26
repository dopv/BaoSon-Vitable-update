import { StyleSheet, Dimensions, StatusBar } from 'react-native';
import { FONT_12, FONT_14 } from '../../../../../themes/fontSize';
const { height: heightScr, width } = Dimensions.get('window');
const statusBarHeight = StatusBar.currentHeight &&
    StatusBar.currentHeight >= 38 &&
    StatusBar.currentHeight || 0;
const height = heightScr + statusBarHeight;

export const styles = StyleSheet.create({
    vMarkPoint: {
        marginTop: height * 0.0429577
    },
    vMarkBtn: {
        borderWidth: width * 0.0015625,
        borderStyle: 'solid',
        borderColor: '#272626',
        backgroundColor: '#F5785A',
        alignItems: 'center',
        justifyContent: 'center'
    },
    sTextMarkBtn: {
        paddingHorizontal: height * 0.042254,
        paddingVertical: height * 0.014085,
        fontSize: FONT_14,
        fontWeight: '400',
        lineHeight: FONT_14 * 1.5714,
        textAlign: 'center',
        letterSpacing: FONT_14 * 0.015
    },
    sTextMarkPoint: {
        fontWeight: '400',
        fontSize: FONT_12,
        lineHeight: FONT_12 * 1.8333333,
        letterSpacing: FONT_12 * 0.0175,
        textAlign: 'center',
        color: '#F5785A',
        paddingVertical: height * 0.00704
    }
});
