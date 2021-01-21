import React from 'react';
import { NavigationContainer, DarkTheme, DefaultTheme } from '@react-navigation/native';
import { StackNavigator } from './Stack';
import { useTheme } from 'react-native-paper';

export const RootNavigator = () => {
    const theme = useTheme();
    const navigationTheme = theme.dark ? DarkTheme : DefaultTheme;

    return <NavigationContainer theme={navigationTheme}>
        <StackNavigator />
    </NavigationContainer>
}