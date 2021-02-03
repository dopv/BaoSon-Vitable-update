import React, { useState, useRef, Children, useEffect } from 'react';
import { View, Text, TouchableWithoutFeedback, Image, Dimensions, ScrollView } from 'react-native';
import { Screen } from '../../../library/components/screen';
import { styles } from './styles';
import { CustomHeader } from "../../../components/header";
import { SvgBack, SvgDown, SvgDownBig, SvgTracker } from '../../../themes/svg';
import { size } from '../../../themes/size';
import { HOME_SCREEN } from '../../../navigation/TypeScreen';
import { CustomPage } from '../../../components/page';
import { CustomListProduct } from '../../../components/listProduct/listProduct';
import { Get } from '../../../library/networking/fetch';
import DropDownHolder from '../../../library/utils/dropDownHolder';
import { translate } from '../../../library/utils/i18n/translate';
import { CustomListManagePack } from './component/listManagePack';
import { analytics } from 'firebase';

const { width, height } = Dimensions.get('window');

interface MyPackProps {
    navigation: any,
    route: any
}

export const MyPackScreen = (props: MyPackProps) => {
    const { navigation, route } = props;
    const dataList = route && route.params && route.params.dataList || [];
    const [country, setCountry] = useState('AU');
    const [countries, setCountries] = useState(null);
    const [setting, setSetting] = useState(null);
    const [minimumOrderPrice, setMinimumOrderPrice] = useState(0);
    const [listPrice, setListPrice] = useState([
        {
            id: 0,
            price: 0
        }
    ])
    const [total, setTotal] = useState(0);

    const goBack = () => {
        navigation && navigation.goBack();
    };

    const getCountry = () => {
        Get('/api/v1/country')
            .then(response => {
                response.json().then(data => {
                    console.log("get country", data)
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
                    console.log("get countries", data)
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
                    const minimum_order_price = data.minimum_order_price || 0
                    setMinimumOrderPrice(minimum_order_price);
                });
            }).catch(err => {
                DropDownHolder.showError("", translate('MESS:error') || "")
                console.log('err', err)
            })
    };

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
        getCountry()
        getSetting()
        getListPrice()
    }, [])

    useEffect(() => {
        var sum = listPrice.map(it => it.price).reduce(function (a, b) {
            return a + b;
        }, 0);
        setTotal(sum)
    }, [listPrice]);

    useEffect(() => {
        console.log("countries", countries)
    }, [countries]);

    return (
        <Screen
            isScroll={false}
            hidden={false}
            backgroundColor={'transparent'}
            forceInset={{ bottom: 'never', top: 'never' }}
        >
            <View style={styles.fullScreen}>
                <CustomHeader
                    navigation={navigation}
                    imgBackground={require('../../../../assets/images/bg_manage_pack.png')}
                    logoLeft={require('../../../../assets/images/icons/Back.png')}
                    onPressLeft={goBack}
                    title={'Manage my pack'}
                />
                <ScrollView contentContainerStyle={{ paddingBottom: size[26] }}>
                    <View style={styles.vContent}>
                        <Text style={styles.tTitle}>Estimated delivery :</Text>
                        <Text style={[styles.tTitle, { color: '#000' }]}>20th January</Text>
                        <CustomListManagePack
                            listPrice={listPrice}
                            setListPrice={setListPrice}
                            title={'Vitamins'}
                            dataPack={dataList}
                        />

                    </View>
                    <View style={styles.vTotal}>
                        <View style={styles.vHeaderTotal}>
                            <Text style={styles.tTotal}>Total</Text>
                            <View style={styles.vRightTotal}>
                                <Text style={styles.tPrice}>{total} $</Text>
                                <Text style={styles.tPrice}>14 $</Text>
                                <SvgDownBig viewBox={`0 0 ${size[40]} ${size[40]}`} />
                            </View>
                        </View>
                        <View style={styles.vBottomTotal}>
                            <View style={styles.rowTotal}>
                                <Text style={styles.titleBottomTotal}>Subtotal</Text>
                                <Text style={styles.priceBottomTotal}>{total}$</Text>
                            </View>
                            <View style={[styles.rowTotal, { marginTop: size[16] }]}>
                                <Text style={styles.titleBottomTotal}>Shipping</Text>
                                <Text style={styles.priceBottomTotal}>{countries && countries[0] && ( 31 > countries[0].freeShipping ? 'FREE' : `${countries[0].shippingCost}$`) || 0}</Text>
                            </View>
                            <View style={[styles.rowTotal, { marginTop: size[16] }]}>
                                <Text style={styles.titleBottomTotal}>Discount</Text>
                                <Text style={styles.priceBottomTotal}>30$</Text>
                            </View>
                            <View style={[styles.rowTotal, { marginTop: size[16] }]}>
                                <Text style={styles.titleBottomTotal}>Reward</Text>
                                <Text style={styles.priceBottomTotal}>30$</Text>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </View>
        </Screen>
    );
}
