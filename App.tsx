import React, { useEffect, useState } from 'react';
import { RootNavigator } from './src/navigation/Root';
import NetInfo from "@react-native-community/netinfo";
import { NetworkError } from './src/components/NetworkError';
import { rootReducer, mapStateToProps, mapDispatchToProps } from "./src/store/store";
import Provider, { connect } from 'un-redux';
import DropDownHolder from './src/library/utils/dropDownHolder';
import DropdownAlert from 'react-native-dropdownalert';
import { StatusBarHeight } from './src/config/heightStatusbar';
import { FONT_14 } from './src/themes/fontSize';
import * as Font from 'expo-font';
import { ProcessDialog } from './src/library/components/processDialog';
import { Analytics, PageHit, Event } from 'expo-analytics';
import * as firebase from 'firebase';
// import * as Analytics from 'expo-firebase-analytics';

export default function App() {
  const [isDisconnect, setDisconnect] = useState(false);
  const [fontsLoaded, setLoadFont] = useState(false);
  const analytics = new Analytics('GA-6M35D184LB');
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  // const analytics = firebase.analytics();

  const loadFonts = async () => {
    await Font.loadAsync({
      SolaireDT: require('./assets/font/SolaireDT-Regular.ttf'),
      NHaasGroteskTXPro: require('./assets/font/Linotype-NHaasGroteskTXPro-55Rg.ttf'),
      NHaasGroteskTXProBold: require('./assets/font/Linotype-NHaasGroteskTXPro-65Md.ttf')
    });
    setLoadFont(true);
  }

  useEffect( () => {
    loadFonts();
    const analyticsAsync = async () => {
      analytics.hit(new PageHit('Home'))
        .then(() => console.log("success"))
        .catch(e => console.log(e.message));
      analytics.event(new Event('Video', 'Play', 'The Big Lebowski', 123))
        .then(() => console.log("success event"))
        .catch(e => console.log(e.message));
      // await Analytics.setAnalyticsCollectionEnabled(true);
      // await Analytics.setDebugModeEnabled(true)
      // firebase.analytics().logEvent('notification_received');
      // await Analytics.logEvent('ButtonTapped', {
      //   name: 'settings',
      //   screen: 'profile',
      //   purpose: 'Opens the internal settings',
      // });
    }
    analyticsAsync()
  }, []);

  useEffect(() => {
    const unsubcribe = NetInfo.addEventListener((state: any) => {
      if (state.isConnected && isDisconnect) {
        setDisconnect(false);
      } else if (!state.isConnected && !isDisconnect) {
        setDisconnect(true);
      }
    });
    return () =>
      unsubcribe();
  }, [isDisconnect]);

  const AppConnected = connect(
    mapStateToProps,
    mapDispatchToProps
  )(RootNavigator);

  if (!fontsLoaded) return null;

  return (
    <Provider reducer={rootReducer}>
      <>
        {isDisconnect && <NetworkError />}
        <AppConnected />
        <DropdownAlert
          imageStyle={{ marginTop: StatusBarHeight }}
          messageStyle={{ marginTop: StatusBarHeight, fontSize: FONT_14, color: '#fff' }}
          updateStatusBar={false}
          ref={ref => DropDownHolder.setDropDown(ref)}
          closeInterval={1000}
        />
      </>
    </Provider>
  );
}
