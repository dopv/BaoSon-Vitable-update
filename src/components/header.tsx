import React from 'react';
import { Image, ImageBackground, Text, TouchableOpacity, TouchableWithoutFeedback, View, StyleSheet, Dimensions } from 'react-native';
import { translate } from '../library/utils/i18n/translate';
import { useRoute } from '@react-navigation/native';
import { FONT_14, FONT_18 } from '../themes/fontSize';
import { size } from '../themes/size';
import { StatusBarHeight } from '../config/heightStatusbar';
import { QUIZ_SCREEN } from '../navigation/TypeScreen';
const { width, height } = Dimensions.get('window');

export const CustomHeader = (props: any) => {
    const {
        navigation,
        imgBackground,
        logoRight,
        onPressRight,
        userName,
        reminder,
        isButtonRight,
        logoLeft,
        onPressLeft,
        title,
        titleButton,
        onPressTitleButton
    } = props;

    return (
        <ImageBackground
            source={imgBackground}
            style={styles.vBackground}
            resizeMode='stretch'
        >
            <View style={styles.vHeader}>
                <TouchableOpacity onPress={onPressLeft}
                    style={styles.btnMenu}
                >
                    <Image
                        resizeMode='contain'
                        source={logoLeft}
                        style={styles.vImgMenu}
                    />
                </TouchableOpacity>
                {title &&
                    <Text style={styles.tTitle}>
                        {title}
                    </Text>
                }
                {isButtonRight &&
                    <TouchableOpacity style={styles.btnRight}
                        onPress={onPressRight}
                    >
                        <Image
                            resizeMode='contain'
                            source={logoRight}
                            style={styles.imgRight}
                        />
                    </TouchableOpacity>
                }
            </View>
            {userName &&

                <View style={styles.vContent}>
                    <Text
                        allowFontScaling={false}
                        style={styles.sTextHi}>
                        {translate('AUTHENTIC:HOME:HI')}{userName || ''},
                </Text>


                    <Text
                        allowFontScaling={false}
                        style={styles.sTextRemider}
                    >
                        {reminder || ''}
                    </Text>
                    {titleButton &&
                        <TouchableOpacity
                            onPress={onPressTitleButton}
                            style={styles.btnTakeQuiz}
                        >
                            <Text
                                allowFontScaling={false}
                                style={styles.sTextTakeQuiz}
                            >{titleButton}</Text>
                        </TouchableOpacity>
                    }
                </View>
            }
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    vBackground: {
        width: width,
        justifyContent: 'center',
        paddingTop: StatusBarHeight,
    },
    vHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    tTitle: {
        marginVertical: size[30],
        fontSize: FONT_18,
        fontFamily: 'SolaireDT'
    },
    btnMenu: {
        position: 'absolute',
        top: size[20],
        left: 0
    },
    vImgMenu: {
        width: size[30],
        height: size[30],
        marginHorizontal: width * 0.05,
        marginVertical: size[7]
    },
    btnRight: {
        backgroundColor: 'transparent',
        borderTopLeftRadius: size[50],
        borderBottomLeftRadius: size[50],
        top: size[20],
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
        marginTop: size[80],
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
        lineHeight: size[22],
        letterSpacing: FONT_14 * 0.015,
        marginBottom: size[24]
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
    btnTakeQuiz: {
        paddingBottom: size[16]
    }

})