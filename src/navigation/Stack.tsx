import React, { useState, useEffect } from 'react';
import { createStackNavigator, CardStyleInterpolators, TransitionSpecs, HeaderStyleInterpolators } from '@react-navigation/stack';
import { Login } from '../screens/unAuthentication/login/Login';
import { HomePage } from '../screens/authentication/home/HomePage';
import { Splash } from '../screens/unAuthentication/splash/Splash';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TOKEN } from '../common/keyStore';
import { Menu } from '../screens/authentication/menu/Menu';

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
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true)
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
        >
            {!isLoading ? (
                token ?
                    (<>
                        <Stack.Screen
                            component={HomePage}
                            name="HomePage"
                            initialParams={props.props}
                        />
                        <Stack.Screen
                            component={Menu}
                            name="Menu"
                            initialParams={props.props}
                            options={{
                                transitionSpec: {
                                    open: TransitionSpecs.TransitionIOSSpec,
                                    close: TransitionSpecs.TransitionIOSSpec,
                                },
                                headerStyleInterpolator: HeaderStyleInterpolators.forFade,
                                cardStyleInterpolator: ({ current, layouts }) => {
                                    return {
                                        cardStyle: {
                                            transform: [
                                                {
                                                    translateX: current.progress.interpolate({
                                                        inputRange: [0, 1],
                                                        outputRange: [-layouts.screen.width, 0]
                                                    })
                                                }
                                            ]
                                        }
                                    };
                                }
                            }}
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