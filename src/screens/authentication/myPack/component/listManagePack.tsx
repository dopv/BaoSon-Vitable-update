import React, { useEffect, useRef, useState } from 'react';
import { Image, ImageBackground, ScrollView, Text, TouchableOpacity, View, StyleSheet, Dimensions, FlatList } from 'react-native';
import { FONT_14, FONT_24 } from '../../../../themes/fontSize';
import { size } from '../../../../themes/size';
import { StatusBarHeight } from '../../../../config/heightStatusbar';
import { ItemPackManage } from './itemPackManage';
import { Get } from '../../../../library/networking/fetch';
import DropDownHolder from '../../../../library/utils/dropDownHolder';
import { translate } from '../../../../library/utils/i18n/translate';

const { width, height } = Dimensions.get('window');

export const CustomListManagePack = (props: any) => {
    const {
        navigation,
        title,
        dataPack,
        isHideBorder,
        listPrice,
        setListPrice,
        subscription_id,
        route,
        type,
        getSubscriptionPack,
        getTransitionPack
    } = props;

    interface ListMangeProps {
        item: any,
        index: number
    };

    const { getTransAction, getNextPackAction } = route && route.params;
    const [dataPr, setDataPr] = useState(null)
    const [isOpen, setIsOpen] = useState(false);

    const getTransition = () => {
        Get('/api/v1/users/me/orders/latest')
            .then(response => {
                response.json().then(data => {
                    getTransAction(data.data)
                    setDataPr(data.data.products.data)
                    getTransitionPack && getTransitionPack()
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
                        setDataPr(data.data)
                        getSubscriptionPack && getSubscriptionPack()
                    };
                }).catch(err => {
                    DropDownHolder.showError("", translate('MESS:error') || "")
                    console.log('err', err)
                })
            })
    };

    useEffect(() => {
        if (type === "TRANSIT") {
            getTransition()
        } else {
            getSubscription()
        }
    }, [])

    console.log("dataPr", dataPr)
    return (
        <View style={styles.vContent}>
            <Text style={styles.tTitle}>{title}</Text>
            <View style={styles.vLine} />
            {dataPr && dataPr.map((item: any, index: number) => {

                if (isHideBorder) {
                    return (
                        <ItemPackManage
                            index={index}
                            getTransition={getTransition}
                            getSubscription={getSubscription}
                            type={type}
                            route={route}
                            subscription_id={subscription_id}
                            listPrice={listPrice}
                            setListPrice={setListPrice}
                            quantity={item.quantity}
                            item={type === "TRANSIT" ? item : (item.product.data && item.product.data || null)}
                            isHideBorder={index == dataPack.length - 1 ? true : false} />
                    )
                } else {
                    return (
                        <ItemPackManage
                            index={index}
                            getTransition={getTransition}
                            getSubscription={getSubscription}
                            type={type}
                            route={route}
                            subscription_id={subscription_id}
                            listPrice={listPrice}
                            quantity={item.quantity}
                            setListPrice={setListPrice}
                            item={type === "TRANSIT" ? item : (item.product.data && item.product.data || null)}
                        />
                    )
                }
            })}
        </View>
    )
}

const styles = StyleSheet.create({
    vContent: {
        flex: 1,
        marginTop: size[24]
    },
    tTitle: {
        color: '#000',
        fontFamily: 'SolaireDT',
        fontSize: FONT_24
    },
    vLine: {
        marginTop: size[8],
        height: 1,
        width: '100%',
        backgroundColor: '#272626'
    }
})