import React from 'react';
import { NavigationContainer, DarkTheme, DefaultTheme } from '@react-navigation/native';
import { StackNavigator } from './Stack';
import { useTheme } from 'react-native-paper';
import { MyDrawer } from './Drawer';

export const RootNavigator = (props: any) => {
    const theme = useTheme();
    const navigationTheme = theme.dark ? DarkTheme : DefaultTheme;

    return (
        <NavigationContainer theme={navigationTheme}>
            <StackNavigator props={props} />
        </NavigationContainer>
    )
  
}