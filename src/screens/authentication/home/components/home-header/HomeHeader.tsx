import React from 'react';
import { Image, ImageBackground, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { translate } from '../../../../../library/utils/i18n/translate';
import { styles } from './styles'
import { useRoute } from '@react-navigation/native';
import { PACK_SCREEN, QUIZ_SCREEN } from '../../../../../navigation/TypeScreen';

interface HomeHeaderProps {
    reminder: string,
    userName: string,
    navigation: any
}

export const HomeHeader = (props: HomeHeaderProps) => {
    const { userName, reminder, navigation } = props;
    const route = useRoute();

    const onPressGoToMenu = () => {
        navigation && navigation.openDrawer();

        // navigation && navigation.navigate('Menu', {
        //     currentRoute: route.name
        // });
    }

    const onPressGoToQuiz = () => {
        navigation && navigation.navigate(QUIZ_SCREEN);
    }

    const onPressGoToPack = () => {
        navigation && navigation.navigate(PACK_SCREEN);
    }

    return <ImageBackground
        source={require('../../../../../../assets/images/Vitable_Hero_Images.png')}
        style={styles.vBackground}
        resizeMode='stretch'
    >
        <TouchableWithoutFeedback onPress={onPressGoToMenu}
            style={{
                zIndex: 2
            }}
        >
            <Image
                source={require('../../../../../../assets/images/Menu.png')}
                style={styles.vImgMenu}
            />
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback style={{
            zIndex: 2
        }}
            onPress={onPressGoToPack}
        >
            <Image
                source={require('../../../../../../assets/images/Mypack.png')}
                style={styles.vImgPack}
            />
        </TouchableWithoutFeedback>
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
            <TouchableWithoutFeedback
                onPress={onPressGoToQuiz}
                style={{ zIndex: 2 }}
            >
                <Text
                    allowFontScaling={false}
                    style={styles.sTextTakeQuiz}
                >{translate('AUTHENTIC:HOME:TAKE_THE_QUIZ')}</Text>
            </TouchableWithoutFeedback>
        </View>
    </ImageBackground>
}