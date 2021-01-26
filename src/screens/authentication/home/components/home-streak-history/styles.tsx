import { StyleSheet, Dimensions, StatusBar } from 'react-native';
import { FONT_12, FONT_18 } from '../../../../../themes/fontSize';
const { height: heightScr, width } = Dimensions.get('window');
const statusBarHeight = StatusBar.currentHeight &&
    StatusBar.currentHeight >= 38 &&
    StatusBar.currentHeight || 0;
const height = heightScr + statusBarHeight;

export const styles = StyleSheet.create({
    vStreakHistory: {
        width: width,
        marginTop: height * 0.0492958
    },
    vStreakCurrent: {
        flexDirection: 'column',
        alignItems: 'center',
        padding: 0,
        width: width * 0.2625,
        top: 0,
        left: width * 0.15625
    },
    sTextStreakCurrent: {
        fontSize: FONT_18,
        lineHeight: FONT_18 * 1.3,
        textAlign: 'center',
        letterSpacing: FONT_18 * 0.0038889,
        color: '#637C5A',
        paddingBottom: height * 0.00704
    },
    vSubStreakCurrent: {
        width: width * 0.15,
        height: 0,
        borderStyle: 'solid',
        borderTopWidth: 1,
        borderColor: '#BED0A2',
        flexGrow: 0,
        marginTop: 4,
        marginBottom: 4
    },
    vTextSubStreakCurrent: {
        width: width * 0.2625,
        textAlign: 'center',
        fontSize: FONT_12,
        lineHeight: FONT_12 * 1.833333,
        letterSpacing: FONT_12 * 0.0175,
        color: 'black'
    },
    vStreakBest: {
        flexDirection: 'column',
        alignItems: 'center',
        padding: 0,
        width: width * 0.225,
        left: width * 0.59375,
        top: 0,
        position: 'absolute'
    },
    sTextStreakBest: {
        fontSize: FONT_18,
        lineHeight: FONT_18 * 1.3,
        textAlign: 'center',
        letterSpacing: FONT_18 * 0.0038889,
        color: '#637C5A',
        paddingBottom: height * 0.00704
    },
    vSubStreakBest: {
        width: width * 0.15,
        height: 0,
        borderStyle: 'solid',
        borderTopWidth: 1,
        borderColor: '#BED0A2',
        flexGrow: 0,
        marginTop: 4,
        marginBottom: 4
    },
    sTextSubStreakBest: {
        width: width * 0.2625,
        textAlign: 'center',
        fontSize: FONT_12,
        lineHeight: FONT_12 * 1.833333,
        letterSpacing: FONT_12 * 0.0175,
        color: 'black'
    }
});
