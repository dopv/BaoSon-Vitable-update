import { StyleSheet, Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

export const styles = StyleSheet.create({
  fullScreen: {
    flex: 1,
    backgroundColor: "#E5E5E5",
    alignContent:'center',
    justifyContent:'center'
  },
  vContent:{
    width: width,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center'
  },
  vTitle:{
    marginLeft: 10
  },
  logoImage:{
    width: width*0.5,
    height: width * 0.5
  }
})