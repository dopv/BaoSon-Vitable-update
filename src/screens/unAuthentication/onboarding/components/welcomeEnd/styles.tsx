import { StyleSheet, Dimensions, StatusBar } from 'react-native';
import { FONT_14, FONT_18, FONT_32 } from '../../../../../themes/fontSize';
import { size } from '../../../../../themes/size';
const { height: heightScr, width } = Dimensions.get('window');
const statusBarHeight = StatusBar.currentHeight &&
    StatusBar.currentHeight >= 38 &&
    StatusBar.currentHeight || 0;
const height = heightScr + statusBarHeight;
export const styles = StyleSheet.create({
    sFullScreen:{
        backgroundColor: "#F2EDE0",
    },
    viewBackground:{
        width:width,
        height:height,
        backgroundColor:"#F2EDE0",
        alignItems:'center'
    },
    textTitle:{
        fontFamily:"SolaireDT",
        fontSize:24/320*width,
        lineHeight:31.2/568*height,
        color: "#272626",
        textAlign: "center"
    },
    viewTitle:{
        marginTop:74/568*height,
        marginLeft:24/320*width,
        marginRight:24/320*width,
        alignItems:"center",
        justifyContent:"center",
    },
    viewContent1:{
        marginTop:24/568*height,
        marginLeft:24/320*width,
        marginRight:24/320*width,
        alignItems:"center",
        justifyContent:"center",
    },
    textContent:{
        fontFamily:"NHaasGroteskTXPro",
        fontSize:14/320*width,
        lineHeight:18.2/568*height,
        color: "#272626",
        textAlign: "center",
        letterSpacing: 0.21/320*width
    },
    viewContent2:{
        marginTop:8/568*height,
        marginLeft:24/320*width,
        marginRight:24/320*width,
        alignItems:"center",
        justifyContent:"center",
    },
    vSelectTime:{
        marginTop: size[35],
        width:'100%',
        alignItems:'center',
        flexDirection:'row',
        justifyContent:'center'
    },
    vListTime:{
        // flex:1,
        height: height*0.1936,
        // alignItems:'center',
        // justifyContent:'center',
        // marginVertical: 10,
        width: width*0.15
    },
    vItemTime:{
        width: width * 0.15,
        height: width * 0.15,
    },
    tItemTime:{
        fontSize: FONT_18,
        fontFamily: 'SolaireDT',
        color: '#272626',
        opacity: 0.5
    },
    tItemTimePicker:{
        fontSize: FONT_32,
        fontFamily: 'SolaireDT',
        color: '#637C5A'
    },
    tItemMinutePicker:{
        fontSize: FONT_32,
        fontFamily: 'SolaireDT',
        color: '#000'
    },
    tMinute:{
        fontSize: FONT_32,
        fontFamily: 'SolaireDT',
        color: '#272626'
    },
    tReminder:{
        paddingVertical: size[15],
        paddingHorizontal: size[40],
        fontSize: FONT_14,
        fontWeight: '400',
        fontFamily: 'NHaasGroteskTXPro',
        color: '#272626'
    },
    btnReminder:{
        borderWidth:1,
        width:'auto',
        backgroundColor:'#F5785A',
        alignItems:'center',
        justifyContent:'center',
        marginTop: height*0.0915
    },
    tNotTime:{
        paddingTop: size[24],
        paddingBottom: size[40],
        fontWeight:'500',
        fontSize: FONT_14,
        fontFamily:'NHaasGroteskTXPro',
        color:'#637C5A',
        textDecorationLine:'underline'
    },
    btnNotTime:{

    }
});
