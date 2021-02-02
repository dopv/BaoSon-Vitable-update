import React, { useRef } from 'react';
import { Image, ImageBackground, ScrollView, Text, TouchableOpacity, View, StyleSheet, Dimensions, FlatList } from 'react-native';
import { FONT_14, FONT_24 } from '../../../../themes/fontSize';
import { size } from '../../../../themes/size';
import { StatusBarHeight } from '../../../../config/heightStatusbar';

const { width, height } = Dimensions.get('window');

export const ItemPackManage = (props: any) => {
    const {
        navigation,
    } = props;

    return (
        <View style={styles.vContent}>
            
        </View>
    )
}

const styles = StyleSheet.create({
    vContent: {
        flex: 1,
    },
    tTitle: {
        color: '#000',
        fontFamily: 'SolaireDT',
        fontSize: FONT_24
    }
})