import React, { useState, useEffect, useRef } from 'react';
import { FlatList, Text, TouchableOpacity, View, StyleSheet, Dimensions, RefreshControl } from 'react-native';
import { translate } from '../../library/utils/i18n/translate';
import { FONT_14, FONT_24 } from '../../themes/fontSize';
import { size } from '../../themes/size';
import { Get } from '../../library/networking/fetch';
import DropDownHolder from '../../library/utils/dropDownHolder';
import { ProcessDialog } from '../../library/components/processDialog';
import { ItemProduct } from './itemProduct';
import { SvgEdit } from '../../themes/svg';
import { MY_PACK } from '../../navigation/TypeScreen';
import { format } from "date-fns";


const { width } = Dimensions.get('window');

export const CustomListProduct = (props: any) => {
    const {
        navigation,
        type,
        titleNotPage,
        estNextPack,
        route
    } = props;

    const [refreshing, setRefresh] = useState(false);
    const [dataList, setDataList] = useState(null);
    const [loading, setLoading] = useState(false);
    const [timeEst, setTimeEst] = useState('');
    const [indexDisplay, setIndexDisplay] = useState(0);
    const [subscription_id, setSubscription_id] = useState(0);
    const [coupons, setCoupons] = useState("");
    const refDot = useRef(null);
    const { getTransAction, getNextPackAction } = route && route.params;
    const { dataNextPack, dataTrans } = route && route.params.stateAuth;

    const onRefresh = React.useCallback(() => {
        checkType();
    }, []);

    interface propRender {
        item: any,
        index: number
    };

    const getSubscriptionId = () => {
        Get(`/api/v1/subscriptions/check`)
            .then(response => {
                response.json().then(data => {
                    if (data && data.data) {
                        console.log("data subscrip id", data.data)
                        setSubscription_id(data.data.subscription.data.id)
                        setCoupons(data.data.subscription.data.coupons)
                    }
                });
            }).catch(err => {
                DropDownHolder.showError("", translate('MESS:error') || "")
                console.log('err', err)
            })
    }
    const getListProduct = (listId: String) => {
        Get(`/api/v1/products?ids=${listId}`)
            .then(response => {
                response.json().then(data => {
                    if (data && data.data) {
                        setDataList(data.data)
                    }
                    setRefresh(false);
                    setLoading(false);
                });
            }).catch(err => {
                DropDownHolder.showError("", translate('MESS:error') || "")
                console.log('err', err)
                setRefresh(false);
                setLoading(false);
            })
    }

    const getTransition = () => {
        Get('/api/v1/users/me/orders/latest')
            .then(response => {
                response.json().then(data => {
                    console.log("data tran", data.data)
                    getTransAction(data.data)
                    // const id = data.data.id
                    // setSubscription_id(id)
                    if (data.data && data.data.estimated_delivery) {
                        setTimeEst(data.data && data.data.estimated_delivery)
                    }
                    let listProducts = data && data.data && data.data.products && data.data.products.data
                    if (listProducts) {
                        let listId = listProducts.map((item: any) => item.id);
                        getListProduct(listId.toString())
                    } else {
                        setRefresh(false);
                    }
                });
                setLoading(false)
            }).catch(err => {
                setLoading(false)
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
                        // const id = data.data[0].id
                        // setSubscription_id(id)
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
        setLoading(true)
        switch (type) {
            case "SUBSCRIPTION":
                getSubscription()
                break;
            case "TRANSIT":
                getTransition()
                break;
            default:
                setLoading(false)
                break;
        }
    };

    const renderItem = (props: propRender) => {
        const { item, index } = props
        return (
            <ItemProduct item={item} index={index} />
        )
    }

    const renderItemDot = (props: propRender) => {
        const { item, index } = props
        return (
            <View style={indexDisplay === index ? styles.vItemDotDisplay : styles.vItemDot} />
        )
    };

    const openManagerPack = () => {
        navigation && navigation.navigate(MY_PACK, {
            dataList: dataList,
            subscription_id: subscription_id,
            type: type,
            coupons: coupons,
            time: timeEst && format(new Date(timeEst), 'do MMMM') || estNextPack && format((new Date(estNextPack)).setDate((new Date(estNextPack).getDate() + 7)), 'do MMMM')
        })
    };

    const onViewRef = React.useRef((viewableItems: any) => {
        const index = viewableItems && viewableItems.viewableItems && viewableItems.viewableItems[0] && viewableItems.viewableItems[0].index
        if (index) {
            if (refDot && refDot.current) {
                refDot.current.scrollToIndex({ animated: true, index: index });
                setIndexDisplay(index)
            }
        } else if (index == 0) {
            setIndexDisplay(0)
        }
    })
    const viewConfigRef = React.useRef({ viewAreaCoveragePercentThreshold: 80 })

    useEffect(() => {
        getSubscriptionId()
        checkType();
    }, [dataNextPack, dataTrans]);

    return (
        <View style={styles.vFullScreen}>
            <ProcessDialog visible={loading} />
            {titleNotPage ?
                <View style={styles.vHeader}>
                    <Text style={styles.tTitleNotPage}>{titleNotPage}</Text>
                    <View style={styles.vTitle}>
                        <Text style={[styles.tTitle, { opacity: 0.7 }]}>Delivered :  </Text>
                        <TouchableOpacity style={styles.btnEdit}>
                            <Text style={styles.tEditTitNotPage}>
                                {timeEst && format(new Date(timeEst), 'do MMMM')}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
                :
                <View style={styles.vHeader}>
                    <View style={styles.vTitle}>
                        <Text style={styles.tTitle}>Est. delivery :  </Text>
                        <TouchableOpacity style={styles.btnEdit}>
                            <Text style={styles.tEditTit}>
                                {timeEst && format(new Date(timeEst), 'do MMMM')}
                                {estNextPack && format((new Date(estNextPack)).setDate((new Date(estNextPack).getDate() + 7)), 'do MMMM')}
                            </Text>
                            {estNextPack &&
                                <View style={styles.vEdit}>
                                    <SvgEdit
                                        width={size[18]}
                                        height={size[16]}
                                        viewBox={`0 0 ${size[10]} ${size[10]}`} />
                                </View>
                            }
                        </TouchableOpacity>
                    </View>
                </View>
            }


            <FlatList
                onViewableItemsChanged={onViewRef.current}
                viewabilityConfig={viewConfigRef.current}
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
                {/* <View style={styles.vDot}> */}
                <FlatList
                    ref={refDot}
                    contentContainerStyle={{ paddingRight: size[24], paddingLeft: size[16] }}
                    showsHorizontalScrollIndicator={false}
                    data={dataList}
                    renderItem={renderItemDot}
                    horizontal
                    keyExtractor={(item, index) => index.toString()}
                />
                {/* </View> */}
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
        // marginTop: size[10],
        flex: 1,
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
        paddingTop: size[20],
        width: '100%',
        alignItems: 'center',
    },
    btnManager: {

        marginTop: size[15],
        marginBottom: size[20],
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
    },
    vDot: {
        alignItems: 'center',
    },
    vItemDot: {
        backgroundColor: '#DCD2BD',
        borderRadius: size[100],
        width: size[8],
        height: size[8],
        marginRight: size[16]
    },
    vItemDotDisplay: {
        backgroundColor: '#637C5A',
        borderRadius: size[100],
        width: size[8],
        height: size[8],
        marginRight: size[16]
    }
})