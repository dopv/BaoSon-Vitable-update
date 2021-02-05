import React, { useEffect, useState } from 'react';
import { Image, Text, TouchableOpacity, View, StyleSheet, Dimensions, FlatList } from 'react-native';
import { FONT_12, FONT_14, FONT_18, FONT_24 } from '../../../../themes/fontSize';
import { size } from '../../../../themes/size';
import { SvgDelete, SvgDownTiny } from '../../../../themes/svg';
import { Put } from '../../../../library/networking/fetch';
import DropDownHolder from '../../../../library/utils/dropDownHolder';
import { translate } from '../../../../library/utils/i18n/translate';
import {
    Menu,
    MenuOptions,
    renderers,
    MenuOption,
    MenuTrigger,
    MenuProvider,
} from 'react-native-popup-menu';
const { SlideInMenu } = renderers;


const { width, height } = Dimensions.get('window');

export const ItemPackManage = (props: any) => {
    const {
        navigation,
        item,
        isHideBorder,
        listPrice,
        setListPrice,
        subscription_id,
        route,
        type,
        getTransition,
        getSubscription,
        quantity,
        index,
    } = props;
    const [count, setCount] = useState(1);
    const [listQuality, setListQuality] = useState([]);
    const [showListQuality, setShowListQuality] = useState(false);
    const { dataNextPack, dataTrans } = route && route.params.stateAuth;
    const [isOpen, setIsOpen] = useState(false);

    const showOptionQuality = () => {
        setIsOpen(!isOpen)
    }

    const updateProduct = (quantity: number) => {
        const body = {
            action: "update",
            product_id: item.id,
            quantity: quantity
        }

        Put(`/api/v1/subscriptions/${subscription_id}`, body)
            .then(response => {
                response.json().then(data => {
                    if (data.successed) {
                        if (type === "TRANSIT") {
                            getTransition();
                        } else {
                            getSubscription();
                        }
                    }
                    if (data.message) {
                        DropDownHolder.showError("", data.message)
                    }
                });
            }).catch(err => {
                DropDownHolder.showError("", translate('MESS:error') || "")
                console.log('err', err)
            })
    };

    const removeProduct = () => {

        if (type === "TRANSIT") {
            if (dataTrans.products && dataTrans.products.data.length <= 1) {
                DropDownHolder.showWarning("", "We don't want to send you empty boxes! Trying to change your plan?")
                return
            }
        } else {
            if (dataNextPack && dataNextPack.length <= 1) {
                DropDownHolder.showWarning("", "We don't want to send you empty boxes! Trying to change your plan?")
                return
            }
        }
        const body = { action: "deleted", product_id: item.id }
        Put(`/api/v1/subscriptions/${subscription_id}`, body)
            .then(response => {
                response.json().then(data => {
                    if (data.successed) {
                        if (type === "TRANSIT") {
                            getTransition();
                        } else {
                            getSubscription();
                        }
                    }
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
        setIsOpen(false)
    };
    const renderItem = (props: any) => {
        const { item, index } = props;
        return (
            <TouchableOpacity onPress={() => selectQuality(item)}
                style={styles.vItemQuality}>
                <Text style={styles.tItemQuality}>{item}</Text>
            </TouchableOpacity>
        )
    };

    useEffect(() => {
        setCount(quantity)
        const list: any = [];
        for (let i = 1; i <= item.max_quantity; i++) {
            list.push(i)
        }
        setListQuality(list);
    }, []);

    useEffect(() => {
        const price = count * item.price;

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

    if (item) {
        return (
            <View key={`row-${index}`} style={isHideBorder ? styles.vContent : [styles.vContent, styles.borderBottom]}>
                <View style={styles.vItem}>
                    <Image
                        style={styles.imgProduct}
                        source={{ uri: item.productTiny }} />
                    <View style={styles.vTitle}>
                        <View style={styles.vRow}>
                            <Text style={styles.tName}>{item.name}</Text>
                            {type !== "TRANSIT" &&
                                <TouchableOpacity
                                    onPress={removeProduct}
                                    style={styles.btnDelete}>
                                    <SvgDelete viewBox={`0 0 ${size[24]} ${size[24]}`} />
                                </TouchableOpacity>
                            }

                        </View>
                        <Text style={styles.tNote}>{item.booklet_reason}</Text>
                        <View style={styles.vRow}>

                            {type === "TRANSIT"
                                ?
                                <View style={styles.vRow}>
                                    <Text style={styles.tPrice}>{item.price}$</Text>
                                </View>
                                :


                                <View style={styles.vRow}>
                                    <TouchableOpacity
                                        onPress={showOptionQuality}
                                        style={styles.btnSelectQuality}>
                                        <View style={styles.inputCount}>
                                            <Text style={styles.tCount}>{count}</Text>
                                        </View>
                                        <SvgDownTiny viewBox={`0 0 ${size[24]} ${size[24]}`} />

                                        <Menu
                                            opened={isOpen}
                                            onBackdropPress={() => setIsOpen(false)}
                                            style={{ position: 'absolute', height: '100%', width: '100%', zIndex: 1 }}>
                                            <MenuTrigger />
                                            <MenuOptions customStyles={{ optionsContainer: { width: size[50] } }}>
                                                <FlatList
                                                    style={{ borderBottomWidth: 1 }}
                                                    showsVerticalScrollIndicator={false}
                                                    data={listQuality}
                                                    renderItem={renderItem}
                                                    keyExtractor={(item, index) => index.toString()}
                                                />

                                            </MenuOptions>
                                        </Menu>
                                    </TouchableOpacity>

                                    <Text style={styles.tOption}>{count > 1 ? "tablets / day" : "tablet / day"}</Text>
                                </View>
                            }
                        </View>
                    </View>
                </View>

            </View >
        )
    } else {
        return null
    }

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
        flexDirection: 'row',
    },
    tCount: {
        fontSize: FONT_14,
        fontWeight: '400',
        fontFamily: 'NHaasGroteskTXPro',
    },
    vItemQuality: {
        backgroundColor: '#BED0A2',
        borderTopWidth: 1,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderColor: '#272626',
        alignItems: 'center',
        paddingVertical: size[5]
    },
    tItemQuality: {
        paddingVertical: size[2],
        paddingHorizontal: size[10]
    }
})