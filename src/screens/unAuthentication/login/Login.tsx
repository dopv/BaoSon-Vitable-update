import React, { useState } from 'react';
import {
    Text, TextInput, View, TouchableOpacity,
    ScrollView, ImageBackground, Dimensions, ActivityIndicator
} from 'react-native';
import { Screen } from '../../../library/components/screen/index';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Post } from '../../../library/networking/fetch';
import { validateEmail } from '../../../library/utils/validate';
import { TOKEN } from '../../../common/keyStore';
import { styles } from './style';
import DropDownHolder from '../../../library/utils/dropDownHolder';
const { height, width } = Dimensions.get('window');

export const Login = (props: any) => {
    const { route } = props;
    const { actionLogin } = route.params;
    const [dataLogin, setDataLogin] = useState({ email: '', password: '' });
    const [remember, setRemember] = useState(false);
    const [validateInputEmail, setValidateInputEmail] = useState('');
    const [validateInputPassword, setValidateInputPassword] = useState('');
    const [isLogin, setLogin] = useState(false);
    const [loginState, setLoginState] = useState('');

    const onChange = (key: string, value: string) => {
        if (key === 'email' && value !== '') {
            setValidateInputEmail('');
        }
        if (key === 'password' && value !== '') {
            setValidateInputPassword('');
        }
        setLoginState('');
        setDataLogin({
            ...dataLogin,
            [key]: value
        })
    }

    const onClickToLogin = () => {
        if (isLogin) return;
        setLoginState('');
        if (!dataLogin.email || !validateEmail(dataLogin.email)) {
            setValidateInputEmail('Invalide email address format');
            return;
        }
        setValidateInputEmail('');
        if (!dataLogin.password) {
            setValidateInputPassword('Password cannot be empty');
            return;
        }
        setValidateInputPassword('');
        setLogin(true);
        Post('/api/v1/auth/login', dataLogin)
            .then(response => {
                response.json().then(data => {
                    if (data.message) {
                        setLoginState(data.message);
                    } else {
                        if (remember) {
                            AsyncStorage.setItem(TOKEN, JSON.stringify(data.access_token));
                        }
                        actionLogin && actionLogin(data || null);
                    }
                    setLogin(false);
                });
            }).catch(err => {
                setLogin(false);
                console.log('err', err)
            })
    }

    return (
        <Screen
            isScroll={false}
            hidden={false}
            backgroundColor={'#fff'}
            forceInset={{ bottom: 'never', top: 'never' }}
        >
            <ScrollView style={styles.fullScreen}>
                <ImageBackground
                    source={require('../../../../assets/images/login-bg.png')}
                    style={{
                        width: width,
                        height: height
                    }}
                >
                    <View
                        style={styles.vHeader}
                    >
                        <Text
                            style={styles.sTextTopHeader}
                        >
                            First, please sign in
                        </Text>
                        <Text
                            style={styles.sTextContentHeader}
                        >
                            For the moment the Vitable App is only accessible pour our clients.{'\n'}
                            To discover our offer, you can go check our website<Text> </Text>
                            <Text style={styles.sTextLink}>vitable.com.au</Text>
                        </Text>
                    </View>
                    <View
                        style={styles.vFormInput}
                    >
                        <View
                            style={styles.vInputEmail}
                        >
                            <Text style={[styles.sTextLabel, validateInputEmail !== ''
                                && { color: '#F5785A' }]}
                            >
                                Email address
                            </Text>
                            <View>
                                <TextInput
                                    value={dataLogin.email}
                                    onChangeText={(email) => onChange ? onChange('email', email) : null}
                                    style={[styles.sInput, validateInputEmail !== '' && { color: '#F5785A' }]}
                                    placeholder='Your mail address here...'
                                />
                            </View>
                            {validateInputEmail !== '' && <Text
                                style={styles.sTextInvalid}
                            >
                                {validateInputEmail}
                            </Text>}
                        </View>
                        <View
                            style={[styles.vInputEmail, { marginTop: height * 0.028169 }]}
                        >
                            <Text style={[styles.sTextLabel, validateInputPassword !== ''
                                && { color: '#F5785A' }]}>
                                Password
                            </Text>
                            <View>
                                <TextInput
                                    value={dataLogin.password}
                                    onChangeText={(password) => onChange ? onChange('password', password) : null}
                                    style={styles.sInput}
                                    secureTextEntry={true}
                                    placeholder='Your password here...'
                                />
                            </View>
                            {validateInputPassword !== '' && <Text
                                style={styles.sTextInvalid}
                            >
                                {validateInputPassword}
                            </Text>}
                        </View>
                    </View>
                    {loginState !== '' && <Text
                        style={styles.sTextLoginFailed}
                    >
                        {loginState}
                    </Text>}
                    <View
                        style={styles.vFormAction}
                    >
                        <TouchableOpacity
                            style={styles.vButton}
                            onPress={onClickToLogin}
                        >
                            <Text
                                style={styles.sTextSingIn}
                            >
                                Sing in
                            </Text>
                        </TouchableOpacity>
                        <Text
                            style={styles.sTextForgot}
                        >
                            Forgot my password
                        </Text>
                    </View>
                </ImageBackground>
            </ScrollView>
        </Screen>
    )
}