import React, { useEffect, useState } from 'react';
import { RootNavigator } from './src/navigation/Root';
import NetInfo from "@react-native-community/netinfo";
import { NetworkError } from './src/components/NetworkError';
import { rootReducer, mapStateToProps, mapDispatchToProps } from "./src/store/store";
import Provider, { connect } from 'un-redux';
import DropDownHolder from './src/library/utils/dropDownHolder';
import {initPush} from './src/library/push';
import DropdownAlert from 'react-native-dropdownalert';
import { StatusBarHeight } from './src/config/heightStatusbar';
import { FONT_14 } from './src/themes/fontSize';
import * as Font from 'expo-font';
import * as Analytics from 'expo-firebase-analytics';
import * as Sentry from 'sentry-expo';
import Constants from 'expo-constants';
const {manifest:{extra:{sentry}}} = Constants;
Sentry.init({
  dsn: sentry.dsn,
  enableInExpoDevelopment: true,
  debug: sentry.debug, // Sentry will try to print out useful debugging information if something goes wrong with sending an event. Set this to `false` in production.
});
export default function App() {
  const [isDisconnect, setDisconnect] = useState(false);
  const [fontsLoaded, setLoadFont] = useState(false);

  const loadFonts = async () => {
    await Font.loadAsync({
      SolaireDT: require('./assets/font/SolaireDT-Regular.ttf'),
      NHaasGroteskTXPro: require('./assets/font/Linotype-NHaasGroteskTXPro-55Rg.ttf'),
      NHaasGroteskTXProBold: require('./assets/font/Linotype-NHaasGroteskTXPro-65Md.ttf'),
      HOMEMADE_APPLE: require('./assets/font/HomemadeApple-Regular.ttf')
    });
    setLoadFont(true);
  }

  useEffect(() => {
    loadFonts();
  }, []);

  useEffect(() => {
    logEventOpenApp();
  }, []);
  useEffect(() => {
    initPush();
  }, []);

  const logEventOpenApp = async () => {
    await Analytics.logEvent('APP_OPEN', {
      name: 'app_open',
      screen: 'app',
      purpose: 'Opens app',
    });
  }

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
