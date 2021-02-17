import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Dimensions, TouchableOpacity, ScrollView } from 'react-native';
import { size } from '../../../../../themes/size';
import { styles } from './styles';
import ScrollPicker from 'react-native-picker-scrollview';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { IS_ONBOARDING, TOKEN } from '../../../../../common/keyStore';
import { setReminderSchedule } from '../../../../../library/push';
import DropDownHolder from '../../../../../library/utils/dropDownHolder';
import { translate } from '../../../../../library/utils/i18n/translate';
import { useContainer } from '../../../../../store/store';

const { width, height } = Dimensions.get('window');

export const OnBoardingEnd = (props: any) => {
    const { route } = props;
    const { data } = route.params;
    const [timeSelect, setTimeSelect] = useState(1);
    const [dataTime, setDataTime] = useState([]);
    const actionLogin = useContainer(container => container.loginAction);


    const onReminder = () => {
        if (timeSelect) {
            setReminderSchedule(timeSelect)
            AsyncStorage.setItem(TOKEN, JSON.stringify(data.access_token));
            actionLogin(data || null);
        } else {
            DropDownHolder.showWarning("", translate('UNAUTHENTIC:BOARDING:NULL_HOUR'));
        }
        // AsyncStorage.setItem(IS_ONBOARDING, JSON.stringify("Open OnBoarding"));

    };
    const onNotTime = () => {
        // AsyncStorage.setItem(IS_ONBOARDING, JSON.stringify("Open OnBoarding"));
        AsyncStorage.setItem(TOKEN, JSON.stringify(data.access_token));
        actionLogin(data || null);
    };

    useEffect(() => {
        const list: any = [];
        for (let i = 1; i <= 24; i++) {
            list.push(i)
        };
        setDataTime(list);
    }, []);

    return (
        <ScrollView style={styles.sFullScreen}>
            <View style={styles.viewBackground}>
                <View style={styles.viewTitle}>
                    <Text style={styles.textTitle}>{translate('UNAUTHENTIC:BOARDING:TITLE_END')}</Text>
                </View>
                <View style={styles.viewContent1}>
                    <Text style={styles.textContent}>{translate('UNAUTHENTIC:BOARDING:CONTENT_END')}</Text>
                </View>
                <View style={styles.viewContent2}>
                    <Text style={styles.textContent}>{translate('UNAUTHENTIC:BOARDING:TIP_END')}</Text>
                </View>
                <View style={styles.vSelectTime}>
                    <View style={styles.vListTime}>
                        <ScrollPicker
                            dataSource={dataTime}
                            selectedIndex={0}
                            itemHeight={width * 0.15}
                            wrapperHeight={height * 0.2}
                            wrapperColor={'transparent'}
                            highlightColor={'transparent'}
                            renderItem={(data: any, index: number, isSelected: boolean) => {
                                if (isSelected) {
                                    return (
                                        <Text style={styles.tItemTimePicker}>{data}</Text>
                                    )
                                } else {
                                    return (
                                        <Text style={styles.tItemTime}>{data}</Text>
                                    )
                                }
                            }}
                            onValueChange={(data: any, selectedIndex: number) => {
                                setTimeSelect(data)
                            }}
                        />
                    </View>
                    <Text style={[styles.tMinute, { marginRight: size[28], marginLeft: size[26] }]}>:</Text>
                    <Text style={styles.tMinute}>00</Text>
                </View>
                <TouchableOpacity
                    onPress={onReminder}
                    style={styles.btnReminder}>
                    <Text style={styles.tReminder}>{translate('UNAUTHENTIC:BOARDING:REMINDER_END')}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={onNotTime}
                    style={styles.btnNotTime}>
                    <Text style={styles.tNotTime}>{translate('UNAUTHENTIC:BOARDING:NOT_REMINDER_END')}</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}