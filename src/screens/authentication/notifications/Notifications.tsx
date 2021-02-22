import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableWithoutFeedback, Image } from 'react-native';
import { Screen } from '../../../library/components/screen';
import { styles } from './styles';
import { trackEvent, trackCurrentScreen } from '../../../library/analytics-tracking';
import { getReminderSchedule, getMinuteReminderSchedule, setReminderSchedule, getReminderEnabled, disableReminders} from '../../../library/push';
import { Switch } from 'react-native-paper';
import { CustomScrollPicker } from '../../../library/components/customScrollPicker';

interface NotificationsProps {
    navigation: any,
    actionLogout: any,
    route: any
}

export const Notifications = (props: NotificationsProps) => {
    const { navigation, route } = props;

    const onPressGoToMenu = () => {
        navigation && navigation.openDrawer();
    }
    const [reminderHour, setReminderHour] = useState(1)
    const [reminderMinute, setReminderMinute] = useState(0)
    const [reminderEnabled, setReminderEnabled] = useState(false)

    useEffect(()=>{
        trackCurrentScreen('Notifications');
        async function getSettings(){
          const hour = await getReminderSchedule()
          const minute = await getMinuteReminderSchedule()
          const enabled = await getReminderEnabled()
          // console.log('enabled', enabled)
          // console.log('hour', hour)
          setReminderHour(hour)
          setReminderMinute(minute)
          setReminderEnabled(enabled)
        }
        getSettings();
    },[]);

    const changeReminderEnabled = (val: any) => {
      // console.log('changeReminderEnabled', val)
      setReminderEnabled(val)
      if(val){
        setReminderSchedule(reminderHour, reminderMinute)
      }else{
        disableReminders()
      }
    };

    const changeReminderHour = (val: any) =>{
      console.log('changeReminderHour', val)
      setReminderHour(val)
      setReminderSchedule(val, reminderMinute)
    }
    const changeReminderMinute = (val: any) =>{
      console.log('changeReminderMinute', val)
      setReminderMinute(val)
      setReminderSchedule(reminderHour, val)
    }

    return (
        <Screen
            isScroll={false}
            hidden={false}
            backgroundColor={'transparent'}
            forceInset={{ bottom: 'never', top: 'never' }}
            draw={true}
        >
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <TouchableWithoutFeedback onPress={onPressGoToMenu}
                    style={{
                        zIndex: 2
                    }}
                >
                    <Image
                        source={require('../../../../assets/images/Menu.png')}
                        style={styles.vImgMenu}
                    />
                </TouchableWithoutFeedback>
                <Text>Notification settings</Text>
                <Text>Reminder enabled {reminderEnabled}</Text>
                <Switch value={reminderEnabled} onValueChange={changeReminderEnabled} />

          <CustomScrollPicker
            setTimeSelect={changeReminderHour}
            setMinuteSelect={changeReminderMinute}
          />
            </View>
        </Screen>
    );
}
