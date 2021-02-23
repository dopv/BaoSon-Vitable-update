import { StyleSheet, Dimensions, StatusBar } from 'react-native';
import { FONT_10, FONT_11, FONT_14, FONT_18, FONT_24 } from '../../../themes/fontSize';
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
    vLine:{
        position:'absolute',
        opacity: 0.5,
        backgroundColor:'#272626',
        height:1,
        width: '100%'
    },
    vTotal:{
        flex:1
    },
    vHeaderTotal:{
        flex:1,
        backgroundColor:'#DCD2BD',
        flexDirection:'row',
    },
    vBottomTotal:{
        width:'100%',
        backgroundColor:'#fff',
        padding: size[24]
    },
    tTotal:{
        flex:2,
        marginLeft: size[24],
        marginVertical: size[28],
        fontFamily: 'SolaireDT',
        fontSize: FONT_24,
        color: '#272626'
    },
    vRightTotal:{
        flex:8,
        flexDirection:'row',
        alignItems:'center',justifyContent:'flex-end'

    },
    vPrice:{
        marginRight: size[16],
        justifyContent:'center'
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
        fontWeight: 'normal',
        fontSize: FONT_14,
        fontFamily: 'NHaasGroteskTXProBold'
    },
    tSubPrice:{
        color: '#000',
        fontWeight: '500',
        fontSize: FONT_14,
        fontFamily: 'NHaasGroteskTXProBold'
    },
    priceBottomTotal:{
        color: '#F5785A',
        fontWeight: '500',
        fontSize: FONT_14,
        fontFamily: 'NHaasGroteskTXProBold'
    },
    tMinOrder:{
        marginTop: size[5],
        color: '#000',
        fontWeight: '400',
        fontSize: FONT_11,
        // fontFamily: 'NHaasGroteskTXProBold'
    },
    vPromocode:{
        marginVertical: size[20],
        marginHorizontal: size[22],
        flexDirection:'row',
        backgroundColor:'#fff'
    },
    inputPromocode:{
        flex:6,
        paddingVertical:size[15],
        paddingHorizontal: size[16],
        borderWidth:1,
        borderColor:'#000',
        fontWeight:'400',
        color:'#000',
        fontSize: FONT_14,
        fontFamily: 'NHaasGroteskTXProBold'
    },
    btnPromocode:{
        alignItems:'center',
        justifyContent:'center',
        flex:4,
        backgroundColor:'#F5785A',
        borderTopWidth:1,
        borderBottomWidth:1,
        borderRightWidth:1,
        borderColor:'#000'
    },
    tBtnPromocode:{
        color: '#272626',
        fontSize: FONT_14,
        fontFamily: 'NHaasGroteskTXProBold'
    },
    vNoteTransit:{
        backgroundColor:'#BED0A2',
        padding: size[16],
        marginBottom: size[24],
        borderRadius: size[8]
    },
    vNoteResume:{
        backgroundColor:'#DCD2BD',
        padding: size[16],
        marginBottom: size[24],
        borderRadius: size[8]
    },
    tNoteTran:{
        fontSize: FONT_14,
        color: '#272626',
        fontFamily: 'NHaasGroteskTXProBold'
    },
    tUrl:{
        marginTop:size[10],
        fontSize: FONT_14,
        fontWeight:'500',
        color: '#F5785A',
        fontFamily: 'NHaasGroteskTXProBold',
        textDecorationLine: 'underline',
    }
});
