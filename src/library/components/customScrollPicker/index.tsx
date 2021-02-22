import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Dimensions, TouchableOpacity, ScrollView } from 'react-native';
import { styles } from './styles';
import ScrollPicker from 'react-native-picker-scrollview';
import { size } from '../../../themes/size';

const {width, height} = Dimensions.get('window');

export const CustomScrollPicker = (props: any) => {
    const { setTimeSelect, setMinuteSelect} = props;
    const [dataHour, setDataHour] = useState([]);
    const [minutes, setMinutes] = useState([]);

    useEffect(() => {
        const listHour: any = [];
        const listMinutes: any = [];
        for (let i = 1; i <= 24; i++) {
            listHour.push(i)
        };
        for (let i = 0; i < 60; i++) {
            listMinutes.push(i)
        };
        setDataHour(listHour);
        setMinutes(listMinutes);

    }, []);

    return(
        <View style={styles.vSelectTime}>
            <View style={styles.vListTime}>
                <ScrollPicker
                    dataSource={dataHour}
                    selectedIndex={0}
                    itemHeight={width * 0.15}
                    wrapperHeight={height * 0.2}
                    wrapperColor={'transparent'}
                    highlightColor={'transparent'}
                    renderItem={(data: any, index: number, isSelected: boolean) => {
                        if (isSelected) {
                            return (
                                <Text style={styles.tItemTimePicker}>{('0' + data).slice(-2)}</Text>
                            )
                        } else {
                            return (
                                <Text style={styles.tItemTime}>{('0' + data).slice(-2)}</Text>
                            )
                        }
                    }}
                    onValueChange={(data: any, selectedIndex: number) => {
                        setTimeSelect && setTimeSelect(data)
                    }}
                />
            </View>
            <Text style={[styles.tMinute, { marginRight: size[28], marginLeft: size[28] }]}>:</Text>
            <View style={styles.vListTime}>
                <ScrollPicker
                    dataSource={minutes}
                    selectedIndex={0}
                    itemHeight={width * 0.15}
                    wrapperHeight={height * 0.2}
                    wrapperColor={'transparent'}
                    highlightColor={'transparent'}
                    renderItem={(data: any, index: number, isSelected: boolean) => {
                        if (isSelected) {
                            return (
                                <Text style={styles.tItemMinutePicker}>{('0' + data).slice(-2)}</Text>
                            )
                        } else {
                            return (
                                <Text style={styles.tItemTime}>{('0' + data).slice(-2)}</Text>
                            )
                        }
                    }}
                    onValueChange={(data: any, selectedIndex: number) => {
                        setMinuteSelect && setMinuteSelect(data)
                    }}
                />
            </View>
        </View>
    )
}