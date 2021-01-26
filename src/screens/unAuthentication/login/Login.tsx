import React, { useState } from 'react';
import { Text, TextInput, View, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Screen } from '../../../library/components/screen/index';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Post } from '../../../library/networking/fetch';
import { validateEmail } from '../../../library/utils/validate';
import { TOKEN } from '../../../common/keyStore';
import { translate } from '../../../library/utils/i18n/translate';
import { styles } from './style';
import SvgTitleLogo from '../../../themes/svg';
import DropDownHolder from '../../../library/utils/dropDownHolder';

export const Login = (props: any) => {
    const { route } = props;
    const { actionLogin } = route.params;
    const [dataLogin, setDataLogin] = useState({ email: '', password: '' });
    const [validator, setValidator] = useState({ invalidEmail: '', invalidPassword: '' });
    const [remember, setRemember] = useState(false);

    const onChange = (key: string, value: string) => {
        setDataLogin({
            ...dataLogin,
            [key]: value
        })
    }

    const onClickToLogin = () => {
        if (!dataLogin.email) {
            setValidator({
                ...validator,
                invalidEmail: 'Email is not vacant'
            })
            return;
        }
        if (!validateEmail(dataLogin.email)) {
            setValidator({
                ...validator,
                invalidEmail: 'Email invalid'
            })
            return;
        }
        if (!dataLogin.password) {
            setValidator({
                ...validator,
                invalidPassword: 'Password is not vacant'
            })
            return;
        }
        setValidator({ invalidEmail: '', invalidPassword: '' });
        Post('/api/v1/auth/login', dataLogin)
            .then(response => {
                response.json().then(data => {
                    if (data.message) {
                        DropDownHolder.showError('', data.message)
                    } else {
                        if(remember){
                            AsyncStorage.setItem(TOKEN, JSON.stringify(data.access_token));
                        }
                        actionLogin && actionLogin(data || null);
                    }

                });
            }).catch(err => {
                console.log('err', err)
            })
    }

    const onRemember = () => {
        setRemember(!remember)
    }
    return (
        <Screen
            isScroll={false}
            hidden={false}
            backgroundColor={'#fff'}
            forceInset={{ bottom: 'never', top: 'never' }}
        >
            <ScrollView style={styles.fullScreen}>
                <View style={styles.header}>
                    <Text style={styles.titleHeader}>{translate('UNAUTHENTIC:HEADER_LOGIN')}</Text>
                </View>
                <View style={styles.content}>
                    <View style={styles.vLogo}>
                        <SvgTitleLogo />
                    </View>
                    <View style={styles.vInput}>
                        <Text style={styles.titEmail}>{translate('UNAUTHENTIC:EMAIL') || ""}</Text>
                        <TextInput
                            value={dataLogin.email}
                            onChangeText={(email) => onChange ? onChange('email', email) : null}
                            style={styles.input}
                        />
                        {validator.invalidEmail !== '' && <Text
                            style={styles.invalid}
                        >
                            {validator.invalidEmail}
                        </Text>}
                    </View>

                    <View style={styles.vInput}>
                        <Text style={styles.titEmail}>{translate('UNAUTHENTIC:PASSWORD') || ""}</Text>
                        <TextInput
                            secureTextEntry={true}
                            value={dataLogin.password}
                            onChangeText={(password) => onChange ? onChange('password', password) : null}
                            style={styles.input}
                        />
                        {validator.invalidPassword !== '' && <Text
                            style={styles.invalid}
                        >
                            {validator.invalidPassword}
                        </Text>}
                    </View>
                    <View style={styles.vBottom}>
                        <TouchableOpacity onPress={onRemember} style={styles.btnRemember}>
                            <View style={remember ? styles.vRemember : styles.vUnRemember} />
                            <Text style={styles.tRemember}>REMEMBER ME</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.btnLogin}
                            onPress={onClickToLogin}
                        >
                            <Text
                                style={styles.tLogin}
                            >
                                {translate('UNAUTHENTIC:LOGIN')}
                            </Text>
                            <Image
                                source={require('../../../../assets/images/ButtonArrow_login.png')}
                                style={styles.imgLogin}
                            />
                        </TouchableOpacity>
                    </View>
                </View>


            </ScrollView>
        </Screen>
    )
}