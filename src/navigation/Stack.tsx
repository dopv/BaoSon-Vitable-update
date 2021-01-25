import React, { useState, useEffect } from 'react';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import { Login } from '../screens/unAuthentication/login/Login';
import { Dashboard } from '../screens/authentication/dashboard/Dashboard';
import { HomePage } from '../screens/authentication/home/HomePage';
import { Splash } from '../screens/unAuthentication/splash/Splash';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TOKEN } from '../common/keyStore';

const Stack = createStackNavigator();

export const StackNavigator = (props: any) => {
    console.log("stack", props.props)
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
                    console.log("token", token)
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
                        {/* <Stack.Screen
                            component={Dashboard}
                            name="Dashboard"
                            initialParams={props.props}
                        /> */}
                        <Stack.Screen
                            component={HomePage}
                            name="HomePage"
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