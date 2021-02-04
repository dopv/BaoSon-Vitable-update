import React, { useState, useRef, Children, useEffect } from 'react';
import { View, Text, TouchableWithoutFeedback, Image, Dimensions } from 'react-native';
import { Screen } from '../../../library/components/screen';
import { styles } from './styles';
import { CustomHeader } from "../../../components/header";
import { SvgTracker } from '../../../themes/svg';
import { size } from '../../../themes/size';
import { HOME_SCREEN } from '../../../navigation/TypeScreen';
import { CustomPage } from '../../../components/page';
import { CustomListProduct } from '../../../components/listProduct/listProduct';
import { Get } from '../../../library/networking/fetch';
import DropDownHolder from '../../../library/utils/dropDownHolder';
import { translate } from '../../../library/utils/i18n/translate';
import { ScrollView } from 'react-native-gesture-handler';

const { width, height } = Dimensions.get('window');

interface PackProps {
    navigation: any,
    route: any
}

export const PackScreen = (props: PackProps) => {
    const { navigation, route } = props;
    const [tabIndex, setTabIndex] = useState(0);
    const [estNextPack, setEstNextPack] = useState();
    const [subscription, setCheckSubscription] = useState(null);
    const onBackTracker = () => {
        navigation.navigate(HOME_SCREEN)
    }
    const onPressGoToMenu = () => {
        navigation && navigation.openDrawer();
    }

    const customer = route && route.params && route.params.stateAuth
        && route.params.stateAuth.userInfo && route.params.stateAuth.userInfo.customer
        && route.params.stateAuth.userInfo.customer.data || {};
    const checkSubscription = () => {
        Get(`/api/v1/subscriptions/check`)
            .then(response => {
                response.json().then(data => {
                    if (data.data && data.data.subscription && data.data.subscription.data &&
                        data.data.subscription.data.next_invoice) {
                        setEstNextPack(data.data.subscription.data.next_invoice);
                    }
                    let subscription = data && data.data && data.data.subscription
                    setCheckSubscription(subscription)
                });
            }).catch(err => {
                DropDownHolder.showError("", translate('MESS:error') || "")
                console.log('err', err)
            })
    }

    const onPressResume = () => {

    }

    useEffect(() => {
        checkSubscription()
    }, []);

    return (
        <Screen
            isScroll={false}
            hidden={false}
            backgroundColor={'transparent'}
            forceInset={{ bottom: 'never', top: 'never' }}
        >
            {subscription == "paused" || subscription == "canceled" ?
                <View style={styles.fullScreen}>
                    <CustomHeader
                        isButtonRight={true}
                        isBtnText={true}
                        navigation={navigation}
                        onPressRight={onBackTracker}
                        titleButton={'Resume my subscription'}
                        onPressTitleButton={onPressResume}
                        userName={customer && customer.name_on_pack}
                        reminder={`It seems that you are on a pause. Ready to come back?`}
                        imgBackground={require('../../../../assets/images/bg_pack_pause.png')}
                        logoRight={require('../../../../assets/images/logo_tracker.png')}
                        logoLeft={require('../../../../assets/images/Menu.png')}
                        onPressLeft={onPressGoToMenu}
                    />
                    <CustomPage
                        navigation={navigation}
                        tabIndex={tabIndex}
                        setTabIndex={setTabIndex}
                        viewPageRight={
                            <CustomListProduct
                                type={'SUBSCRIPTION'}
                                navigation={navigation}
                                titleNotPage={'Your last pack'}
                            />
                        }
                    />
                </View>
                :
                <View style={styles.fullScreen}>
                    <CustomHeader
                        isButtonRight={true}
                        navigation={navigation}
                        onPressRight={onBackTracker}
                        userName={customer && customer.name_on_pack}
                        reminder={`Your January pack will be delivered to you soon. You can still edit the delivery date.`}
                        imgBackground={require('../../../../assets/images/background_tracker.png')}
                        logoRight={require('../../../../assets/images/logo_tracker.png')}
                        logoLeft={require('../../../../assets/images/Menu.png')}
                        onPressLeft={onPressGoToMenu}
                    />
                    <CustomPage
                        navigation={navigation}
                        tabIndex={tabIndex}
                        setTabIndex={setTabIndex}
                        titleLeft={'In transit pack'}
                        titleRight={'Next pack'}
                        viewPageLeft={<CustomListProduct type={'TRANSIT'} navigation={navigation} route={route} />}
                        viewPageRight={<CustomListProduct type={'SUBSCRIPTION'} navigation={navigation} estNextPack={estNextPack} route={route} />
                        }
                    />
                </View>
            }

        </Screen>
    );
}
