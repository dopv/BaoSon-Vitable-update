import { StyleSheet, Dimensions, StatusBar } from 'react-native';
import { FONT_14, FONT_18, FONT_24 } from '../../../themes/fontSize';
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
    },
    vTotal:{
        flex:1
    },
    vHeaderTotal:{
        width:'100%',
        backgroundColor:'#DCD2BD',
        flexDirection:'row',
    },
    vBottomTotal:{
        width:'100%',
        backgroundColor:'#fff',
        padding: size[24]
    },
    tTotal:{
        flex:1,
        marginLeft: size[24],
        marginVertical: size[28],
        fontFamily: 'SolaireDT',
        fontSize: FONT_24,
        color: '#272626'
    },
    vRightTotal:{
        flex:1,
        flexDirection:'row',
        alignItems:'center'
    },
    tPrice:{
        color:'#272626',
        fontSize: FONT_18,
        fontFamily:'NHaasGroteskTXProBold'
    },
    rowTotal:{
        flexDirection: 'row',
        alignItems:'center',
        justifyContent:'space-between'
    },
    titleBottomTotal:{
        color: '#000',
        fontSize: FONT_14,
        fontFamily: 'NHaasGroteskTXProBold'
    },
    priceBottomTotal:{
        color: '#000',
        fontWeight: '500',
        fontSize: FONT_14,
        fontFamily: 'NHaasGroteskTXProBold'
    }
});
