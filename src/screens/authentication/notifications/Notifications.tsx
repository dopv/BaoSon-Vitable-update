import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableWithoutFeedback, Image } from 'react-native';
import { Screen } from '../../../library/components/screen';
import { styles } from './styles';
import { trackEvent, trackCurrentScreen } from '../../../library/analytics-tracking';
import {getReminderSchedule, setReminderSchedule, getReminderEnabled, disableReminders} from '../../../library/push';
import NumberPlease from "react-native-number-please";
import { Switch } from 'react-native-paper';

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
    const [reminderHour, setReminderHour] = useState(0)
    const [reminderEnabled, setReminderEnabled] = useState(false)
    useEffect(()=>{
        trackCurrentScreen('Notifications');
        async function getSettings(){
          const hour = await getReminderSchedule()
          const enabled = await getReminderEnabled()
          // console.log('enabled', enabled)
          // console.log('hour', hour)
          setReminderHour(hour)
          setReminderEnabled(enabled)
          setHourValue([{id:'hour', value:hour}])
        }
        getSettings();
    },[])
    function changeReminderEnabled(val){
      // console.log('changeReminderEnabled', val)
      setReminderEnabled(val)
      if(val){
        setReminderSchedule(reminderHour)
      }else{
        disableReminders()
      }
    }
    function changeReminderHour(val){
      console.log('changeReminderHour', val)
      const hour = val[0].value
      console.log('hour', hour)
      setHourValue(val)
      setReminderHour(hour)
      setReminderSchedule(hour)
    }
    const [hourValue, setHourValue] = useState([{id:'hour', value:0}])
    const hourNumbers = [{id:'hour',min:0, max:12}]
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
                {/* <View>
                  <NumberPlease
                    digits={hourNumbers}
                    values={hourValue}
                    onChange={changeReminderHour}
                  />
                  <Text>: 00</Text>
                </View> */}
            </View>
        </Screen>
    );
}
