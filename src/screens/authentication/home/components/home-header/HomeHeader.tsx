import React from 'react';
import { Image, ImageBackground, Text, View } from 'react-native';
import { translate } from '../../../../../library/utils/i18n/translate';
import { styles } from './styles'


interface HomeHeaderProps {
    reminder: string,
    userName: string
}

export const HomeHeader = (props: HomeHeaderProps) => {
    const { userName, reminder } = props;

    return <ImageBackground
        source={require('../../../../../../assets/images/Vitable_Hero_Images.png')}
        style={styles.vBackground}
        resizeMode='stretch'
    >
        <Image
            source={require('../../../../../../assets/images/Menu.png')}
            style={styles.vImgMenu}
        />
        <Image
            source={require('../../../../../../assets/images/Mypack.png')}
            style={styles.vImgPack}
        />
        <View
            style={styles.vContent}
        >
            <View>
                <Text
                    style={styles.sTextHi}
                >
                    {translate('AUTHENTIC:HOME:HI')}{userName || ''},
                </Text>
            </View>
            <View>
                <Text
                    style={styles.sTextRemider}
                >
                    {reminder || ''}
                </Text>
            </View>
            <Text
                style={styles.sTextTakeQuiz}
            >{translate('AUTHENTIC:HOME:TAKE_THE_QUIZ')}</Text>
        </View>
    </ImageBackground>
}