import React, { useRef, useState } from 'react';
import { Image, TextInput, ScrollView, Text, TouchableOpacity, View, StyleSheet, Dimensions, FlatList } from 'react-native';
import { FONT_12, FONT_14, FONT_18, FONT_24 } from '../../../../themes/fontSize';
import { size } from '../../../../themes/size';
import { StatusBarHeight } from '../../../../config/heightStatusbar';

const { width, height } = Dimensions.get('window');

export const ItemPackManage = (props: any) => {
    const {
        navigation,
        item
    } = props;
    const [count, setCount] = useState("1");
    console.log("item", item)

    const onChangeCount = (value: string) => {
        setCount(value)
    }
    return (
        <View style={styles.vContent}>
            <Image
                style={styles.imgProduct}
                source={{ uri: item.productTiny }} />
            <View style={styles.vTitle}>
                <Text style={styles.tName}>{item.name}</Text>
                <Text style={styles.tNote}>{item.booklet_reason}</Text>
                <View style={styles.vRow}>
                    <Text style={styles.tPrice}>{item.price}$</Text>
                    <TextInput
                        style={styles.inputCount}
                        onChangeText={onChangeCount}
                        value={count}
                    />
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    vContent: {
        flex: 1,
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderColor: '#DCD2BD',
        paddingBottom: size[24],
        paddingTop: size[18]
    },
    tTitle: {
        color: '#000',
        fontFamily: 'SolaireDT',
        fontSize: FONT_24
    },
    imgProduct: {
        width: size[64],
        height: size[64],
        borderRadius: size[10],
        backgroundColor: '#EEEDE8'
    },
    vTitle: {
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
    vRow:{
        flexDirection:'row'
    },
    inputCount:{
        marginLeft: size[16],
        marginRight: size[6],
        color: '#272626',
        fontSize: FONT_14,
        fontWeight: '400',
        fontFamily: 'NHaasGroteskTXPro',
        paddingHorizontal: size[10],
        paddingBottom: size[2],
        borderBottomWidth: 1,
        borderColor: '#BED0A2'
    }
})