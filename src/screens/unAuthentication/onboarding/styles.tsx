import { StyleSheet, Dimensions, StatusBar } from 'react-native';
import { FONT_32 } from '../../../themes/fontSize';
const { height: heightScr, width } = Dimensions.get('window');
const statusBarHeight = StatusBar.currentHeight &&
    StatusBar.currentHeight >= 38 &&
    StatusBar.currentHeight || 0;
const height = heightScr + statusBarHeight;

export const styles = StyleSheet.create({
    vBackground: {
        width: width,
        height: height
    },
    viewTextDearAime: {
        marginTop: 114 / 568 * height,
        marginLeft: 99 / 320 * width,
        marginRight: 99 / 320 * width
    },
    textDear: {
        width: 49 / 320 * width,
        height: 31 / 568 * height,
        fontFamily: "SolaireDT",
        fontSize: 24 / 320 * width,
        lineHeight: 31.2 / 320 * width,
        letterSpacing: 0.09 / 320 * width,
        color: "#272626",

    },
    textAime: {
        marginTop: 6 / 568 * height,
        width: 122 / 320 * width,
        height: 48 / 568 * height,
        alignItems: 'center',
        justifyContent: "center",
    },
    tName:{
        fontSize: FONT_32,
        fontFamily: 'HOMEMADE_APPLE',
        color: '#272626'
    },
    viewTextContent: {
        marginTop: 40 / 568 * height,
        marginLeft: 24 / 320 * width,
        marginRight: 24 / 320 * width,
    },
    textContent: {
        fontFamily: "NHaasGroteskTXPro",
        fontSize: 13 / 320 * width,
        lineHeight: 18.2 / 568 * height,
        textAlign: "center",
        letterSpacing: 0.21 / 320 * width,
        color: "#272626"
    },
    buttonStarted: {
        width: 268 / 320 * width,
        height: 38 / 568 * height,
        marginTop: 197 / 568 * height,
        marginLeft: 26 / 320 * width,
        marginRight: 26 / 320 * width,
        backgroundColor: "#F5785A",
        alignItems: 'center',
        justifyContent: "center",
        borderWidth: 0.5 / 320 * width,
        borderColor: "#272626",
    },
    textButton: {
        fontFamily: "NHaasGroteskTXPro",
        fontSize: 14 / 320 * width,
        lineHeight: 22 / 568 * height,
        letterSpacing: 0.21 / 320 * width,
        color: "#272626"
    }
});
