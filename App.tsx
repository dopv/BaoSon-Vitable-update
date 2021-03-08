import React, { useEffect, useState } from "react";
import { RootNavigator } from "./src/navigation/Root";
import NetInfo from "@react-native-community/netinfo";
import { NetworkError } from "./src/components/NetworkError";
import { ContainerProvider } from "./src/store/store";
import DropDownHolder from "./src/library/utils/dropDownHolder";
import { initPush } from "./src/library/push";
import DropdownAlert from "react-native-dropdownalert";
import { StatusBarHeight } from "./src/config/heightStatusbar";
import { FONT_14 } from "./src/themes/fontSize";
import * as Font from "expo-font";
import * as Analytics from "expo-firebase-analytics";
import * as Sentry from "sentry-expo";
import Constants from "expo-constants";
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { ApplicationProvider, IconRegistry } from "react-native-ui-kitten";
import * as eva from "@eva-design/eva";
import theme from "./src/themes/ui-theme.json";
const {
  manifest: {
    extra: { sentry },
  },
} = Constants;
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
      SolaireDT: require("./assets/font/SolaireDT-Regular.ttf"),
      NHaasGroteskTXPro: require("./assets/font/Linotype-NHaasGroteskTXPro-55Rg.ttf"),
      NHaasGroteskTXProBold: require("./assets/font/Linotype-NHaasGroteskTXPro-65Md.ttf"),
      HOMEMADE_APPLE: require("./assets/font/HomemadeApple-Regular.ttf"),
    });
    setLoadFont(true);
  };

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
    await Analytics.logEvent("APP_OPEN", {
      name: "app_open",
      screen: "app",
      purpose: "Opens app",
    });
  };

  useEffect(() => {
    const unsubcribe = NetInfo.addEventListener((state: any) => {
      if (state.isConnected && isDisconnect) {
        setDisconnect(false);
      } else if (!state.isConnected && !isDisconnect) {
        setDisconnect(true);
      }
    });
    return () => unsubcribe();
  }, [isDisconnect]);

  if (!fontsLoaded) return null;

  return (
    <ContainerProvider>
      <>
        <IconRegistry icons={EvaIconsPack} />
        <ApplicationProvider {...eva} mapping={eva.mapping} theme={{ ...eva.light, ...theme }}>
          {isDisconnect && <NetworkError />}
          <RootNavigator />
          <DropdownAlert
            imageStyle={{ marginTop: StatusBarHeight }}
            messageStyle={{
              marginTop: StatusBarHeight,
              fontSize: FONT_14,
              color: "#fff",
            }}
            updateStatusBar={false}
            ref={(ref) => DropDownHolder.setDropDown(ref)}
            closeInterval={1000}
          />
        </ApplicationProvider>
      </>
    </ContainerProvider>
  );
}
