import React, { useState, useEffect } from 'react';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import { Login } from '../screens/unAuthentication/login/Login';
import { Splash } from '../screens/unAuthentication/splash/Splash';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TOKEN } from '../common/keyStore';
import { MyDrawer } from './Drawer';
import { QUIZ_SCREEN, ONBOARDING, ONBOARDING_SCROLL, ONBOARDING_END } from './TypeScreen';
import { Quiz } from '../screens/authentication/quiz/Quiz';
import { ForgotPassword } from '../screens/unAuthentication/forgot-password/ForgotPassword';
import { OnBoarding } from '../screens/unAuthentication/onboarding';
import { OnBoardingScroll } from '../screens/unAuthentication/onboarding/components/onBoardingScroll';
import { OnBoardingEnd } from '../screens/unAuthentication/onboarding/components/welcomeEnd/OnBoardingEnd';

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
                            initialParams={props}
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
                            <Stack.Screen
                                component={ForgotPassword}
                                name="ForgotPassword"
                                initialParams={props.props}
                            />
                            <Stack.Screen
                                component={OnBoarding}
                                name={ONBOARDING}
                                initialParams={props.props}
                            />
                            <Stack.Screen
                                component={OnBoardingScroll}
                                name={ONBOARDING_SCROLL}
                                initialParams={props.props}
                            />
                            <Stack.Screen
                                component={OnBoardingEnd}
                                name={ONBOARDING_END}
                                initialParams={props.props}
                            />
                        </>
                    )
            ) :
                <Stack.Screen name="Splash" component={Splash} />
            }
        </Stack.Navigator>
    )
}