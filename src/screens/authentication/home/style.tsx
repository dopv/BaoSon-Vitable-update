import { StyleSheet } from 'react-native';
import { StatusBarHeight } from '../../../config/heightStatusbar';

export const styles = StyleSheet.create({
    fullScreen: {
        flex: 1,
        backgroundColor: '#F7F4EB',
    },
    vContent: {
        flex: 1,
        backgroundColor: '#F7F4EB',
        paddingTop: StatusBarHeight
    },
     viewPager: {
        flex: 1,
    },
    dailyScreen:{
        flex:1,
        alignItems:'center',
    },
    vBot:{
        flex:1
        // height: '60%'
    }
});
