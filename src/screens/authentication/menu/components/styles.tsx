import { StyleSheet, Dimensions } from 'react-native';
import { FONT_16 } from '../../../../themes/fontSize';
const { width, height } = Dimensions.get('window');

export const styles = StyleSheet.create({
    vMenuItem: {
        fontSize: FONT_16,
        lineHeight: FONT_16 * 1.375,
        letterSpacing: FONT_16 * 0.0056,
        paddingVertical: height * 0.021126,
        paddingLeft: width * 0.075
    },
    vItemActive: {
        fontWeight: '500',
        color: '#333333'
    },
    vItemNormal: {
        fontWeight: '400',
        color: '#272626'
    }
});
