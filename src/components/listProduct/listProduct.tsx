import React, { useState, useEffect, useRef } from 'react';
import { FlatList, Text, TouchableOpacity, View, StyleSheet, Dimensions, RefreshControl, ScrollView } from 'react-native';
import { translate } from '../../library/utils/i18n/translate';
import { FONT_14, FONT_24 } from '../../themes/fontSize';
import { size } from '../../themes/size';
import { Get, Put } from '../../library/networking/fetch';
import DropDownHolder from '../../library/utils/dropDownHolder';
import { ProcessDialog } from '../../library/components/processDialog';
import { ItemProduct } from './itemProduct';
import { SvgEdit } from '../../themes/svg';
import { MY_PACK } from '../../navigation/TypeScreen';
import { format } from "date-fns";
import DateTimePickerModal from "react-native-modal-datetime-picker";

const { width } = Dimensions.get('window');

export const CustomListProduct = (props: any) => {
    const {
        navigation,
        type,
        titleNotPage,
        estNextPack,
        route,
        subscription_id,
        coupons,
        getTransition,
        getSubscription,
        timeEst,
        refreshing,
        setLoading,
        listIdSub,
        listIdTransit,
        setRefresh,
        setEstNextPack,
        orderNumber,
        isResume
    } = props;

    const [isDatePickerVisible, setDatePickerVisible] = useState(false);
    const [indexDisplay, setIndexDisplay] = useState(0);
    const [dataList, setDataList] = useState(null);

    const refDot = useRef<any>(null);

    const onRefresh = React.useCallback(() => {
        checkType();
    }, []);

    interface propRender {
        item: any,
        index: number
    };

    const checkType = () => {
        if (listIdSub || listIdTransit){
            setLoading(true)
            switch (type) {
                case "SUBSCRIPTION":
                    getListProduct(listIdSub)
                    break;
                case "TRANSIT":
                    getListProduct(listIdTransit)
                    break;
                default:
                    setLoading(false)
                    break;
            }
        }
    };

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
    const renderItem = (props: propRender) => {
        const { item, index } = props
        return (
            <ItemProduct item={item} index={index} navigation={navigation}/>
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
            getTransition: getTransition,
            getSubscription: getSubscription,
            dataList: dataList,
            subscription_id: subscription_id,
            type: type,
            coupons: coupons,
            isResume: isResume,
            time: orderNumber || estNextPack && format((new Date(estNextPack)).setDate((new Date(estNextPack).getDate() + 7)), 'do MMMM')
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
        checkType();
    }, [listIdSub, listIdTransit]);

    const showDatePicker = () => {
        setDatePickerVisible(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisible(false);
    };

    const handleConfirm = (date: any) => {
        const formatDate = format(new Date(date), 'yyyy-MM-dd')
        const dayOffDate = format(new Date(date), 'do MMMM')
        putEditTime(formatDate);
        setEstNextPack(formatDate)
        hideDatePicker();
    };

    const putEditTime = (date: string) => {
        const body = { date: date }

        Put(`/api/v1/subscriptions/${subscription_id}/update-billing-cycle-anchor`, body)
            .then(response => {
                response.json().then(data => {
                    console.log("data  time",  data)
                    if (data.message) {
                        DropDownHolder.showError("", data.message)
                    } 
                });
            }).catch(err => {
                DropDownHolder.showError("", translate('MESS:error') || "")
                console.log('err', err)
            })
    };

    return (
        <ScrollView style={styles.vFullScreen}>
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
                        {timeEst && timeEst !== '' ? <Text style={styles.sTextEstTrans}>
                            {timeEst && format(new Date(timeEst), 'do MMMM')}
                        </Text> : null}
                        <TouchableOpacity style={styles.btnEdit}
                            onPress={showDatePicker}
                        >
                            {estNextPack && estNextPack !== '' ? <Text style={styles.tEditTit}>
                                {estNextPack && format(new Date(estNextPack), 'do MMMM')}
                            </Text> : null}
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
                <FlatList
                    ref={refDot}
                    contentContainerStyle={{ paddingRight: size[24], paddingLeft: size[16] }}
                    showsHorizontalScrollIndicator={false}
                    data={dataList}
                    renderItem={renderItemDot}
                    horizontal
                    keyExtractor={(item, index) => index.toString()}
                />
                <TouchableOpacity
                    onPress={openManagerPack}
                    style={styles.btnManager}>
                    <Text style={styles.tManage}>Manage my pack</Text>
                </TouchableOpacity>
            </View>
            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
                display="spinner"
                date={new Date(estNextPack)}
                is24Hour={true}
                textColor="#272626"
                headerTextIOS="Pick Est. Delivery"
                minimumDate={new Date(estNextPack)}
            />
        </ScrollView>
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
    },
    sTextEstTrans: {
        fontSize: FONT_14,
        fontFamily: 'NHaasGroteskTXPro',
        color: '#7f8b8f',
        fontWeight: '500'
    }
})