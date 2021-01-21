import React from 'react';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import { Login } from '../screens/unAuthentication/login/Login';
import { Dashboard } from '../screens/authentication/dashboard/Dashboard';
import { StoreContainer } from "../../src/store/store";
import { Splash } from '../screens/unAuthentication/splash/Splash';

const Stack = createStackNavigator();

export const StackNavigator = () => {
    const { isAuth } = StoreContainer.useContainer();
    return <Stack.Navigator
        headerMode='none'
        initialRouteName="Splash"
            screenOptions={{
            headerShown: false,
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
      }}
    >
        {isAuth ?
            <Stack.Screen
                component={Dashboard}
                name="Dashboard"
            />
            :
            isAuth === false ? <Stack.Screen
                component={Login}
                name="Login"
                options={{animationTypeForReplace:'pop'}}
            />
                :
                <Stack.Screen
                    component={Splash}
                    name="Splash"
                />
        }
    </Stack.Navigator>
}