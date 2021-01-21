import { StyleSheet, Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

export const styles = StyleSheet.create({
  fullScreen: {
    flex: 1,
    backgroundColor: "#fff",
    alignContent:'center',
    justifyContent:'center'
  },
  vContent:{
    width:'100%',
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