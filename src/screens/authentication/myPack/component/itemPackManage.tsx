import React, { useEffect, useRef, useState } from 'react';
import { Image, TextInput, ScrollView, Text, TouchableOpacity, View, StyleSheet, Dimensions, FlatList } from 'react-native';
import { FONT_12, FONT_14, FONT_18, FONT_24 } from '../../../../themes/fontSize';
import { size } from '../../../../themes/size';
import { StatusBarHeight } from '../../../../config/heightStatusbar';
import { SvgDelete, SvgDownTiny } from '../../../../themes/svg';
import { Put } from '../../../../library/networking/fetch';
import DropDownHolder from '../../../../library/utils/dropDownHolder';
import { translate } from '../../../../library/utils/i18n/translate';

const { width, height } = Dimensions.get('window');

export const ItemPackManage = (props: any) => {
    const {
        navigation,
        item,
        isHideBorder,
        listPrice,
        setListPrice
    } = props;
    const [count, setCount] = useState(1);
    const [listQuality, setListQuality] = useState([]);
    const [showListQuality, setShowListQuality] = useState(false);

    const showOptionQuality = () => {
        setShowListQuality(!showListQuality)
    }

    const updateProduct = (quantity: number) => {
        const body = {
            action: "update",
            product_id: item.id,
            quantity: quantity
        }

        Put(`/api/v1/subscriptions/${3588}`, body)
            .then(response => {
                console.log("response", response)
                response.json().then(data => {
                    console.log("update", data)
                    if (data.message) {
                        DropDownHolder.showError("", data.message)
                    }
                });
            }).catch(err => {
                DropDownHolder.showError("", translate('MESS:error') || "")
                console.log('err', err)
            })
    };

    const selectQuality = (item: number) => {
        setCount(item)
        setShowListQuality(false)
        updateProduct(item)
    };
    const renderItem = (props: any) => {
        const { item, index } = props;
        return (
            <TouchableOpacity
                onPress={() => selectQuality(item)}
                style={styles.vItemQuality}>
                <Text style={styles.tItemQuality}>{item}</Text>
            </TouchableOpacity>
        )
    };

    useEffect(() => {
        const list = [];
        for (let i = 1; i <= item.max_quantity; i++) {
            list.push(i)
        }
        setListQuality(list);
    }, []);

    useEffect(() => {
        const price = count * item.price;
        console.log("price", price)

        let arrTemp = [...listPrice];
        const index = arrTemp.findIndex(temp => temp.id === item.id);
        if (index !== -1) {
            arrTemp[index].price = price
        } else {
            arrTemp.push({
                id: item.id,
                price: price
            });
        }

        setListPrice && setListPrice(arrTemp);
    }, [count])

    return (
        <View style={isHideBorder ? styles.vContent : [styles.vContent, styles.borderBottom]}>
            <View style={styles.vItem}>
                <Image
                    style={styles.imgProduct}
                    source={{ uri: item.productTiny }} />
                <View style={styles.vTitle}>
                    <View style={styles.vRow}>
                        <Text style={styles.tName}>{item.name}</Text>
                        <TouchableOpacity style={styles.btnDelete}>
                            <SvgDelete viewBox={`0 0 ${size[24]} ${size[24]}`} />
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.tNote}>{item.booklet_reason}</Text>
                    <View style={styles.vRow}>
                        <Text style={styles.tPrice}>{item.price}$</Text>
                        <TouchableOpacity
                            onPress={showOptionQuality}
                            style={styles.btnSelectQuality}>
                            <View style={styles.inputCount}>
                                <Text style={styles.tCount}>{count}</Text>
                            </View>

                            <SvgDownTiny viewBox={`0 0 ${size[24]} ${size[24]}`} />
                        </TouchableOpacity>

                        <Text style={styles.tOption}>{count > 1 ? "tablets / day" : "tablet / day"}</Text>
                    </View>
                </View>
            </View>
            {showListQuality &&
                <View style={styles.vPopupQuality}>
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        data={listQuality}
                        renderItem={renderItem}
                        keyExtractor={(item, index) => index.toString()}
                    />
                </View>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    vItem: {
        flex: 1,

        flexDirection: 'row',
    },
    vContent: {
        paddingBottom: size[24],
        paddingTop: size[18],
        flex: 1,
    },
    borderBottom: {
        borderBottomWidth: 1,
        borderColor: '#DCD2BD',
    },
    tTitle: {
        color: '#000',
        fontFamily: 'SolaireDT',
        fontSize: FONT_24
    },
    imgProduct: {
        flex: 2,
        width: size[64],
        height: size[64],
        borderRadius: size[10],
        backgroundColor: '#EEEDE8'
    },
    vTitle: {
        flex: 8,
        marginLeft: size[16],
        justifyContent: 'space-between'
    },
    tName: {
        color: '#272626',
        fontSize: FONT_18,
        fontWeight: '400',
        fontFamily: 'SolaireDT'
    },
    tNote: {
        color: '#939393',
        fontSize: FONT_12,
        fontWeight: '400',
        fontFamily: 'NHaasGroteskTXPro'
    },
    tPrice: {
        color: '#000',
        fontSize: FONT_14,
        fontWeight: '500',
        fontFamily: 'NHaasGroteskTXPro'
    },
    tOption: {
        marginLeft: size[14],
        color: '#939393',
        fontSize: FONT_12,
        fontWeight: '400',
        fontFamily: 'NHaasGroteskTXPro'
    },
    vRow: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
    },
    inputCount: {
        marginLeft: size[16],
        // marginRight: size[6],
        color: '#272626',
        paddingHorizontal: size[10],
        paddingBottom: size[2],
        borderBottomWidth: 1,
        borderColor: '#BED0A2'
    },
    btnDelete: {
        position: 'absolute',
        right: 0
    },
    btnSelectQuality: {
        flexDirection: 'row'
    },
    tCount: {
        fontSize: FONT_14,
        fontWeight: '400',
        fontFamily: 'NHaasGroteskTXPro',
    },
    vPopupQuality: {
        alignItems: 'center',
        right: size[30]
    },
    vItemQuality: {
        backgroundColor: '#BED0A2',
        borderWidth: 1,
        borderColor: '#272626'
    },
    tItemQuality: {
        paddingVertical: size[2],
        paddingHorizontal: size[20]
    }
})