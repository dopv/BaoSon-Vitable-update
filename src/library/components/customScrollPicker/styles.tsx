import { StyleSheet, Dimensions, StatusBar } from 'react-native';
import { FONT_14, FONT_18, FONT_32 } from '../../../themes/fontSize';
import { size } from '../../../themes/size';
const { height: heightScr, width } = Dimensions.get('window');
const statusBarHeight = StatusBar.currentHeight &&
    StatusBar.currentHeight >= 38 &&
    StatusBar.currentHeight || 0;
const height = heightScr + statusBarHeight;
export const styles = StyleSheet.create({
    vSelectTime: {
        marginTop: size[35],
        width: '100%',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center'
    },
    vListTime: {
        height: height * 0.1936,
        width: width * 0.15
    },
    vItemTime: {
        width: width * 0.15,
        height: width * 0.15,
    },
    tItemTime: {
        fontSize: FONT_18,
        fontFamily: 'SolaireDT',
        color: '#272626',
        opacity: 0.5
    },
    tItemTimePicker: {
        fontSize: FONT_32,
        fontFamily: 'SolaireDT',
        color: '#637C5A'
    },
    tItemMinutePicker: {
        fontSize: FONT_32,
        fontFamily: 'SolaireDT',
        color: '#000'
    },
    tMinute: {
        fontSize: FONT_32,
        fontFamily: 'SolaireDT',
        color: '#272626'
    },
});
