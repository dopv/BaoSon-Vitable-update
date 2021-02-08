import React, { useState, useEffect } from 'react';
import { Image, FlatList, Text, TouchableOpacity, TouchableWithoutFeedback, View, StyleSheet, Dimensions, RefreshControl } from 'react-native';
import { translate } from '../../library/utils/i18n/translate';
import { FONT_14 } from '../../themes/fontSize';
import { size } from '../../themes/size';
import SvgUri from "expo-svg-uri";
import { Images } from '../../themes/pathImage';
import { DETAIL } from '../../navigation/TypeScreen';

const { width, height } = Dimensions.get('window');

interface propRender {
    item: any,
    index: number,
    navigation: any
};

export const ItemProduct = (props: propRender) => {
    const { item, index, navigation } = props
    var detail = item;

    if (item.product && item.product.data) {
        detail = item.product.data
    }
    var categories = detail.categories.data;

    const renderItemCategories = (props: propRender) => {
        const { item, index } = props
        const image = item.slug;
        const uri = Images && Images[image] && Images[image].uri && Images[image].uri || null;
        return (
            <View style={!uri ? styles.vImageNull : styles.vIconCategory}>
                {/* { item.image && item.image.includes('png') ?
                    <Image source={uri} style={styles.imgCategory} />
                    : */}
                <SvgUri
                    width={size[24]}
                    height={size[24]}
                    source={uri}
                />
                {/* } */}
            </View>
        )

    };
    const goDetail = () => {
        navigation && navigation.navigate(DETAIL)
    };
    
    return (
        <View style={styles.vItem}>
            <Image
                style={styles.imgBanner}
                source={{ uri: detail.productFeatureBannerMobile }} />
            <View style={styles.vContent}>
                <View style={styles.vCategory}>

                    <FlatList
                        scrollEnabled={false}
                        numColumns={categories && categories.length > 0 && categories.length || undefined}
                        showsHorizontalScrollIndicator={false}
                        horizontal={false}
                        data={categories}
                        renderItem={renderItemCategories}
                        keyExtractor={(item, index) => index.toString()}
                    />

                </View>
                <View style={{ marginRight: size[30] }}>
                    <Text style={styles.tName}>{detail.name}</Text>
                    <View style={styles.vLine} />
                    <Text
                        style={styles.tContent}
                        numberOfLines={3}
                        ellipsizeMode='clip'
                    >
                        {detail.description}
                    </Text>
                    <TouchableOpacity onPress={goDetail} style={styles.btnMore}>
                        <Text style={styles.tMore} >Learn more</Text>
                    </TouchableOpacity>
                </View>

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    vFullScreen: {
        flex: 1,
        marginVertical: size[10]
    },
    vItem: {
        width: width / 1.3,
        marginLeft: size[8],
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
        fontFamily: 'SolaireDT',
    },
    vContent: {
        marginVertical: size[24],
        marginLeft: size[16],
    },
    vCategory: {
        width: '100%',
        marginBottom: size[8],
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
    imgCategory: {
        width: size[24],
        height: size[24]
    },
    vIconCategory: {
        paddingRight: size[8],
    },
    vImageNull: {
        width: size[24],
        height: size[24],
        borderRadius: size[100],
        borderWidth: 1,
        borderColor: '#292424',
        marginRight: size[8]
    }
})