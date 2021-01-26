import React, { useState } from 'react';
import {
    Text, TextInput, View, TouchableOpacity,
    ScrollView, ImageBackground, Dimensions,
    StatusBar
} from 'react-native';
import { Screen } from '../../../library/components/screen/index';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Post } from '../../../library/networking/fetch';
import { validateEmail } from '../../../library/utils/validate';
import { TOKEN } from '../../../common/keyStore';
import { styles } from './style';
import { translate } from '../../../library/utils/i18n/translate';
const { height: heightScr, width } = Dimensions.get('window');
const statusBarHeight = StatusBar.currentHeight &&
    StatusBar.currentHeight >= 38 &&
    StatusBar.currentHeight || 0;
const height = heightScr + statusBarHeight;

export const Login = (props: any) => {
    const { route } = props;
    const { actionLogin } = route.params;
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

    const onClickToLogin = () => {
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
                response.json().then(data => {
                    if (data.message) {
                        setLoginState(data.message);
                    } else {
                        AsyncStorage.setItem(TOKEN, JSON.stringify(data.access_token));
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
                    resizeMode="stretch"
                >
                    <View
                        style={styles.vHeader}
                    >
                        <Text
                            style={styles.sTextTopHeader}
                        >
                            {translate('UNAUTHENTIC:FIRST_SIGNIN')}
                        </Text>
                        <Text
                            style={styles.sTextContentHeader}
                        >
                            {translate('UNAUTHENTIC:FOR_THE_MOMENT')}
                            {translate('UNAUTHENTIC:NEW_LINE')}
                            {translate('UNAUTHENTIC:TO_DISCOVER_OUR_OFFER')}
                            {translate('UNAUTHENTIC:SPACE')}
                            <Text style={styles.sTextLink}>{translate('UNAUTHENTIC:LINK')}</Text>
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
                                {translate('UNAUTHENTIC:EMAIL')}
                            </Text>
                            <View>
                                <TextInput
                                    value={dataLogin.email}
                                    onChangeText={(email) => onChange ? onChange('email', email) : null}
                                    style={[styles.sInput, validateInputEmail !== '' && { color: '#F5785A' }]}
                                    placeholder={`${translate('UNAUTHENTIC:ENTER_MAIL_HERE')}`}
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
                                {translate('UNAUTHENTIC:PASSWORD')}
                            </Text>
                            <View>
                                <TextInput
                                    value={dataLogin.password}
                                    onChangeText={(password) => onChange ? onChange('password', password) : null}
                                    style={styles.sInput}
                                    secureTextEntry={true}
                                    placeholder={`${translate('UNAUTHENTIC:ENTER_PASSWORD_HERE')}`}
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
                                {translate('UNAUTHENTIC:SIGNIN')}
                            </Text>
                        </TouchableOpacity>
                        <Text
                            style={styles.sTextForgot}
                        >
                            {translate('UNAUTHENTIC:FORGOT_PASSWORD')}
                        </Text>
                    </View>
                </ImageBackground>
            </ScrollView>
        </Screen>
    )
}