import { StyleSheet, Dimensions, StatusBar } from 'react-native';
import { FONT_14 } from '../../../../../themes/fontSize';
const { height: heightScr, width } = Dimensions.get('window');
const statusBarHeight = StatusBar.currentHeight &&
    StatusBar.currentHeight >= 38 &&
    StatusBar.currentHeight || 0;
const height = heightScr + statusBarHeight;

export const styles = StyleSheet.create({
    vHomeTabs: {
        width: width,
        flexDirection: 'row'
    },
    vTabsLeftRight: {
        width: width / 2
    },
    sTitleTracker: {
        textAlign: 'center',
        fontSize: FONT_14,
        lineHeight: FONT_14 * 1.3,
        letterSpacing: FONT_14 * 0.015,
        color: '#272626',
        paddingTop: height * 0.0176056,
        paddingBottom: height * 0.0176056
    },
    sTitleProgress: {
        backgroundColor: '#DCD2BD',
        textAlign: 'center',
        fontSize: FONT_14,
        lineHeight: FONT_14 * 1.3,
        letterSpacing: FONT_14 * 0.015,
        color: '#272626',
        paddingTop: height * 0.0176056,
        paddingBottom: height * 0.0176056
    }
});
