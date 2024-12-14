import React, { useEffect } from 'react';
import { View, Button, Platform, Alert, StyleSheet } from 'react-native';
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { SchedulableTriggerInputTypes } from 'expo-notifications';

// Set notification handler (foreground behavior)
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function App() {
  // Effect to register for notifications on mount
  useEffect(() => {
    registerForPushNotificationsAsync();

    // Listener for incoming notifications
    const notificationListener = Notifications.addNotificationReceivedListener((notification) => {
      console.log('Notification received:', notification);
    });

    // Listener for user interaction with a notification
    const responseListener = Notifications.addNotificationResponseReceivedListener((response) => {
      console.log('Notification response received:', response);
    });

    return () => {
      notificationListener.remove();
      responseListener.remove();
    };
  }, []);

  // Function to register for push notifications
  const registerForPushNotificationsAsync = async (): Promise<void> => {
    if (Device.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;

      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }

      if (finalStatus !== 'granted') {
        Alert.alert('Permission required', 'Failed to get push token for push notifications!');
        return;
      }

      const token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log('Push token:', token);
    } else {
      Alert.alert('Error', 'Push notifications require a physical device.');
    }

    // Configure Android-specific notification channel
    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }
  };

  // Schedule a local notification
  const scheduleNotification = async () => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Hello! 📬',
        body: 'This is a test notification.',
        data: { extraData: 'Some extra data here!' },
      },
      trigger: { type: SchedulableTriggerInputTypes.TIME_INTERVAL,
        seconds: 2,
        repeats:false }, // Notification will trigger in 2 seconds
    });
  };

  return (
    <View style={styles.container}>
      <Button title="Send Notification" onPress={scheduleNotification} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});
