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

export default function App() {
  const [isDisconnect, setDisconnect] = useState(false);

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
