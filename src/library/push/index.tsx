import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import React, { useState, useEffect, useRef } from 'react';
import { Text, View, Button, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
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
const REMINDER_MINUTE = 'REMINDER_MINUTE'
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
  console.log('initPush')
  await registerForPushNotificationsAsync()
  // updateReminderSchedule()
}
async function updateReminderSchedule(){
  const notifications = await Notifications.getAllScheduledNotificationsAsync()
  console.log('notifications', notifications)
  //clear any existing
  await Notifications.cancelAllScheduledNotificationsAsync()
  let reminderEnabled = await AsyncStorage.getItem(REMINDER_ENABLED)
  const checkReminderEnabled = reminderEnabled === 'true'
  if (checkReminderEnabled){
    let reminderHour = await AsyncStorage.getItem(REMINDER_HOUR)
    let reminderMinute = await AsyncStorage.getItem(REMINDER_MINUTE)
    const hour = parseInt(reminderHour || "1")
    const minute = parseInt(reminderMinute || "0")
    console.log('reminderHour', hour)
    console.log('reminderMinute', minute)
    // const deviceToken = await Notifications.getDevicePushTokenAsync()
    // console.log('deviceToken', deviceToken)
    // const expoToken = registerForPushNotificationsAsync()
    // setExpoPushToken(token);
    // const notifications = await Notifications.getAllScheduledNotificationsAsync()
    // console.log('notifications', notifications)
    let trigger
    console.log('Platform.OS', Platform.OS)
    const now = moment()
    const current = moment()
    let second = 0
    // hour = now.hour()
    // minute = now.minute()
    // second = now.second() + 3
    current.hour(hour)
    current.minute(minute)
    current.second(second)
    current.millisecond(0)
    if(current.isBefore(now)) current.add(1, 'days')
    for (let i = 0; i < ADVANCE_SCHEDULE; i++) {
      // trigger = current.toDate()
      console.log('current', current)
      // console.log('trigger', trigger)
      const seconds = current.diff(now, 'seconds')
      console.log('seconds', seconds)
      trigger = {seconds}
      console.log('trigger', trigger)
      await Notifications.scheduleNotificationAsync({
        // identifier:DAILY_REMINDER,
        content: {
          title: "Time to take your vitamins",
          body: `trigger ${i}`,
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
export async function setReminderSchedule(hour: number, minute: number){
  await AsyncStorage.setItem(REMINDER_HOUR, hour.toString());
  await AsyncStorage.setItem(REMINDER_MINUTE, minute.toString())

  await AsyncStorage.setItem(REMINDER_ENABLED, "true")
  updateReminderSchedule()
}

export async function getReminderSchedule(){
  let hourAsync = await AsyncStorage.getItem(REMINDER_HOUR)
  let hour = parseInt(hourAsync || "0")
  if(isNaN(hour)) hour = 0
  return hour
}
export async function getMinuteReminderSchedule() {
  let minuteAsync = await AsyncStorage.getItem(REMINDER_MINUTE)
  let minute = parseInt(minuteAsync || "0")
  if (isNaN(minute)) minute = 0
  return minute
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
    // console.log(token);
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
