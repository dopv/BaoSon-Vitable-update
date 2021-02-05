import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { PackScreen } from '../screens/authentication/pack/PackScreen';
import { Menu } from '../screens/authentication/menu/Menu';
import { Dimensions } from 'react-native';
import { HomePage } from '../screens/authentication/home/HomePage';
import {
    HOME_SCREEN, PACK_SCREEN, PROFILE_SCREEN,
    BROWSER_SHOP_SCREEN,
    SUPPORT_SCREEN, ACCOUNT_DETAIL_SCREEN
} from './TypeScreen';
import { Profile } from '../screens/authentication/profile/Profile';
import { BrowserShopScreen } from '../screens/authentication/browserShop/BrowerShopScreen';
import { Support } from '../screens/authentication/support-help/Support';
import { AccountDetail } from '../screens/authentication/account-detail/AccountDetail';
import { OnBoarding } from '../screens/authentication/onboarding/OnBoarding';
const Drawer = createDrawerNavigator();
const { width } = Dimensions.get('window');

export const MyDrawer = (props: any) => {
    return (
        <Drawer.Navigator
            drawerContent={(props) => <Menu {...props} />}
            drawerStyle={{
                width: width
            }}
        >
            <Drawer.Screen name={HOME_SCREEN} component={HomePage} />
            <Drawer.Screen name={PACK_SCREEN} component={PackScreen} />
            <Drawer.Screen name={BROWSER_SHOP_SCREEN} component={BrowserShopScreen} />
            <Drawer.Screen
                name={PROFILE_SCREEN}
                component={OnBoarding}
            />
            <Drawer.Screen name={SUPPORT_SCREEN} component={Support} />
            <Drawer.Screen
                name={ACCOUNT_DETAIL_SCREEN}
                component={AccountDetail}
                initialParams={props && props.route && props.route.params
                    && props.route.params.props
                }
            />
        </Drawer.Navigator>
    );
}
