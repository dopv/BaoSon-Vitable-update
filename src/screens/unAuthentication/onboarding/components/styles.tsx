import { StyleSheet, Dimensions, StatusBar } from 'react-native';
import { size } from '../../../../themes/size';
const { height: heightScr, width } = Dimensions.get('window');
const statusBarHeight = StatusBar.currentHeight &&
    StatusBar.currentHeight >= 38 &&
    StatusBar.currentHeight || 0;
const height = heightScr + statusBarHeight;
export const styles = StyleSheet.create({
    vFullscreen: {
        flex: 1,
        alignItems: 'center'
    },
    viewBackGround1: {
        width: width,
        height: 408 / 568 * height,
        backgroundColor: "#BED0A2"
    },
    VBottom: {
        width: width,
        backgroundColor: "#F2EDE0",
        alignItems:'center',
        paddingBottom: size[40]
    },
    vBottomItem: {
        width: '100%',
        backgroundColor: "#F2EDE0",
        flex:1
    },
    viewTitle: {
        marginTop: 50 / 568 * height,
        marginLeft: 24 / 320 * width,
        marginRight: 24 / 320 * width,
        alignItems: "center",
        justifyContent: "center",
    },
    viewContent: {
        marginTop: 16 / 568 * height,
        marginLeft: 24 / 320 * width,
        marginRight: 24 / 320 * width,
        alignItems: "center",
        justifyContent: "center",
    },
    textTitle: {
        fontFamily: "SolaireDT",
        fontSize: 24 / 320 * width,
        lineHeight: 31.2 / 568 * height,
        color: "#272626",
        textAlign: "center"
    },
    textContent: {
        fontFamily: "NHaasGroteskTXPro",
        fontSize: 14 / 320 * width,
        lineHeight: 18.2 / 568 * height,
        color: "#272626",
        textAlign: "center",
        letterSpacing: 0.21 / 320 * width
    },
    viewButton: {
        flexDirection: "row",
        width: 272 / 320 * width,
        height: 37 / 568 * height,
        marginTop: 24 / 568 * height,
        marginLeft: 24 / 320 * width,
        marginRight: 24 / 320 * width,
        backgroundColor: "#BED0A2",
        borderWidth: 0.5 / 320 * width,
        borderColor: "#272626",
        alignItems: "center",
    },
    textButton: {
        marginLeft: 103 / 320 * width,
        fontFamily: "NHaasGroteskTXPro",
        fontSize: 14 / 320 * width,
        lineHeight: 22 / 568 * height,
        color: "#272626",
    },
    imageButtom: {
        width: size[24],
        height: size[24],
        marginLeft: size[10]
    },
    viewPaging: {
        width:'100%',
        alignItems:'center',
        marginTop: size[5],
    },
    paggingEnable: {
        width: size[10],
        height: size[10],
        marginLeft: 16 / 320 * width,
        backgroundColor: "#637C5A",
        borderRadius: 100
    },
    paggingDisable: {
        width: size[10],
        height: size[10],
        marginLeft: 16 / 320 * width,
        backgroundColor: "#BED0A2",
        borderRadius: 100
    },
    viewImage1: {
        zIndex: 2,
        width: width * 0.9,
        height: height * 0.45,
        position: "absolute",
        bottom:0
    },
    vImageIndex2: {
        zIndex: 2,
        width: width * 0.74,
        height: height * 0.45,
        position: "absolute",
        bottom:0
    },
    viewImage2: {
        zIndex: 3,
        width: 272 / 320 * width,
        height: 126 / 568 * height,
        position: "absolute",
        top: 293 / 568 * height,
        left: 24 / 320 * width,
        right: 24 / 320 * width
    },
    vImgMyPack:{
        zIndex: 3,
        position: "absolute",
        top: 230 / 568 * height,
        right: 30 / 320 * width,
        backgroundColor: 'transparent',
        borderTopLeftRadius: size[50],
        borderBottomLeftRadius: size[50],
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 3
    },
    imgMyPack:{
        width: 128 / 320 * width,
        height: 53 / 320 * width,
       
    }
});
