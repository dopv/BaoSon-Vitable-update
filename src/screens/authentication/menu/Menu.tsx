import React from 'react';
import { Image, Text, View, TouchableWithoutFeedback } from 'react-native';
import { Screen } from '../../../library/components/screen/index';
import { styles } from './style';
import { ItemMenu } from './components/MenuItem';
import { translate } from '../../../library/utils/i18n/translate';
import { PACK_SCREEN, PROFILE_SCREEN, TRACKING_SCREEN, BROWSER_SHOP_SCREEN, HOME_SCREEN, SUPPORT_SCREEN, ACCOUNT_DETAIL_SCREEN, QUIZ_SCREEN,
NOTIFICATIONS_SCREEN } from '../../../navigation/TypeScreen';

export const Menu = (props: any) => {
    const { navigation, route } = props;
    // const currentRoute = route.params && route.params.currentRoute || '';

    const goBack = () => {
        navigation && navigation.goBack();
    }

    const onPressGoToQuiz = () => {
        navigation && navigation.navigate(QUIZ_SCREEN);
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
                        route={HOME_SCREEN}
                        navigation={navigation}
                    />
                    <ItemMenu
                        name={`${translate('AUTHENTIC:MENU:MY_PACK')}`}
                        isActive={false}
                        route={PACK_SCREEN}
                        navigation={navigation}
                    />
                    <ItemMenu
                        name={`${translate('AUTHENTIC:MENU:BROWSE_ON_SHOP')}`}
                        isActive={false}
                        route={BROWSER_SHOP_SCREEN}
                        navigation={navigation}
                    />
                    <ItemMenu
                        name={`${translate('AUTHENTIC:MENU:MY_PROFILE')}`}
                        isActive={false}
                        route={PROFILE_SCREEN}
                        navigation={navigation}
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
                        route={SUPPORT_SCREEN}
                        navigation={navigation}
                    />
                    <ItemMenu
                        name={`${translate('AUTHENTIC:MENU:ACCOUNT_DETAILS')}`}
                        isActive={false}
                        route={ACCOUNT_DETAIL_SCREEN}
                        navigation={navigation}
                    />
                    <ItemMenu
                        name={`${translate('AUTHENTIC:MENU:NOTIFICATIONS')}`}
                        isActive={false}
                        route={NOTIFICATIONS_SCREEN}
                        navigation={navigation}
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
                    <TouchableWithoutFeedback
                        style={{zIndex: 2}}
                        onPress={onPressGoToQuiz}
                    >
                        <Text
                            allowFontScaling={false}
                            style={styles.sTextReTakeQuiz}
                        >
                            {translate('AUTHENTIC:MENU:RETAKE_THE_QUIZ')}
                        </Text>
                    </TouchableWithoutFeedback>
                </View>
            </View>
        </View>
    </Screen>

}
