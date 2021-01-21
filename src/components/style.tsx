import { StyleSheet } from 'react-native';
import R from '../../assets/value';
import { FONT_16 } from '../themes/fontSize';

export const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "rgba(0,0,0,.5)",
        borderRadius: 10,
        alignItems: "center",
        paddingTop: 20,
        paddingBottom: 20,
        paddingRight: 30,
        paddingLeft: 30
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center",
        backgroundColor: 'transparent'
    },
    textConfirm: {
        fontSize: FONT_16,
        fontFamily: R.fonts && R.fonts.ROBOTO_SEMIBOLD,
        color: 'white'
    }
})