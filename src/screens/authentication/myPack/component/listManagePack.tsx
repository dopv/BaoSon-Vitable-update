import React, { useRef } from 'react';
import { Image, ImageBackground, ScrollView, Text, TouchableOpacity, View, StyleSheet, Dimensions, FlatList } from 'react-native';
import { FONT_14, FONT_24 } from '../../../../themes/fontSize';
import { size } from '../../../../themes/size';
import { StatusBarHeight } from '../../../../config/heightStatusbar';

const { width, height } = Dimensions.get('window');

export const CustomListManagePack = (props: any) => {
    const {
        navigation,
        title,
        dataPack
    } = props;

    interface ListMangeProps {
        item: any,
        index: number
    };

    const renderItem = (props: ListMangeProps) => {
        return (
            <View>
                
            </View>
        )
    }

    return (
        <View style={styles.vContent}>
           <Text style={styles.tTitle}>{title}</Text>
            <FlatList
                contentContainerStyle={{ paddingRight: size[24], paddingLeft: size[16] }}
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
    },
    tTitle:{
        color:'#000',
        fontFamily:'SolaireDT',
        fontSize: FONT_24
    }
})