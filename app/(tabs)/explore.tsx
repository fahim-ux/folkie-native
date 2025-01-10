import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, Alert,StatusBar } from 'react-native';
import * as Notifications from 'expo-notifications';
// import { messaging } from '@/firebaseConfig';


export default function HomeScreen() {

  const [expoPushToken, setExpoPushToken] = useState<string | null>(null);
  useEffect(() => {
    // console.log('FCM Notifications.......🚀🚀🚀');
    // Ask for notification permissions
    const requestNotificationPermission = async () => {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status === 'granted') {
        // Get the expo push token
        const token = await Notifications.getExpoPushTokenAsync();
        setExpoPushToken(token.data);
        // console.log('FCM 🤞 Expo push token:', token.data);
      } else {
        Alert.alert('Permission required', 'Please allow push notifications');
      }
    };

    requestNotificationPermission();

    // Set up listener for receiving notifications
    const foregroundSubscription = Notifications.addNotificationReceivedListener(
      (notification) => {
        // console.log('Notification received in foreground:', notification);
      }
    );

    const backgroundSubscription = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        // console.log('Notification response:', response);
      }
    );

    return () => {
      foregroundSubscription.remove();
      backgroundSubscription.remove();
    };
  }, []);



  // Send a notification to Firebase (FCM)
  const sendNotificationToFCM = async () => {
    if (!expoPushToken) {
      // console.log('No Expo push token available');
      return;
    }

    const message = {
      to: expoPushToken,
      sound: 'default',
      title: 'Test Notification 😁',
      body: 'Hiii 💕 from FCM! ☁️',
      data: { someData: `I'm Fahim 🤵` },
    };

    try {
      // Send push notification to Firebase FCM
      const response = await fetch('https://exp.host/--/api/v2/push/send', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Accept-Encoding': 'gzip, deflate',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(message),
      });

      const data = await response.json();
      // console.log('Notification sent 🚀 :', data);
    } catch (error) {
      console.error('Error sending notification:', error);
    }
  };
  
  return (
    <>
    <StatusBar barStyle="light-content" backgroundColor="#F97300"/>
    <View style={styles.container}>
      <Text>Expo Push Notification Example</Text>
      <Button title="Send Push Notification" onPress={sendNotificationToFCM} />
    </View>
    </>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
});
