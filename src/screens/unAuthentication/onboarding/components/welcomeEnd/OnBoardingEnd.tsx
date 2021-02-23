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
import { CustomScrollPicker } from '../../../../../library/components/customScrollPicker';
import { useContainer } from '../../../../../store/store';
import { Get } from '../../../../../library/networking/fetch';

const { width, height } = Dimensions.get('window');

export const OnBoardingEnd = (props: any) => {
    const { route } = props;
    const { data } = route.params;
    const [timeSelect, setTimeSelect] = useState(1);
    const [minuteSelect, setMinuteSelect] = useState(0);
    const [dataTime, setDataTime] = useState([]);
    const actionLogin = useContainer(container => container.loginAction);
    const setUserInfo = useContainer(container => container.getUserInfoAction);

    const getUserInfo = (token: string) => {
        Get(`/api/v1/me/profile`).then(response => {
            response.json().then(data => {
                setUserInfo(data.data, token);
            });
        }).catch(err => {
            console.log('err', err);
        })
    }
    const onReminder = () => {
        if (timeSelect || minuteSelect) {
            setReminderSchedule(timeSelect, minuteSelect)
            AsyncStorage.setItem(TOKEN, JSON.stringify(data.access_token));
            actionLogin(data || null);
            // actionLogin && actionLogin(data || null);
            getUserInfo(data.access_token);

        } else {
            DropDownHolder.showWarning("", translate('UNAUTHENTIC:BOARDING:NULL_HOUR') || "");
        }
        // AsyncStorage.setItem(IS_ONBOARDING, JSON.stringify("Open OnBoarding"));

    };
    const onNotTime = () => {
        // AsyncStorage.setItem(IS_ONBOARDING, JSON.stringify("Open OnBoarding"));
        AsyncStorage.setItem(TOKEN, JSON.stringify(data.access_token));
        actionLogin(data || null);
        getUserInfo(data.access_token);

    };


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
                <CustomScrollPicker
                    setTimeSelect={setTimeSelect}
                    setMinuteSelect={setMinuteSelect}
                />
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