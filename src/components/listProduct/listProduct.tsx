import React, { useState, useEffect } from 'react';
import { Image, FlatList, Text, TouchableOpacity, TouchableWithoutFeedback, View, StyleSheet, Dimensions, RefreshControl } from 'react-native';
import { translate } from '../../library/utils/i18n/translate';
import { useRoute } from '@react-navigation/native';
import { FONT_14, FONT_24 } from '../../themes/fontSize';
import { size } from '../../themes/size';
import { StatusBarHeight } from '../../config/heightStatusbar';
import { Get } from '../../library/networking/fetch';
import DropDownHolder from '../../library/utils/dropDownHolder';
import * as Font from 'expo-font';
import { ProcessDialog } from '../../library/components/processDialog';
import { ItemProduct } from './itemProduct';
import { SvgEdit } from '../../themes/svg';
import { MY_PACK } from '../../navigation/TypeScreen';

const { width, height } = Dimensions.get('window');

export const CustomListProduct = (props: any) => {
    const {
        navigation,
        type,
        titleNotPage
    } = props;

    const [refreshing, setRefresh] = useState(false);
    const [dataList, setDataList] = useState(null);
    const [loading, setLoading] = useState(false);

    const onRefresh = React.useCallback(() => {
        setRefresh(true);
        checkType()
    }, []);

    interface propRender {
        item: any,
        index: number
    };

    const renderItem = (props: propRender) => {
        const { item, index } = props
        return (
            <ItemProduct item={item} index={index} />
        )
    }

    const getListProduct = (listId: String) => {
        Get(`/api/v1/products?ids=${listId}`)
            .then(response => {
                response.json().then(data => {
                    console.log("data list product ", data)
                    if (data && data.data) {
                        setDataList(data.data)
                    }
                    setRefresh(false);
                    setLoading(false)
                });
            }).catch(err => {
                DropDownHolder.showError("", translate('MESS:error') || "")
                console.log('err', err)
                setRefresh(false);
                setLoading(false)
            })
    }

    const getTransition = () => {
        Get('/api/v1/users/me/orders/latest')
            .then(response => {
                response.json().then(data => {
                    console.log("data transition", data)
                    let listProducts = data && data.data && data.data.products && data.data.products.data
                    if (listProducts) {
                        let listId = listProducts.map((item: any) => item.id);
                        getListProduct(listId.toString())
                    } else {
                        setRefresh(false);
                        setLoading(false)
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
                    console.log("data subscript", data)

                    if (data && data.data) {
                        let listId = data.data.map((item: any) => item.product_id);
                        getListProduct(listId.toString())
                    } else {
                        setRefresh(false);
                        setLoading(false)
                    }
                });
            }).catch(err => {
                DropDownHolder.showError("", translate('MESS:error') || "")
                console.log('err', err)
                setLoading(false)
            })
    }

    const checkType = () => {
        switch (type) {
            case "SUBSCRIPTION":
                getSubscription()
                break;
            case "TRANSIT":
                getTransition()
            default:
                setLoading(false)
                break;
        }
    };

    const openManagerPack = () => {
        navigation && navigation.navigate(MY_PACK)
    };

    useEffect(() => {
        setLoading(true)
        checkType()
    }, [])

    return (
        <View style={styles.vFullScreen}>
            <ProcessDialog visible={loading} />

            {titleNotPage ?
                <View style={styles.vHeader}>
                    <Text style={styles.tTitleNotPage}>{titleNotPage}</Text>
                    <View style={styles.vTitle}>
                        <Text style={[styles.tTitle, { opacity: 0.7 }]}>Delivered :  </Text>
                        <TouchableOpacity style={styles.btnEdit}>
                            <Text style={styles.tEditTitNotPage}>20th January</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                :
                <View style={styles.vHeader}>
                    <View style={styles.vTitle}>
                        <Text style={styles.tTitle}>Est. delivery :  </Text>
                        <TouchableOpacity style={styles.btnEdit}>
                            <Text style={styles.tEditTit}>20th January</Text>
                            <View style={styles.vEdit}>
                                <SvgEdit
                                    width={size[18]}
                                    height={size[16]}
                                    viewBox={`0 0 ${size[10]} ${size[10]}`} />
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            }


            <FlatList
                contentContainerStyle={{ paddingRight: size[24], paddingLeft: size[16] }}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                        colors={["#9Bd35A", "#689F38"]}
                    />
                }
                showsHorizontalScrollIndicator={false}
                data={dataList}
                renderItem={renderItem}
                horizontal
                keyExtractor={(item, index) => index.toString()}
            />
            <View style={styles.vBottom}>
                <TouchableOpacity
                    onPress={openManagerPack}
                    style={styles.btnManager}>
                    <Text style={styles.tManage}>Manage my pack</Text>
                </TouchableOpacity>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    vFullScreen: {
        marginTop: size[10],
        flex: 1
    },
    tTitleNotPage: {
        marginBottom: size[2],
        fontFamily: 'SolaireDT',
        fontSize: FONT_24,
        color: '#272626',
        fontWeight: '400'
    },
    vItem: {
        width: width / 1.3,
        marginLeft: size[20],
        borderWidth: 1,
        borderColor: '#BED0A2',
        borderRadius: size[4]
    },
    vList: {
        flex: 1
    },
    imgBanner: {
        borderTopLeftRadius: size[4],
        borderTopRightRadius: size[4],
        width: '100%',
        height: size[80]
    },
    tName: {
        fontSize: size[18],
        fontFamily: 'SolaireDT'
    },
    vContent: {
        marginVertical: size[24],
        marginLeft: size[16],
        marginRight: size[35]
    },
    vCategory: {
        marginBottom: size[8],
        backgroundColor: 'gray'
    },
    vLine: {
        marginTop: size[3],
        marginBottom: size[16],
        backgroundColor: '#BED0A2',
        width: size[60],
        height: size[2]
    },
    tContent: {
        fontSize: size[14],
        fontFamily: 'NHaasGroteskTXPro'
    },
    btnMore: {
        marginTop: size[8],
    },
    tMore: {
        color: '#F5785A',
        fontSize: size[14],
        fontFamily: 'NHaasGroteskTXPro',
        textDecorationLine: 'underline'
    },
    imgCategories: {
        backgroundColor: 'blue',
        width: size[24],
        height: size[24]
    },
    vHeader: {
        marginHorizontal: size[24],
        marginTop: size[20],
        marginBottom: size[10],
    },
    vTitle: {
        alignItems: 'center',
        flexDirection: 'row'
    },
    tTitle: {
        fontSize: FONT_14,
        fontFamily: 'NHaasGroteskTXPro',
        color: '#272626',
        fontWeight: '400'
    },
    btnEdit: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    vEdit: {
        paddingLeft: size[11]
    },
    tEditTit: {
        fontSize: FONT_14,
        fontFamily: 'NHaasGroteskTXPro',
        color: '#F5785A',
        fontWeight: '500',
        textDecorationLine: 'underline'
    },
    tEditTitNotPage: {
        fontSize: FONT_14,
        fontFamily: 'NHaasGroteskTXPro',
        color: '#939393',
        fontWeight: '500',
    },
    vBottom: {
        width: '100%',
        alignItems: 'center',
        // bottom:0
    },
    btnManager: {
        marginTop: size[16],
        marginBottom: size[24],
        borderWidth: 1,
        borderColor: '#272626',
        backgroundColor: '#F5785A',
        paddingVertical: size[13],
        paddingHorizontal: size[24]
    },
    tManage: {
        fontSize: FONT_14,
        fontFamily: 'NHaasGroteskTXPro',
        color: '#272626'
    }
})