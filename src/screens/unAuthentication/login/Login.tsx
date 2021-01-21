import React, { useState } from 'react';
import { Text, TextInput, Dimensions, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Screen } from '../../../library/components/screen/index';
import { FONT_15 } from '../../../themes/fontSize';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Post } from '../../../library/networking/fetch';
import { validateEmail } from '../../../library/utils/validate';
import { TOKEN_AUTHENTICATION } from '../../../common/keyStore';
import { StoreContainer } from "../../../store/store";
import { translate } from '../../../library/utils/i18n/translate';

const { width } = Dimensions.get('window');

export const Login = () => {
    const { login } = StoreContainer.useContainer();
    const [dataLogin, setDataLogin] = useState({ email: '', password: '' });
    const [validator, setValidator] = useState({ invalidEmail: '', invalidPassword: '' });

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
                invalidEmail: 'Password is not vacant'
            })
            return;
        }
        setValidator({ invalidEmail: '', invalidPassword: '' });
        Post('/api/v1/auth/login', dataLogin)
            .then(response => {
                response.json().then(data => {
                    AsyncStorage.setItem(TOKEN_AUTHENTICATION, JSON.stringify(data));
                    login && login();
                });
            }).catch(err => {
                console.log('err', err)
            })
    }

    return <Screen
        hidden={false}
        backgroundColor={'transparent'}
        forceInset={{ bottom: 'never', top: 'never' }}
    >
        <View style={{
            flex: 1,
            justifyContent: 'center',
            alignContent: 'center'
        }}>
            <View style={{ flexDirection: 'column' }}>
                <TextInput
                    value={dataLogin.email}
                    onChangeText={(email) => onChange ? onChange('email', email) : null}
                    style={{
                        backgroundColor: '#fff',
                        minHeight: width * 0.12,
                        borderRadius: 10,
                        width: width * 0.95,
                        marginHorizontal: width * 0.025,
                        paddingLeft: width * 0.04
                    }}
                    placeholder={translate('unauthentic:email') || ""}
                />
            </View>
            {validator.invalidEmail !== '' && <Text
                style={{
                    color: 'red',
                    fontStyle: 'italic',
                    marginLeft: width * 0.025
                }}
            >
                {validator.invalidEmail}
            </Text>}
            <TextInput
                secureTextEntry={true}
                value={dataLogin.password}
                onChangeText={(password) => onChange ? onChange('password', password) : null}
                style={{
                    backgroundColor: '#fff',
                    minHeight: width * 0.12,
                    borderRadius: 10,
                    marginTop: 20,
                    width: width * 0.95,
                    marginHorizontal: width * 0.025,
                    paddingLeft: width * 0.04
                }}
                placeholder={translate('unauthentic:pass') || ""}
            />
            {validator.invalidPassword !== '' && <Text
                style={{
                    color: 'red',
                    fontStyle: 'italic',
                    marginLeft: width * 0.025
                }}
            >
                {validator.invalidPassword}
            </Text>}
            <TouchableOpacity
                style={{
                    backgroundColor: 'green',
                    alignItems: 'center',
                    marginTop: 20,
                    minHeight: width * 0.1,
                    justifyContent: 'center',
                    borderRadius: 5,
                    width: width * 0.95,
                    marginHorizontal: width * 0.025
                }}
                onPress={onClickToLogin}
            >
                <Text
                    style={{ fontSize: FONT_15 }}
                >
                    {translate('unauthentic:login')}
                </Text>
            </TouchableOpacity>
        </View>
    </Screen>

}