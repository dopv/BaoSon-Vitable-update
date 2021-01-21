import {Platform} from 'react-native';
export const fonts = Platform.select({
  android: {
    COMFORTAA_BOLD : 'Comfortaa-Bold',
    COMFORTAA_LIGHT: 'Comfortaa-Light',
    COMFORTAA_MEDIUM: 'Comfortaa-Medium',
    COMFORTAA_REGULAR: 'Comfortaa-Regular',
    COMFORTAA_SEMIBOLD: 'Comfortaa-SemiBold',
    OPENSANS_BOLD: 'OpenSans-Bold',
    OPENSANS_REGULAR :'OpenSans-Regular',
    OPENSANS_SEMIBOLD: 'OpenSans-SemiBold',
    ROBOTO_REGULAR: 'Roboto-Regular',
    ROBOTO_BOLD: 'Roboto-Bold',
    ROBOTO_SEMIBOLD: 'Roboto-Medium'
  },
  ios: {
    COMFORTAA_BOLD : 'Comfortaa-Bold',
    COMFORTAA_LIGHT: 'Comfortaa-Light',
    COMFORTAA_MEDIUM: 'Comfortaa-Medium',
    COMFORTAA_REGULAR: 'Comfortaa-Regular',
    COMFORTAA_SEMIBOLD: 'Comfortaa-SemiBold',
    OPENSANS_BOLD: 'OpenSans-Bold',
    OPENSANS_REGULAR :'OpenSans-Regular',
    OPENSANS_SEMIBOLD: 'OpenSans-SemiBold',
    ROBOTO_REGULAR: 'Roboto-Regular',
    ROBOTO_BOLD: 'Roboto-Bold',
    ROBOTO_SEMIBOLD: 'Roboto-Medium'
  }
});
