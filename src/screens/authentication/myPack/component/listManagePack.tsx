import React, { useRef, useState } from 'react';
import { Image, ImageBackground, ScrollView, Text, TouchableOpacity, View, StyleSheet, Dimensions, FlatList } from 'react-native';
import { FONT_14, FONT_24 } from '../../../../themes/fontSize';
import { size } from '../../../../themes/size';
import { StatusBarHeight } from '../../../../config/heightStatusbar';
import { ItemPackManage } from './itemPackManage';

const { width, height } = Dimensions.get('window');

export const CustomListManagePack = (props: any) => {
    const {
        navigation,
        title,
        dataPack,
        isHideBorder,
        listPrice,
        setListPrice
    } = props;

    interface ListMangeProps {
        item: any,
        index: number
    };

    const renderItem = (props: ListMangeProps) => {
        const { item, index } = props;

        if (isHideBorder) {
            return (
                <ItemPackManage
                    listPrice={listPrice}
                    setListPrice={setListPrice}
                    item={item} isHideBorder={index == dataPack.length - 1 ? true : false} />
            )
        } else {
            return (
                <ItemPackManage
                    listPrice={listPrice}
                    setListPrice={setListPrice}
                    item={item} />
            )
        }
    }

    return (
        <View style={styles.vContent}>
            <Text style={styles.tTitle}>{title}</Text>
            <View style={styles.vLine} />
            <FlatList
                contentContainerStyle={{ paddingVertical: size[16] }}
                showsVerticalScrollIndicator={false}
                data={dataPack}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
            />
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