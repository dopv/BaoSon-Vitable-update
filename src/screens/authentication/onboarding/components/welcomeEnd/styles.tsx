import { StyleSheet, Dimensions, StatusBar } from 'react-native';
const { height: heightScr, width } = Dimensions.get('window');
const statusBarHeight = StatusBar.currentHeight &&
    StatusBar.currentHeight >= 38 &&
    StatusBar.currentHeight || 0;
const height = heightScr + statusBarHeight;
export const styles = StyleSheet.create({
    viewBackground:{
        width:width,
        height:height,
        backgroundColor:"#F2EDE0"
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
    }
});
