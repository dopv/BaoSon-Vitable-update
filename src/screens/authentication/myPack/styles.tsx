import { StyleSheet, Dimensions, StatusBar } from 'react-native';
import { FONT_14 } from '../../../themes/fontSize';
import { size } from '../../../themes/size';
const { height: heightScr, width } = Dimensions.get('window');

export const styles = StyleSheet.create({
    fullScreen: {
        flex: 1,
        backgroundColor: '#F7F4EB',
    },
    vContent:{
        flex: 1,
        margin: size[24]

    },
    tTitle:{
        color:'#7C7A75',
        fontSize: FONT_14,
        fontFamily: 'NHaasGroteskTXProBold'
    }
});
