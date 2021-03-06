import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { Screen } from '../../../library/components/screen';
import { styles } from './styles';
import { CustomHeader } from "../../../components/header";
import { HOME_SCREEN } from '../../../navigation/TypeScreen';
import { CustomPage } from '../../../components/page';
import { CustomListProduct } from '../../../components/listProduct/listProduct';
import { Get, Put } from '../../../library/networking/fetch';
import DropDownHolder from '../../../library/utils/dropDownHolder';
import { translate } from '../../../library/utils/i18n/translate';
import {
    SUBSCRIPTION_STATUS_ACTIVE,
    ORDER_STATUS_DELIVERED,
    ORDER_STATUS_CANCELED,
    ORDER_STATUS_IN_DELIVERY,
    ORDER_STATUS_PAID,
    ORDER_STATUS_PROCESSING,
    ORDER_STATUS_READY_FOR_DELIVERY,
    SUBSCRIPTION,
    TRANSIT
} from '../../../config';
import { ProcessDialog } from '../../../library/components/processDialog';
import moment from 'moment';
import { useContainer } from '../../../store/store';

interface PackProps {
    navigation: any
}

export const PackScreen = (props: PackProps) => {
    const { navigation } = props;
    const [tabIndex, setTabIndex] = useState(0);
    const [isClickTabAble, setClickTabAble] = useState(false);
    const [estNextPack, setEstNextPack] = useState();
    const [subscriptionStatus, setCheckSubscriptionStatus] = useState(SUBSCRIPTION_STATUS_ACTIVE);
    const [subscription_id, setSubscription_id] = useState(0);
    const [coupons, setCoupons] = useState("");
    const [nextInvoice, setNextInvoice] = useState();
    const [loading, setLoading] = useState(false);
    const [refreshing, setRefresh] = useState(false);
    const [timeEst, setTimeEst] = useState('');
    const [listIdTransit, setListIdTransit] = useState(null);
    const [listIdSub, setListIdSub] = useState(null);
    const [orderStatus, setOrderStatus] = useState(0);
    const [orderNumber, setOrderNumber] = useState("");
    const [userId, setUserId] = useState("");
    const userInfo = useContainer(container => container.userInfo);
    const getTransAction = useContainer(container => container.setDataTransAction);
    const getNextPackAction = useContainer(container => container.setDataNextPackAction);

    const onClickTabChange = () => {
        setClickTabAble(true);
        setTimeout(() => {
            setClickTabAble(false);
        }, 300);
    }

    const onBackTracker = () => {
        navigation.navigate(HOME_SCREEN)
    }
    const onPressGoToMenu = () => {
        navigation && navigation.openDrawer();
    }

    const customer = userInfo && userInfo.customer.data || {};

    const checkSubscription = () => {
        Get(`/api/v1/subscriptions/check`)
            .then(response => {
                response.json().then(data => {
                    const result = data && data.data && data.data.subscription && data.data.subscription.data
                    if (result && result.next_invoice) {
                        setNextInvoice(new Date(result.next_invoice))
                        setSubscription_id(result.id)
                        // console.log('result', result)
                        setUserId(result.user_id)
                        setCoupons(result.coupons)
                        // console.log('result.next_invoice', result.next_invoice)
                        const date = (new Date(result.next_invoice)).setDate((new Date(result.next_invoice).getDate() + 7))
                        // console.log('date', date)
                        setEstNextPack(date)
                    }
                    let subscriptionStatus = result && result.status
                    setCheckSubscriptionStatus(subscriptionStatus)
                    setLoading(false)
                });
            }).catch(err => {
                DropDownHolder.showError("", translate('MESS:error') || "")
                console.log('err', err)
                setLoading(false)
            })
    }

    const onPressResume = async () => {
        Put(`/api/v1/users/${userId}/subscriptions/${subscription_id}`)
            .then(checkSubscription)
    }

    const getTransition = () => {
        Get('/api/v1/users/me/orders/latest')
            .then(response => {
                response.json().then(data => {
                    const result = data && data.data
                    setOrderStatus(result && result.status)
                    getTransAction(result)
                    setOrderNumber(result.order_id)
                    if (result && result.estimated_delivery) {
                        setTimeEst(result.estimated_delivery)
                    }
                    let listProducts = result.products && result.products.data
                    if (listProducts) {
                        let listId = listProducts.map((item: any) => item.id);
                        setListIdTransit(listId.toString())
                    }
                });
            }).catch(err => {
                DropDownHolder.showError("", translate('MESS:error') || "")
                console.log('err', err)
            })
    }

    const getSubscription = () => {
        Get('/api/v1/users/me/subscription-items')
            .then(response => {
                response.json().then(data => {
                    if (data && data.data) {
                        getNextPackAction(data.data)
                        let listId = data.data.map((item: any) => item.product_id);
                        setListIdSub(listId.toString())
                    }
                });
            }).catch(err => {
                DropDownHolder.showError("", translate('MESS:error') || "")
                console.log('err', err)
            })
    }

    useEffect(() => {
        checkSubscription()
        getTransition()
        getSubscription()
    }, []);

    const nextInvoiceDisplay = nextInvoice ? moment(nextInvoice).format('Do MMMM') : ''
    let reminder = `You can edit your next pack until ${nextInvoiceDisplay}`
    const inTransit = (
        orderStatus == ORDER_STATUS_IN_DELIVERY
        || orderStatus == ORDER_STATUS_PAID
        || orderStatus == ORDER_STATUS_PROCESSING
        || orderStatus == ORDER_STATUS_READY_FOR_DELIVERY
    )
    if (inTransit) {
        reminder = translate('AUTHENTIC:PACK:REMINDER_IN_TRANSIT') || ""
    }
    return (
        <Screen
            isScroll={false}
            hidden={false}
            backgroundColor={'transparent'}
            forceInset={{ bottom: 'never', top: 'never' }}
        >
            <ProcessDialog visible={loading} />

            {subscriptionStatus === SUBSCRIPTION_STATUS_ACTIVE ?
                <View style={styles.fullScreen}>
                    <CustomHeader
                        isButtonRight={true}
                        navigation={navigation}
                        onPressRight={onBackTracker}
                        userName={customer && customer.name_on_pack}
                        reminder={reminder}
                        imgBackground={require('../../../../assets/images/background_tracker.png')}
                        logoRight={require('../../../../assets/images/logo_tracker.png')}
                        logoLeft={require('../../../../assets/images/Menu.png')}
                        onPressLeft={onPressGoToMenu}
                    />
                    <CustomPage
                        inTransit={inTransit}
                        navigation={navigation}
                        tabIndex={tabIndex}
                        setTabIndex={setTabIndex}
                        onClickTabChange={onClickTabChange}
                        isClickTabAble={isClickTabAble}
                        titleLeft={translate('AUTHENTIC:PACK:IN_TRANSIT')}
                        titleRight={translate('AUTHENTIC:PACK:NEXT_PACK')}
                        viewPageLeft={inTransit ?
                            <CustomListProduct
                                loading={loading}
                                setRefresh={setRefresh}
                                listIdTransit={listIdTransit}
                                setLoading={setLoading}
                                getTransition={getTransition}
                                getSubscription={getSubscription}
                                subscription_id={subscription_id}
                                coupons={coupons}
                                type={TRANSIT}
                                timeEst={timeEst}
                                nextInvoice={nextInvoice}
                                navigation={navigation}
                                refreshing={refreshing}
                                orderNumber={orderNumber}
                               />
                            : null
                        }
                        viewPageRight={
                            <CustomListProduct
                                loading={loading}
                                setRefresh={setRefresh}
                                listIdSub={listIdSub}
                                setLoading={setLoading}
                                getTransition={getTransition}
                                getSubscription={getSubscription}
                                subscription_id={subscription_id}
                                refreshing={refreshing}
                                coupons={coupons}
                                type={SUBSCRIPTION}
                                navigation={navigation}
                                estNextPack={estNextPack}
                                nextInvoice={nextInvoice}
                                setEstNextPack={setEstNextPack}
                                checkSubscription={checkSubscription}
                            />
                        }
                    />
                </View>
                : subscriptionStatus !== SUBSCRIPTION_STATUS_ACTIVE &&
                <View style={styles.fullScreen}>
                    <CustomHeader
                        isButtonRight={true}
                        isBtnText={true}
                        navigation={navigation}
                        onPressRight={onBackTracker}
                        titleButton={translate('AUTHENTIC:PACK:RESUME')}
                        onPressTitleButton={onPressResume}
                        userName={customer && customer.name_on_pack}
                        reminder={translate('AUTHENTIC:PACK:REMINDER_PAUSE')}
                        imgBackground={require('../../../../assets/images/bg_pack_pause.png')}
                        logoRight={require('../../../../assets/images/logo_tracker.png')}
                        logoLeft={require('../../../../assets/images/Menu.png')}
                        onPressLeft={onPressGoToMenu}
                    />
                    <CustomPage
                        navigation={navigation}
                        tabIndex={tabIndex}
                        setTabIndex={setTabIndex}
                        onClickTabChange={onClickTabChange}
                        isClickTabAble={isClickTabAble}
                        viewPageRight={
                            <CustomListProduct
                                isResume={true}
                                setRefresh={setRefresh}
                                loading={loading}
                                setLoading={setLoading}
                                getTransition={getTransition}
                                getSubscription={getSubscription}
                                subscription_id={subscription_id}
                                coupons={coupons}
                                refreshing={refreshing}
                                listIdSub={listIdSub}
                                type={SUBSCRIPTION}
                                navigation={navigation}
                                estNextPack={estNextPack}
                                setEstNextPack={setEstNextPack}
                                titleNotPage={translate('AUTHENTIC:PACK:LAST_PACK')}
                            />
                        }
                    />
                </View>
            }

        </Screen>
    );
}
