import React, { useState, useEffect } from 'react';
import { createStackNavigator, CardStyleInterpolators, TransitionSpecs, HeaderStyleInterpolators } from '@react-navigation/stack';
import { Login } from '../screens/unAuthentication/login/Login';
import { HomePage } from '../screens/authentication/home/HomePage';
import { Splash } from '../screens/unAuthentication/splash/Splash';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TOKEN } from '../common/keyStore';
import { Menu } from '../screens/authentication/menu/Menu';
import { Profile } from '../screens/authentication/profile/Profile';
import { MyDrawer } from './Drawer';
import { HOME_SCREEN, PROFILE_SCREEN, QUIZ_SCREEN } from './TypeScreen';
import { Quiz } from '../screens/authentication/quiz/Quiz';

const Stack = createStackNavigator();

export const StackNavigator = (props: any) => {
    const { stateAuth, setToken } = props.props
    let dataAuth = null;
    let isLogout = false;
    let token = null;
    if (stateAuth) {
        dataAuth = stateAuth.dataAuth
        isLogout = stateAuth.isLogout
        token = stateAuth.token
    }
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            AsyncStorage.getItem(TOKEN).then((token: any) => {
                if (token) {
                    setToken && setToken(token || "");
                }
                setIsLoading(false);
            });
        }, 2000)
    }, []);
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
            }}
            initialRouteName="Splash"
        >
            {!isLoading ? (
                token ?
                    (<>
                        <Stack.Screen
                            component={MyDrawer}
                            name='MyDrawer'
                            initialParams={props.props}
                        />
                        <Stack.Screen
                            component={Quiz}
                            name={QUIZ_SCREEN}
                            initialParams={props.props}
                        />
                    </>)
                    :
                    (
                        <>
                            <Stack.Screen
                                component={Login}
                                name="Login"
                                initialParams={props.props}
                                options={{
                                    animationTypeForReplace: isLogout ? 'pop' : 'push'
                                }}
                            />
                        </>
                    )
            ) :
                <Stack.Screen name="Splash" component={Splash} />
            }
        </Stack.Navigator>
    )
}