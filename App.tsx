import React, { useEffect, useState } from 'react';
import { RootNavigator } from './src/navigation/Root';
import NetInfo from "@react-native-community/netinfo";
import { NetworkError } from './src/components/NetworkError';
import { StoreContainer } from "./src/store/store"

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

  return (
    <StoreContainer.Provider>
      {isDisconnect && <NetworkError />}
        <RootNavigator />
    </StoreContainer.Provider>
  );
}
