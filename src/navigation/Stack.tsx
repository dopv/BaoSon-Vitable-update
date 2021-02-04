import React, { useState, useEffect } from 'react';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import { Login } from '../screens/unAuthentication/login/Login';
import { Splash } from '../screens/unAuthentication/splash/Splash';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TOKEN } from '../common/keyStore';
import { MyDrawer } from './Drawer';
import { MY_PACK, QUIZ_SCREEN, DETAIL } from './TypeScreen';
import { Quiz } from '../screens/authentication/quiz/Quiz';
import { ForgotPassword } from '../screens/unAuthentication/forgot-password/ForgotPassword';
import { MyPackScreen } from '../screens/authentication/myPack';
import { Get } from '../library/networking/fetch';
import { Detail } from '../screens/authentication/detail/Detail';

const Stack = createStackNavigator();

export const StackNavigator = (props: any) => {
    const { stateAuth, setToken, getUserInfoAction } = props.props;
    let dataAuth = null;
    let isLogout = false;
    let token = '';
    if (stateAuth) {
        dataAuth = stateAuth.dataAuth
        isLogout = stateAuth.isLogout
        token = stateAuth.token
    }
    const [isLoading, setIsLoading] = useState(true);

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
                }
            }else{
                setIsLoading(false);
            }
        }, 2000);
    }

    const getUserInfo = async (token: string) => {
        Get(`/api/v1/me/profile`).then(response => {
            response.json().then(data => {
                getUserInfoAction && getUserInfoAction(data.data, token);
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
                            initialParams={props}
                        />
                        <Stack.Screen
                            component={Quiz}
                            name={QUIZ_SCREEN}
                            initialParams={props.props}
                        />
                        <Stack.Screen
                            component={Detail}
                            name={DETAIL}
                            initialParams={props.props}
                        />
                        <Stack.Screen
                            component={MyPackScreen}
                            name={MY_PACK}
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