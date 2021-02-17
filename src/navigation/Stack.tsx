import React, { useState, useEffect } from 'react';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import { Login } from '../screens/unAuthentication/login/Login';
import { Splash } from '../screens/unAuthentication/splash/Splash';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TOKEN } from '../common/keyStore';
import { MyDrawer } from './Drawer';
import { QUIZ_SCREEN, ONBOARDING, ONBOARDING_SCROLL, ONBOARDING_END, DETAIL, MY_PACK } from './TypeScreen';
import { Quiz } from '../screens/authentication/quiz/Quiz';
import { ForgotPassword } from '../screens/unAuthentication/forgot-password/ForgotPassword';
import { OnBoarding } from '../screens/unAuthentication/onboarding';
import { OnBoardingScroll } from '../screens/unAuthentication/onboarding/components/onBoardingScroll';
import { OnBoardingEnd } from '../screens/unAuthentication/onboarding/components/welcomeEnd/OnBoardingEnd';
import { MyPackScreen } from '../screens/authentication/myPack';
import { Get } from '../library/networking/fetch';
import { updatePushToken } from '../library/push';
import { Detail } from '../screens/authentication/detail/Detail';
import { useContainer } from '../store/store';

const Stack = createStackNavigator();

export const StackNavigator = (props: any) => {
    const [isLoading, setIsLoading] = useState(true);
    const setUserInfo = useContainer(container => container.getUserInfoAction);
    const isLogout = useContainer(container => container.isLogout);
    const token = useContainer(container => container.token);

    useEffect(() => {
        checkToken();
    }, []);

    const checkToken = () => {
        setTimeout(async () => {
            let tokenJson = await AsyncStorage.getItem(TOKEN);
            if (tokenJson) {
                let token = JSON.parse(tokenJson);
                if (token) {
                    await getUserInfo(token);
                    updatePushToken()
                }
            } else {
                setIsLoading(false);
            }
        }, 2000);
    }

    const getUserInfo = async (token: string) => {
        Get(`/api/v1/me/profile`).then(response => {
            response.json().then(data => {
                setUserInfo(data.data, token);
                setIsLoading(false);
            });
        }).catch(err => {
            console.log('err', err);
        })
    }

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
                        />
                        <Stack.Screen
                            component={Quiz}
                            name={QUIZ_SCREEN}
                        />
                        <Stack.Screen
                            component={Detail}
                            name={DETAIL}
                        />
                        <Stack.Screen
                            component={MyPackScreen}
                            name={MY_PACK}
                        />
                    </>)
                    :
                    (
                        <>
                            <Stack.Screen
                                component={Login}
                                name="Login"
                                options={{
                                    animationTypeForReplace: isLogout ? 'pop' : 'push'
                                }}
                            />
                            <Stack.Screen
                                component={ForgotPassword}
                                name="ForgotPassword"
                            />
                            <Stack.Screen
                                component={OnBoarding}
                                name={ONBOARDING}
                            />
                            <Stack.Screen
                                component={OnBoardingScroll}
                                name={ONBOARDING_SCROLL}
                            />
                            <Stack.Screen
                                component={OnBoardingEnd}
                                name={ONBOARDING_END}
                            />
                        </>
                    )
            ) :
                <Stack.Screen
                    name="Splash"
                    component={Splash}
                />
            }
        </Stack.Navigator>
    )
}
