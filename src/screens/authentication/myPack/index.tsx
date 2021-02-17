import React, { useState, useEffect } from 'react';
import { View, Text, Dimensions, ScrollView, TouchableOpacity, TextInput, Keyboard } from 'react-native';
import { Screen } from '../../../library/components/screen';
import { styles } from './styles';
import { CustomHeader } from "../../../components/header";
import { SvgDownBig } from '../../../themes/svg';
import { size } from '../../../themes/size';
import { Get, Put } from '../../../library/networking/fetch';
import DropDownHolder from '../../../library/utils/dropDownHolder';
import { translate } from '../../../library/utils/i18n/translate';
import { CustomListManagePack } from './component/listManagePack';
import { ProcessDialog } from '../../../library/components/processDialog';
import { format } from "date-fns";
import {
    MenuProvider,
} from 'react-native-popup-menu';
import { useContainer } from '../../../store/store';


interface MyPackProps {
    navigation: any,
    route: any
}

export const MyPackScreen = (props: MyPackProps) => {
    const { navigation, route } = props;
    var dataList: any[] = [];
    var credit_available = 0;
    var subscription_id = 0;
    var type = '';
    var coupons = '';
    var orderNumber = ''
    var nextInvoice = null
    var getTransition = null;
    var getSubscription = null;
    var isResume = false;

    const userInfo = useContainer(container => container.userInfo);
    if (route && route.params) {
        dataList = route.params.dataList
        credit_available = userInfo && userInfo.customer && userInfo.customer.data && userInfo.customer.data.credit_available || 0
        subscription_id = route.params.subscription_id;
        coupons = route.params.coupons;
        type = route.params.type
        orderNumber = route.params.orderNumber
        nextInvoice = route.params.nextInvoice
        getTransition = route.params.getTransition
        getSubscription = route.params.getSubscription
        isResume = route.params.isResume
    }
    const [country, setCountry] = useState('AU');
    const [countries, setCountries] = useState<any>(null);
    const [setting, setSetting] = useState<any>(null);
    const [listPrice, setListPrice] = useState([
        {
            id: 0,
            price: 0
        }
    ])
    const [total, setTotal] = useState(0);
    const [promoCode, setPromocode] = useState("");
    const [totalRemain, setTotalRemain] = useState(total);
    const [credit, setCredit] = useState(credit_available);
    const [discount, setDiscount] = useState("");
    const [percent, setPercent] = useState("");
    const [loading, setLoading] = useState(false);
    const dataTrans = useContainer(container => container.dataTrans);

    const changePromoCode = (value: string) => {
        setPromocode(value);
    };

    const goBack = () => {
        navigation && navigation.goBack();
    };

    const getCountry = () => {
        Get('/api/v1/country')
            .then(response => {
                response.json().then(data => {
                    const country = data.country || "AU"
                    setCountry(country)
                    getCountries(country)
                });
            }).catch(err => {
                DropDownHolder.showError("", translate('MESS:error') || "")
                console.log('err', err)
            })
    };

    const getCountries = (country: string) => {
        Get('/api/v1/countries')
            .then(response => {
                response.json().then(data => {
                    const dataCountries = data.filter((item: any) => item.country === country)
                    setCountries(dataCountries)
                });
            }).catch(err => {
                DropDownHolder.showError("", translate('MESS:error') || "")
                console.log('err', err)
            })
    }

    const getSetting = () => {
        Get('/api/v1/setting')
            .then(response => {
                response.json().then(data => {
                    setSetting(data)
                });
            }).catch(err => {
                DropDownHolder.showError("", translate('MESS:error') || "")
                console.log('err', err)
            })
    };

    const checkPromoCode = () => {
        Get(`/api/v1/subscriptions/${subscription_id}/check-promo-code`)
            .then(response => {
                response.json().then(data => {
                    if (data.code) {
                        setPromocode(data.code)
                        getInfoPromoCode(data.code)
                    }
                    setLoading(false)
                });
            }).catch(err => {
                DropDownHolder.showError("", translate('MESS:error') || "")
                console.log('err', err)
                setLoading(false)
            })
    };

    const getInfoPromoCode = (code: string) => {
        Get(`/api/v1/promocodes/show/promocode?promocode=${code}`)
            .then(response => {
                response.json().then(data => {
                    if (data && data.data) {
                        if (data.data.percent !== "") {
                            setPercent(data.data.percent)

                        } else if (data.data.discount_amount !== "") {
                            setDiscount(data.data.discount_amount)
                        }
                    }
                });
            }).catch(err => {
                DropDownHolder.showError("", translate('MESS:error') || "")
                console.log('err', err)
            })
    };

    const applyPromoCode = () => {
        Keyboard.dismiss();
        if (promoCode) {
            const body = { "promocode": promoCode }
            Put(`/api/v1/subscriptions/${subscription_id}/apply-promo-code`, body)
                .then(response => {
                    response.json().then(data => {
                        if (data.message) {
                            DropDownHolder.showError("", data.message)
                        } else {
                            getInfoPromoCode(promoCode)
                        }
                    });
                }).catch(err => {
                    DropDownHolder.showError("", translate('MESS:error') || "")
                    console.log('err', err)
                })
        }
    }

    const removePromoCode = () => {
        Keyboard.dismiss();
        setPromocode("");
        setPercent("");
        setDiscount("")

    }
    const getListPrice = () => {
        const dataPrice = [{
            id: 0,
            price: 0
        }]
        dataList.map(item => {
            dataPrice.push({
                id: item.id,
                price: item.price
            })
        })
        setListPrice(dataPrice);
    };


    useEffect(() => {
        setLoading(true)
        if (coupons !== "") {
            setPromocode(coupons)
        }
        getCountry()
        getSetting()
        getListPrice()
        checkPromoCode()
    }, [type])

    useEffect(() => {
        var sum = listPrice.map(it => it.price).reduce(function (a, b) {
            return a + b;
        }, 0);
        const minPrice = setting && setting.data && setting.data.minimum_order_price || 0
        var totalRe = sum
        if (countries && countries[0] && sum < countries[0].freeShipping && countries[0].shippingCost) {
            totalRe = (sum + countries[0].shippingCost) || sum

            if (credit_available > 0) {
                if (credit_available > totalRe) {

                    if (percent !== "") {
                        totalRe = totalRe * (parseInt(percent) / 100)
                    }
                    if (discount !== "") {
                        if (totalRe > parseInt(discount)) {
                            totalRe = totalRe - (parseInt(discount))
                        } else if (totalRe < parseInt(discount)) {
                            totalRe = 5,
                                setCredit(0)
                        }
                    }
                    setCredit(totalRe);
                    var oldTotal = totalRe;
                    totalRe = 0
                    if (minPrice) {
                        var credit = oldTotal - minPrice
                        // credit = credit_available - oldTotal - credit
                        setCredit(credit)
                        totalRe = minPrice
                    }

                } else {
                    totalRe = totalRe - credit_available
                    var oldTotal = totalRe;

                    setCredit(credit_available);
                    if (minPrice && totalRe < minPrice) {
                        totalRe = minPrice
                        setCredit(credit_available - minPrice)
                    }
                }
            } else {
                totalRe = totalRe - credit_available
                setCredit(credit_available);
                if (minPrice && totalRe < minPrice) {
                    var credit = minPrice - totalRe
                    credit = credit_available - totalRe - credit
                    setCredit(credit)
                    totalRe = minPrice
                }
            }
            setTotalRemain(totalRe);
        } else {
            if (credit_available > 0) {
                if (minPrice && totalRe < minPrice) {
                    totalRe = minPrice
                    setCredit(credit_available - minPrice)
                } else {
                    totalRe = totalRe - credit_available
                    setCredit(credit_available)
                    if (totalRe < minPrice) {
                        setCredit(credit_available - minPrice + totalRe)
                        totalRe = minPrice;
                    }
                }
                if (percent !== "") {
                    totalRe = totalRe * (parseInt(percent) / 100)
                }
                if (discount !== "") {
                    if (totalRe > parseInt(discount)) {
                        totalRe = totalRe - (parseInt(discount))
                    } else if (totalRe < parseInt(discount)) {
                        totalRe = minPrice
                    }
                }
            } else {
                if (percent !== "") {
                    totalRe = totalRe * (parseInt(percent) / 100)
                }
                if (discount !== "") {
                    if (totalRe > parseInt(discount)) {
                        totalRe = totalRe - (parseInt(discount))
                    } else if (totalRe < parseInt(discount)) {
                        totalRe = 0
                    }
                }
            }
            setTotalRemain(totalRe);
        }
        setTotal(sum)
    }, [listPrice, countries, percent, discount, type]);
    // console.log('orderNumber', orderNumber)
    // console.log('nextInvoice', nextInvoice)
    return (
        <MenuProvider>
            <Screen
                isScroll={false}
                hidden={false}
                backgroundColor={'transparent'}
                forceInset={{ bottom: 'never', top: 'never' }}
            >
                <ProcessDialog visible={loading} />

                <View style={styles.fullScreen}>
                    <CustomHeader
                        navigation={navigation}
                        imgBackground={require('../../../../assets/images/bg_manage_pack.png')}
                        logoLeft={require('../../../../assets/images/icons/Back.png')}
                        onPressLeft={goBack}
                        title={type === 'TRANSIT' ? 'View my pack' : 'Manage my pack'}
                    />
                    <ScrollView
                        keyboardShouldPersistTaps={'always'}
                        contentContainerStyle={{ paddingBottom: size[26] }}>
                        <View style={styles.vContent}>
                            {type === "TRANSIT" && dataTrans.tracking_url &&
                                <View style={styles.vNoteTransit}>
                                    <Text style={styles.tNoteTran}>Good new !</Text>
                                    <Text style={styles.tNoteTran}>This pack is currently in transit</Text>
                                    <Text style={styles.tUrl}>{dataTrans.tracking_url}</Text>
                                </View>
                            }
                            {isResume &&
                                <View style={styles.vNoteResume}>
                                    <Text style={styles.tNoteTran}>Your subscription is currently paused, it can still be edited.</Text>
                                    <Text style={styles.tUrl}>Resume my subscription</Text>
                                </View>
                            }
                            <Text style={styles.tTitle}>{type === 'TRANSIT' ? 'Order number :' : 'You can edit your order until :'}</Text>
                            <Text style={[styles.tTitle, { color: '#000' }]}>{type === 'TRANSIT' ? orderNumber : format(new Date(nextInvoice), 'do MMMM')}</Text>
                            <CustomListManagePack
                                type={type}
                                route={route}
                                listPrice={listPrice}
                                setListPrice={setListPrice}
                                title={'Vitamins'}
                                dataPack={dataList}
                                subscription_id={subscription_id}
                                getSubscriptionPack={getSubscription}
                                getTransitionPack={getTransition}
                            />
                        </View>
                        <View style={styles.vTotal}>
                            <View style={styles.vHeaderTotal}>
                                <Text style={styles.tTotal}>Total</Text>
                                <View style={styles.vRightTotal}>
                                    <View style={styles.vPrice}>
                                        <Text style={[styles.tPrice, { opacity: 0.5 }]}>${total.toFixed(2)}</Text>
                                        <View style={styles.vLine} />
                                    </View>
                                    <Text style={styles.tPrice}>${totalRemain.toFixed(2)}</Text>
                                    <SvgDownBig viewBox={`0 0 ${size[40]} ${size[40]}`} />
                                </View>
                            </View>
                            <View style={styles.vBottomTotal}>
                                <View style={styles.rowTotal}>
                                    <Text style={styles.titleBottomTotal}>Subtotal</Text>
                                    <Text style={styles.tSubPrice}>${total}</Text>
                                </View>
                                <View style={[styles.rowTotal, { marginTop: size[16] }]}>
                                    <Text style={styles.titleBottomTotal}>Shipping</Text>
                                    <Text style={styles.priceBottomTotal}>{countries && countries[0] && (total >= countries[0].freeShipping ? 'FREE' : `$${countries[0].shippingCost}`) || 0}</Text>
                                </View>
                                {(discount !== "" || percent !== "") &&
                                    <View style={[styles.rowTotal, { marginTop: size[16] }]}>
                                        <Text style={styles.titleBottomTotal}>Discount</Text>
                                        <Text style={styles.priceBottomTotal}>{discount !== "" ? `${discount}$` : `${percent}%`}  </Text>
                                    </View>
                                }

                                {credit_available > 0 &&
                                    <View style={[styles.rowTotal, { marginTop: size[16] }]}>
                                        <Text style={styles.titleBottomTotal}>Credit</Text>
                                        <Text style={styles.priceBottomTotal}>${credit.toFixed(2)}</Text>
                                    </View>
                                }
                                {setting && setting.data && setting.data.minimum_order_price && totalRemain <= setting.data.minimum_order_price &&
                                    <View style={{ marginTop: size[16] }}>
                                        <Text style={styles.tMinOrder}>*Minimum basket of ${setting.data.minimum_order_price}, due to industry regulation. Your remaining credits will be fully applied to your next payments.</Text>
                                    </View>
                                }
                            </View>
                            {type !== "TRANSIT" &&
                                <View style={styles.vPromocode}>
                                    <TextInput
                                        style={styles.inputPromocode}
                                        onChangeText={changePromoCode}
                                        value={promoCode}
                                        placeholder={'Have a promocode ?'}

                                    />
                                    {(discount !== "" || percent !== "") ?
                                        <TouchableOpacity
                                            onPress={removePromoCode}
                                            style={styles.btnPromocode}>
                                            <Text style={styles.tBtnPromocode}>Remove</Text>
                                        </TouchableOpacity>
                                        :
                                        <TouchableOpacity
                                            onPress={applyPromoCode}
                                            style={styles.btnPromocode}>
                                            <Text style={styles.tBtnPromocode}>Apply</Text>
                                        </TouchableOpacity>
                                    }

                                </View>
                            }
                        </View>

                    </ScrollView>
                </View>
            </Screen>
        </MenuProvider>
    );
}
