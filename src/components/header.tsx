import React from 'react';
import { Image, ImageBackground, Text, TouchableOpacity, TouchableWithoutFeedback, View, StyleSheet, Dimensions } from 'react-native';
import { translate } from '../library/utils/i18n/translate';
import { useRoute } from '@react-navigation/native';
import { FONT_14 } from '../themes/fontSize';
import { size } from '../themes/size';
import { StatusBarHeight } from '../config/heightStatusbar';
const { width, height } = Dimensions.get('window');

export const CustomHeader = (props: any) => {
    const { 
        navigation,
        imgBackground,
        logoRight,
        onPressRight,
        userName,
        reminder
    } = props;

    const onPressGoToMenu = () => {
        navigation && navigation.openDrawer();
    }

    return (
        <ImageBackground
            source={imgBackground}
            style={styles.vBackground}
            resizeMode='stretch'
        >
            <TouchableOpacity onPress={onPressGoToMenu}
                style={styles.btnMenu}
            >
                <Image
                    resizeMode='contain'
                    source={require('../../assets/images/Menu.png')}
                    style={styles.vImgMenu}
                />
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnRight}
                onPress={onPressRight}
            >
                <Image
                    resizeMode='contain'
                    source={logoRight}
                    style={styles.imgRight}
                />
            </TouchableOpacity>
            <View
                style={styles.vContent}
            >
                <View>
                    <Text
                        allowFontScaling={false}
                        style={styles.sTextHi}
                    >
                        {translate('AUTHENTIC:HOME:HI')}{userName || ''},
                </Text>
                </View>
                <View>
                    <Text
                        allowFontScaling={false}
                        style={styles.sTextRemider}
                    >
                        {reminder || ''}
                    </Text>
                </View>
                {/* <TouchableWithoutFeedback
                    onPress={onPressGoToQuiz}
                    style={{ zIndex: 2 }}
                >
                    <Text
                        allowFontScaling={false}
                        style={styles.sTextTakeQuiz}
                    >{translate('AUTHENTIC:HOME:TAKE_THE_QUIZ')}</Text>
                </TouchableWithoutFeedback> */}
            </View>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    vBackground: {
        width: width,
        justifyContent: 'center',
        height: 200,
        paddingTop: StatusBarHeight

    },
    btnMenu: {
        position: 'absolute',
        top: size[30],
        left: 0
    },
    vImgMenu: {
        width: size[30],
        height: size[30],
        margin: width * 0.05,
    },
    btnRight: {
        backgroundColor: 'transparent',
        borderTopLeftRadius: size[50],
        borderBottomLeftRadius: size[50],
        top: size[40],
        position: 'absolute',
        right: 0,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 5,
        elevation: 5
    },
    imgRight: {
        width: width * 0.318,
        height: width * 0.125,
    },
    vImgPack: {
        width: width * 0.33125,
    },
    vContent: {
        width: width * 0.9,
        alignSelf: 'center'
    },
    sTextHi: {
        textAlign: 'center',
        letterSpacing: FONT_14 * 0.015,
        fontSize: FONT_14,
        fontWeight: '400',
        lineHeight: FONT_14 * 1.3,
    },
    sTextRemider: {
        textAlign: 'center',
        fontSize: FONT_14,
        lineHeight: FONT_14 * 1.3,
        letterSpacing: FONT_14 * 0.015,
    },
    sTextTakeQuiz: {
        textAlign: 'center',
        fontSize: FONT_14,
        lineHeight: FONT_14 * 1.3,
        alignSelf: 'center',
        color: '#F5785A',
        letterSpacing: FONT_14 * 0.01857,
        textDecorationColor: '#F5785A',
        textDecorationStyle: 'solid',
        textDecorationLine: 'underline',
    },

})