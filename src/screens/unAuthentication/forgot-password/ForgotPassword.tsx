import React, { useState } from 'react';
import {
    Text, TextInput, View, TouchableOpacity,
    ScrollView, ImageBackground, Dimensions,
    StatusBar,
    Modal,
    TouchableHighlight,
    Image
} from 'react-native';
import { Screen } from '../../../library/components/screen/index';
import { Post } from '../../../library/networking/fetch';
import { validateEmail } from '../../../library/utils/validate';
import { styles } from './style';
import { translate } from '../../../library/utils/i18n/translate';
import { ProcessDialog } from '../../../library/components/processDialog';
const { height: heightScr, width } = Dimensions.get('window');
const statusBarHeight = StatusBar.currentHeight &&
    StatusBar.currentHeight >= 38 &&
    StatusBar.currentHeight || 0;
const height = heightScr + statusBarHeight;

interface ForgotPasswordProps {
    navigation: any
}

export const ForgotPassword = (props: ForgotPasswordProps) => {
    const { navigation } = props;
    const [email, setEmail] = useState('');
    const [validateInputEmail, setValidateInputEmail] = useState('');
    const [isLoadForgot, setLoadForgot] = useState(false);
    const [forgotState, setForgotState] = useState('');
    const [visible, setVisible] = useState(false);

    const onChange = (value: string) => {
        if (value !== '') {
            setValidateInputEmail('');
        }
        setForgotState('');
        setEmail(value);
    }

    const onPressToReset = () => {
        if (isLoadForgot) return;
        setForgotState('');
        if (!email || !validateEmail(email)) {
            setValidateInputEmail(`${translate('UNAUTHENTIC:INVALID_EMAIL')}`);
            return;
        }
        setLoadForgot(true);
        Post('/api/v1/auth/forgot-password', { email })
            .then(response => {
                response.json().then(data => {
                    if (data.message) {
                        setForgotState(data.message);
                        setLoadForgot(false);
                        return;
                    }
                    if (data.data && data.data.success) {
                        setLoadForgot(false);
                        setVisible(true);
                        return;
                    }
                    setLoadForgot(false);
                });
            }).catch(err => {
                setLoadForgot(false);
                setForgotState(err);
                console.log('err', err)
            })
    }

    const onPressToLogin = () => {
        setVisible(false);
        navigation && navigation.goBack()
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
                    <ProcessDialog visible={isLoadForgot} />
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
                            {translate('UNAUTHENTIC:PASSWORD_RETRIEVAL')}
                        </Text>
                        <View style={styles.vContent}>
                            <Text
                                allowFontScaling={false}
                                style={styles.sTextContentHeader}
                            >
                                {translate('UNAUTHENTIC:BEFORE_REQUEST')}
                                {translate('UNAUTHENTIC:NEW_LINE')}
                                {translate('UNAUTHENTIC:AFTER_REQUEST')}
                                {translate('UNAUTHENTIC:SPACE')}
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
                                    value={email}
                                    onChangeText={(email) => onChange ? onChange(email) : null}
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
                    </View>
                    {forgotState !== '' && <Text
                        allowFontScaling={false}
                        style={styles.sTextLoginFailed}
                    >
                        {forgotState}
                    </Text>}
                    <View
                        style={styles.vFormAction}
                    >
                        <TouchableOpacity
                            style={styles.vButton}
                            onPress={onPressToReset}
                        >
                            <Text
                                allowFontScaling={false}
                                style={styles.sTextSingIn}
                            >
                                {translate('UNAUTHENTIC:SEND')}
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{ zIndex: 2 }}
                            onPress={onPressToLogin}
                        >
                            <Text
                                allowFontScaling={false}
                                style={styles.sTextForgot}
                            >
                                {translate('UNAUTHENTIC:BACK_TO_LOGIN')}
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={visible}
                    >
                        <View style={styles.centeredView}>
                            <View
                                style={styles.modalView}>
                                <Text style={styles.modalText}>{translate('UNAUTHENTIC:REQUEST_FORGOT_SUCCESS')}</Text>
                                <TouchableOpacity
                                    style={styles.vButtonModal}
                                    onPress={onPressToLogin}
                                >
                                    <Text
                                        allowFontScaling={false}
                                        style={styles.sTextToLoginModal}
                                    >
                                        {translate('UNAUTHENTIC:BACK_TO_LOGIN')}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>
                </ImageBackground>
            </ScrollView>
        </Screen>
    )
}