import React from 'react';
import { Image, Text, View, TouchableWithoutFeedback } from 'react-native';
import { Screen } from '../../../library/components/screen/index';
import { styles } from './style';
import { ItemMenu } from './components/MenuItem';
import { translate } from '../../../library/utils/i18n/translate';

interface MenuProps {
    navigation: any,
    route: any
}

export const Menu = (props: MenuProps) => {
    const { navigation, route } = props;
    const currentRoute = route.params && route.params.currentRoute || '';

    const goBack = () => {
        navigation && navigation.goBack();
    }

    return <Screen
        isScroll={false}
        hidden={false}
        backgroundColor={'transparent'}
        forceInset={{ bottom: 'never', top: 'never' }}
        draw={true}
    >
        <View style={styles.vMenu}>
            <TouchableWithoutFeedback onPress={goBack}>
                <View
                    style={styles.vClose}
                >
                    <Image
                        source={require('../../../../assets/images/Close.png')}
                        style={styles.sImgClose}
                    />
                </View>
            </TouchableWithoutFeedback>
            <Image
                source={require('../../../../assets/images/Logo-black.png')}
                style={styles.sImgLogo}
            />
            <View
                style={styles.vContentMenu}
            >
                <View
                    style={styles.vListMenuAbove}
                >
                    <ItemMenu
                        name={`${translate('AUTHENTIC:MENU:TRACKING_MY_VITAMINS')}`}
                        isActive={true}
                        route='HomePage'
                        navigation={navigation}
                        currentRoute={currentRoute}
                        />
                    <ItemMenu
                        name={`${translate('AUTHENTIC:MENU:MY_PACK')}`}
                        isActive={false}
                        route='MyPack'
                        navigation={navigation}
                        currentRoute={currentRoute}
                        />
                    <ItemMenu
                        name={`${translate('AUTHENTIC:MENU:BROWSE_ON_SHOP')}`}
                        isActive={false}
                        route='BrowseOnShop'
                        navigation={navigation}
                        currentRoute={currentRoute}
                        />
                    <ItemMenu
                        name={`${translate('AUTHENTIC:MENU:MY_PROFILE')}`}
                        isActive={false}
                        route='Profile'
                        navigation={navigation}
                        currentRoute={currentRoute}
                        />
                </View>
                <View
                    style={styles.vLineMenu}
                    />
                <View
                    style={styles.vListMenuUnder}
                >
                    <ItemMenu
                        name={`${translate('AUTHENTIC:MENU:SUPPORT_HELP')}`}
                        isActive={false}
                        route='Help'
                        navigation={navigation}
                        currentRoute={currentRoute}
                        />
                    <ItemMenu
                        name={`${translate('AUTHENTIC:MENU:ACCOUNT_DETAILS')}`}
                        isActive={false}
                        route='AccountDetail'
                        navigation={navigation}
                        currentRoute={currentRoute}
                    />
                </View>
            </View>
            <View
                style={styles.vFotter}
            >
                <View
                    style={styles.vContentFooter}
                >
                    <Text
                            allowFontScaling={false}
                        style={styles.sTextAjust}
                    >
                        {translate('AUTHENTIC:MENU:WANT_TO_AJUST_YOUR_PLAN')}
                    </Text>
                    <Text
                            allowFontScaling={false}
                        style={styles.sTextReTakeQuiz}
                    >
                        {translate('AUTHENTIC:MENU:RETAKE_THE_QUIZ')}
                    </Text>
                </View>
            </View>
        </View>
    </Screen>

}