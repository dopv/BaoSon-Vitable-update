import { StyleSheet, Dimensions } from 'react-native';
import { FONT_14 } from '../../../../../themes/fontSize';
const { width, height } = Dimensions.get('window');
export const styles = StyleSheet.create({
    vHomeTabs: {
        width: width,
        // position: 'absolute',
        // top: height * 0.3327465,
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
