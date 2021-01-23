import { StyleSheet, Dimensions } from 'react-native';
import R from '../../../../assets/value';
import {
    FONT_10,
    FONT_24,
    FONT_16,
    FONT_14,
    FONT_12
} from '../../../themes/fontSize';
const { width, height } = Dimensions.get('window');
import { checkHeight, StatusBarHeight } from '../../../config/heightStatusbar'
import { size } from '../../../themes/size';
import { Platform } from 'react-native';

export const styles = StyleSheet.create({
    fullScreen: {
        flex: 1,
        backgroundColor: '#F7F4EB',
    },
    header: {
        backgroundColor: '#BDCFA3',
        width: '100%',
        paddingHorizontal: size[20],
        paddingVertical: size[5],
        paddingTop: StatusBarHeight,
        alignItems: 'center'
    },
    titleHeader: {
        textAlign: 'center',
        fontSize: FONT_14,
        color: '#272626'
    },
    content: {
        flex: 1,
        alignItems: 'center'
    },
    vLogo: {
        paddingTop: size[19],
        paddingBottom: size[36]
    },
    vInput: {
        marginTop: size[10],
        width: '100%',
        paddingHorizontal: size[24]
    },
    titEmail: {
        color: '#272626',
        fontSize: FONT_10,
        fontWeight: 'bold'
    },
    input: {
        // height: width * 0.12,
        fontSize: FONT_16,
        fontWeight: 'bold',
        // paddingLeft: size[10],
        color: '#272626',
        borderBottomWidth: 1,
        borderColor: '#DCD2BD',
        paddingVertical: size[5]
    },
    invalid: {
        color: 'red',
        fontStyle: 'italic',
        marginBottom: size[5]
    },
    vBottom: {
        width: '100%',
        marginTop: size[30],
        paddingHorizontal: size[24],
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    btnRemember: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    vRemember: {
        borderRadius: 100,
        width: size[30],
        height: size[30],
        borderColor: '#272626',
        borderWidth: 1,
        backgroundColor: '#BDCFA3'
    },
    vUnRemember: {
        borderRadius: 100,
        width: size[30],
        height: size[30],
        borderColor: '#272626',
        borderWidth: 1
    },
    tRemember: {
        marginLeft: size[10],
        fontSize: FONT_12,
        fontWeight: 'bold'
    },
    btnLogin: {
        width: width * 0.359,
        height: width * 0.13,
        backgroundColor: '#BDCFA3',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        borderWidth: 1,
        borderColor: '#000000'
    },
    tLogin: {
        fontSize: FONT_16,
        color: '#5C6252'
    },
    imgLogin: {
        width: width * 0.125,
        height: width * 0.0678,
        marginRight: size[3],
        marginLeft: size[8]
    }
});
