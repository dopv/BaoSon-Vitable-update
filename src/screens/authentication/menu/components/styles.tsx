import { StyleSheet, Dimensions, StatusBar } from 'react-native';
import { FONT_16 } from '../../../../themes/fontSize';
const { height: heightScr, width } = Dimensions.get('window');
const statusBarHeight = StatusBar.currentHeight &&
    StatusBar.currentHeight >= 38 &&
    StatusBar.currentHeight || 0;
const height = heightScr + statusBarHeight;

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
    },
    btnItem: {
        justifyContent: 'center'
    }
});
