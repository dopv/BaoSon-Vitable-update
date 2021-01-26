import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { PackScreen } from '../screens/authentication/pack/PackScreen';
import { TrackingScreen } from '../screens/authentication/tracking/TrackingScreen';
import { Menu } from '../screens/authentication/menu/Menu';
import { Dimensions } from 'react-native';
import { HomePage } from '../screens/authentication/home/HomePage';
import { HOME_SCREEN, PACK_SCREEN, PROFILE_SCREEN, TRACKING_SCREEN, BROWSER_SHOP_SCREEN } from './TypeScreen';
import { Profile } from '../screens/authentication/profile/Profile';
import { BrowserShopScreen } from '../screens/authentication/browserShop/BrowerShopScreen';
const Drawer = createDrawerNavigator();
const { width } = Dimensions.get('window')
export const MyDrawer = () => {
    return (
        <Drawer.Navigator
            drawerContent={(props) => <Menu {...props} />}
            drawerStyle={{
                width: width,
            }}
        >
            <Drawer.Screen name={HOME_SCREEN} component={HomePage} />
            <Drawer.Screen name={TRACKING_SCREEN} component={TrackingScreen} />
            <Drawer.Screen name={PACK_SCREEN} component={PackScreen} />
            <Drawer.Screen name={BROWSER_SHOP_SCREEN} component={BrowserShopScreen} />
            <Drawer.Screen name={PROFILE_SCREEN} component={Profile} />
        </Drawer.Navigator>
    );
}
