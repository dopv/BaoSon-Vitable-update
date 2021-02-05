import { StyleSheet, Dimensions, StatusBar } from 'react-native';
const { height: heightScr, width } = Dimensions.get('window');
const statusBarHeight = StatusBar.currentHeight &&
    StatusBar.currentHeight >= 38 &&
    StatusBar.currentHeight || 0;
const height = heightScr + statusBarHeight;
export const styles = StyleSheet.create({
    viewBackGround1:{
        width:width,
        height:408/568*height,
        backgroundColor:"#BED0A2"
    },
    viewBackGround2:{
        width:width,
        height:160/568*height,
        backgroundColor:"#F2EDE0"
    },
    viewTitle:{
        marginTop:50/568*height,
        marginLeft:24/320*width,
        marginRight:24/320*width,
        alignItems:"center",
        justifyContent:"center",
    },
    viewContent:{
        marginTop:16/568*height,
        marginLeft:24/320*width,
        marginRight:24/320*width,
        alignItems:"center",
        justifyContent:"center",
    },
    textTitle:{
        fontFamily:"SolaireDT",
        fontSize:24/320*width,
        lineHeight:31.2/568*height,
        color: "#272626",
        textAlign: "center"
    },
    textContent:{
        fontFamily:"NHaasGroteskTXPro",
        fontSize:14/320*width,
        lineHeight:18.2/568*height,
        color: "#272626",
        textAlign: "center",
        letterSpacing: 0.21/320*width
    },
    viewButton:{
        flexDirection:"row",
        width:272/320*width,
        height:37/568*height,
        marginTop:24/568*height,
        marginLeft:24/320*width,
        marginRight:24/320*width,
        backgroundColor:"#BED0A2",
        borderWidth:0.5/320*width,
        borderColor:"#272626",
        alignItems:"center",
    },
    textButton:{
        marginLeft:103/320*width,
        fontFamily:"NHaasGroteskTXPro",
        fontSize:14/320*width,
        lineHeight:22/568*height,
        color: "#272626",
    },
    imageButtom:{
        width:7/320*width,
        height:12/568*height,
        marginLeft:18.63/320*width
    },
    viewPaging:{
        flexDirection:"row",
        marginTop:51/320*width,
        marginLeft:104/320*width
    },
    paggingEnable:{
        width:8/320*width,
        height:8/568*height,
        marginLeft:16/320*width,
        backgroundColor:"#637C5A",
        borderRadius:4
    },
    paggingDisable:{
        width:8/320*width,
        height:8/568*height,
        marginLeft:16/320*width,
        backgroundColor:"#BED0A2",
        borderRadius:4
    },
    viewImage1:{
        zIndex:2,
        width:200/320*width,
        height:256/568*height,
        position:"absolute",
        top:187/568*height,
        left:60/320*width,
        right:60/320*width

    },
    viewImage2:{
        zIndex:3,
        width:272/320*width,
        height:140/568*height,
        position:"absolute",
        top:257/568*height,
        left:24/320*width,
        right:24/320*width
    }
});
