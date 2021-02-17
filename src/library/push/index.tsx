import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import React, { useState, useEffect, useRef } from 'react';
import { Text, View, Button, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Put } from '../networking/fetch';
import moment from 'moment'
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});
const DAILY_REMINDER = 'DAILY_REMINDER'
const REMINDER_HOUR = 'REMINDER_HOUR'
const REMINDER_ENABLED = 'REMINDER_ENABLED'
const ADVANCE_SCHEDULE = 7
/*
export function Demo() {
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener);
      Notifications.removeNotificationSubscription(responseListener);
    };
  }, []);

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
      }}>
      <Text>Your expo push token: {expoPushToken}</Text>
      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
        <Text>Title: {notification && notification.request.content.title} </Text>
        <Text>Body: {notification && notification.request.content.body}</Text>
        <Text>Data: {notification && JSON.stringify(notification.request.content.data)}</Text>
      </View>
      <Button
        title="Set reminder 0"
        onPress={async () => {
          await setReminderSchedule(0);
        }}
      />
      <Button
        title="Set reminder 20"
        onPress={async () => {
          await setReminderSchedule(20);
        }}
      />
      <Button
        title="Turn off reminders"
        onPress={async () => {
          await disableReminders();
        }}
      />
    </View>
  );
}
*/
export async function initPush(){
  // console.log('initPush')
  await registerForPushNotificationsAsync()
  updateReminderSchedule()
}
async function updateReminderSchedule(){
  // const notifications = await Notifications.getAllScheduledNotificationsAsync()
  // console.log('notifications', notifications)
  //clear any existing
  await Notifications.cancelAllScheduledNotificationsAsync()
  let reminderEnabled = await AsyncStorage.getItem(REMINDER_ENABLED)
  reminderEnabled = reminderEnabled === 'true'
  // console.log('reminderEnabled', reminderEnabled)
  if(reminderEnabled){
    let reminderHour = await AsyncStorage.getItem(REMINDER_HOUR)
    reminderHour = parseInt(reminderHour)
    // console.log('reminderHour', reminderHour)
    var date = new Date();
    var offset = date.getTimezoneOffset() / 60;
    // console.log('offset', offset)
    // const deviceToken = await Notifications.getDevicePushTokenAsync()
    // console.log('deviceToken', deviceToken)
    // const expoToken = registerForPushNotificationsAsync()
    // setExpoPushToken(token);
    // const notifications = await Notifications.getAllScheduledNotificationsAsync()
    // console.log('notifications', notifications)
    let trigger
    // console.log('Platform.OS', Platform.OS)
    // reminderHour = 10
    // console.log('reminderHour', reminderHour)
    const now = moment()
    // console.log('now', now)
    const current = moment()
    let hour = reminderHour
    // let hour = reminderHour + offset
    // if(hour<0) hour += 24
    let minute = 0
    let second = 0
    let millisecond = 0
    // console.log('hour', hour)
    // hour = now.hour()
    // minute = now.minute()
    // second = now.second() + 3
    current.set({hour,minute,second,millisecond});
    // current.hour(hour)
    // current.minute(minute)
    // current.second(second)
    // current.millisecond(0)
    if(current.isBefore(now)) current.add(1, 'days')
    // console.log('current start', current)
    for (let i = 0; i < ADVANCE_SCHEDULE; i++) {
      // trigger = current.toDate()
      // console.log('current', current)
      // console.log('trigger', trigger)
      const seconds = current.diff(now, 'seconds')
      // console.log('seconds', seconds)
      // const minutes = seconds / 60
      // const hours = minutes / 60
      // console.log('hours', hours)
      trigger = {seconds}
      // console.log('trigger', trigger)
      await Notifications.scheduleNotificationAsync({
        // identifier:DAILY_REMINDER,
        content: {
          title: "Time to take your vitamins",
          // body: `trigger ${i}`,
          data: { data: 'goes here' },
        },
        trigger,
      });
      // current.add(10, 'seconds')
      current.add(1, 'days')
    }
    // const next = await Notifications.getNextTriggerDateAsync()
    // console.log('next', next)
  }
}
export async function disableReminders(){
  await Notifications.cancelAllScheduledNotificationsAsync()
  await AsyncStorage.setItem(REMINDER_ENABLED, "false")
}
export async function setReminderSchedule(hour:int){
  await AsyncStorage.setItem(REMINDER_HOUR, hour.toString())
  await AsyncStorage.setItem(REMINDER_ENABLED, "true")
  updateReminderSchedule()
}
export async function getReminderSchedule(){
  let hour = await AsyncStorage.getItem(REMINDER_HOUR)
  hour = parseInt(hour)
  if(isNaN(hour)) hour = 0
  return hour
}
export async function getReminderEnabled(){
  const enabled = await AsyncStorage.getItem(REMINDER_ENABLED)
  return (enabled === 'true')
}

async function registerForPushNotificationsAsync() {
  let token;
  if (Constants.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      console.log('Failed to get push token for push notification!');
      return;
    }
    // token = (await Notifications.getExpoPushTokenAsync()).data;
    // console.log('token', token)
  } else {
    console.log('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return token;
}
export async function updatePushToken(){
  // console.log('updatePushToken')
  if (Constants.isDevice) {
    const token = (await Notifications.getExpoPushTokenAsync()).data;
    // console.log('token', token)
    if(token){
      try{
        const response = await Put(`/api/v1/users/me/update`, {push_token:token})
        // console.log('response', response)
        const body = await response.json()
        // console.log('body', body)
      }catch(e){
        console.log('e', e)

      }
    }
  }
}
