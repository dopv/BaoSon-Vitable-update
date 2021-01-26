import React from 'react';
import { Image, ImageBackground, Text, TouchableWithoutFeedback, View } from 'react-native';
import { translate } from '../../../../../library/utils/i18n/translate';
import { styles } from './styles'
import { useRoute } from '@react-navigation/native';

interface HomeHeaderProps {
    reminder: string,
    userName: string,
    navigation: any
}

export const HomeHeader = (props: HomeHeaderProps) => {
    const { userName, reminder, navigation } = props;
    const route = useRoute();

    const onPressGoToMenu = () => {
        navigation && navigation.navigate('Menu', {
            currentRoute: route.name
        });
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
        <Image
            source={require('../../../../../../assets/images/Mypack.png')}
            style={styles.vImgPack}
        />
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
            <Text
                allowFontScaling={false}
                style={styles.sTextTakeQuiz}
            >{translate('AUTHENTIC:HOME:TAKE_THE_QUIZ')}</Text>
        </View>
    </ImageBackground>
}