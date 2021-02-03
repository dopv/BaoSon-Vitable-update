import React, { useState } from 'react';
import {
    Text, TextInput, View, TouchableOpacity,
    ScrollView, ImageBackground, Dimensions,
    StatusBar, Linking, TouchableWithoutFeedback,
    Image
} from 'react-native';
import { Screen } from '../../../library/components/screen/index';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Get, Post } from '../../../library/networking/fetch';
import { validateEmail } from '../../../library/utils/validate';
import { TOKEN } from '../../../common/keyStore';
import { styles } from './style';
import { translate } from '../../../library/utils/i18n/translate';
import { ProcessDialog } from '../../../library/components/processDialog';
const { height: heightScr, width } = Dimensions.get('window');
const statusBarHeight = StatusBar.currentHeight &&
    StatusBar.currentHeight >= 38 &&
    StatusBar.currentHeight || 0;
const height = heightScr + statusBarHeight;

interface LoginProps {
    route: any,
    navigation: any
}

export const Login = (props: LoginProps) => {
    const { route, navigation } = props;
    const { getUserInfoAction } = route.params;
    const [dataLogin, setDataLogin] = useState({ email: '', password: '' });
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

    const onPressToLogin = () => {
        if (isLogin) return;
        setLoginState('');
        if (!dataLogin.email || !validateEmail(dataLogin.email)) {
            setValidateInputEmail(`${translate('UNAUTHENTIC:INVALID_EMAIL')}`);
            return;
        }
        setValidateInputEmail('');
        if (!dataLogin.password) {
            setValidateInputPassword(`${translate('UNAUTHENTIC:INVALID_PASSWORD')}`);
            return;
        }
        setValidateInputPassword('');
        setLogin(true);
        Post('/api/v1/auth/login', dataLogin)
            .then(response => {
                response.json().then(async data => {
                    if (data.message) {
                        setLoginState(data.message);
                    } else {
                        await AsyncStorage.setItem(TOKEN, JSON.stringify(data.access_token));
                        getUserInfo(data.access_token);
                    }
                    setLogin(false);
                });
            }).catch(err => {
                setLogin(false);
                console.log('err', err)
            })
    }

    const getUserInfo = (token: string) => {
        Get(`/api/v1/me/profile`).then(response => {
            response.json().then(data => {
                getUserInfoAction && getUserInfoAction(data.data, token);
            });
        }).catch(err => {
            console.log('err', err);
        })
    }

    const onPressToForgot = () => {
        navigation && navigation.navigate('ForgotPassword');
    }

    const onPressGoToWeb = () => {
        Linking.openURL('https://www.vitable.com.au/');
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
                    resizeMode="stretch"
                >
                    <ProcessDialog visible={isLogin} />
                    <Image
                        source={require('../../../../assets/images/Logo-black.png')}
                        style={styles.sImgLogo}
                    />
                    <View
                        style={styles.vHeader}
                    >
                        <Text
                            allowFontScaling={false}
                            style={styles.sTextTopHeader}
                        >
                            {translate('UNAUTHENTIC:FIRST_SIGNIN')}
                        </Text>
                        <View style={styles.vContent}>
                            <Text
                                allowFontScaling={false}
                                style={styles.sTextContentHeader}
                            >
                                {translate('UNAUTHENTIC:FOR_THE_MOMENT')}
                                {translate('UNAUTHENTIC:NEW_LINE')}
                                {translate('UNAUTHENTIC:TO_DISCOVER_OUR_OFFER')}
                                {translate('UNAUTHENTIC:SPACE')}
                                <TouchableWithoutFeedback
                                    onPress={onPressGoToWeb}
                                    style={{ zIndex: 2 }}
                                >
                                    <Text
                                        allowFontScaling={false} style={styles.sTextLink}>{translate('UNAUTHENTIC:LINK')}
                                    </Text>
                                </TouchableWithoutFeedback>
                            </Text>
                        </View>
                    </View>
                    <View
                        style={styles.vFormInput}
                    >
                        <View
                            style={styles.vInputEmail}
                        >
                            <Text
                                allowFontScaling={false} style={[styles.sTextLabel, validateInputEmail !== ''
                                    && { color: '#F5785A' }]}
                            >
                                {translate('UNAUTHENTIC:EMAIL')}
                            </Text>
                            <View>
                                <TextInput
                                    allowFontScaling={false}
                                    value={dataLogin.email}
                                    onChangeText={(email) => onChange ? onChange('email', email) : null}
                                    style={[styles.sInput, validateInputEmail !== '' && { color: '#F5785A' }]}
                                    placeholder={`${translate('UNAUTHENTIC:ENTER_MAIL_HERE')}`}
                                />
                            </View>
                            {validateInputEmail !== '' && <Text
                                allowFontScaling={false}
                                style={styles.sTextInvalid}
                            >
                                {validateInputEmail}
                            </Text>}
                        </View>
                        <View
                            style={[styles.vInputEmail, { marginTop: height * 0.028169 }]}
                        >
                            <Text
                                allowFontScaling={false} style={[styles.sTextLabel, validateInputPassword !== ''
                                    && { color: '#F5785A' }]}>
                                {translate('UNAUTHENTIC:PASSWORD')}
                            </Text>
                            <View>
                                <TextInput
                                    allowFontScaling={false}
                                    value={dataLogin.password}
                                    onChangeText={(password) => onChange ? onChange('password', password) : null}
                                    style={styles.sInput}
                                    secureTextEntry={true}
                                    placeholder={`${translate('UNAUTHENTIC:ENTER_PASSWORD_HERE')}`}
                                />
                            </View>
                            {validateInputPassword !== '' && <Text
                                allowFontScaling={false}
                                style={styles.sTextInvalid}
                            >
                                {validateInputPassword}
                            </Text>}
                        </View>
                    </View>
                    {loginState !== '' && <Text
                        allowFontScaling={false}
                        style={styles.sTextLoginFailed}
                    >
                        {translate('UNAUTHENTIC:INCORRECT_LOGIN')}
                    </Text>}
                    <View
                        style={styles.vFormAction}
                    >
                        <TouchableOpacity
                            style={styles.vButton}
                            onPress={onPressToLogin}
                        >
                            <Text
                                allowFontScaling={false}
                                style={styles.sTextSingIn}
                            >
                                {translate('UNAUTHENTIC:SIGNIN')}
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{ zIndex: 2 }}
                            onPress={onPressToForgot}
                        >
                            <Text
                                allowFontScaling={false}
                                style={styles.sTextForgot}
                            >
                                {translate('UNAUTHENTIC:FORGOT_PASSWORD')}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </ImageBackground>
            </ScrollView>
        </Screen>
    )
}