// // D:\Reactive-Native\folkie\app\(tabs)\index.tsx
// import React, { useEffect,useState } from 'react';
// import { View, Button, Platform, Alert, StyleSheet,Text, TouchableOpacity,StatusBar } from 'react-native';
// import * as Notifications from 'expo-notifications';
// import * as Device from 'expo-device';
// import { SchedulableTriggerInputTypes } from 'expo-notifications';

// // Set notification handler (foreground behavior)
// Notifications.setNotificationHandler({
//   handleNotification: async () => ({
//     shouldShowAlert: true,
//     shouldPlaySound: false,
//     shouldSetBadge: false,
//   }),
// });

// type PushToken = string | null;

// export default function App() {
//   // Effect to register for notifications on mount
//   // useEffect(() => {
//   //   registerForPushNotificationsAsync();

//   //   // Listener for incoming notifications
//   //   const notificationListener = Notifications.addNotificationReceivedListener((notification) => {
//   //     console.log('Notification received:', notification);
//   //   });

//   //   // Listener for user interaction with a notification
//   //   const responseListener = Notifications.addNotificationResponseReceivedListener((response) => {
//   //     console.log('Notification response received:', response);
//   //   });

//   //   return () => {
//   //     console.log('Removing notification listeners...🔇🔇🔇');
//   //     notificationListener.remove();
//   //     responseListener.remove();
//   //     // Notifications.setNotificationChannels([]); // Reset all channels
//   //   };
//   // }, []);

//   // Function to register for push notifications
//   // const registerForPushNotificationsAsync = async (): Promise<void> => {
//   //   if (Device.isDevice) {
//   //     const { status: existingStatus } = await Notifications.getPermissionsAsync();
//   //     let finalStatus = existingStatus;

//   //     if (existingStatus !== 'granted') {
//   //       const { status } = await Notifications.requestPermissionsAsync();
//   //       finalStatus = status;
//   //     }

//   //     if (finalStatus !== 'granted') {
//   //       Alert.alert('Permission required', 'Failed to get push token for push notifications!',
//   //         [{ text: 'OK', onPress: () => console.log('OK Pressed') }]
//   //       );
//   //       return;
//   //     }

//   //     const token = (await Notifications.getExpoPushTokenAsync()).data;
//   //     console.log('Push token:', token);
//   //   } else {
//   //     Alert.alert('Error', 'Push notifications require a physical device.',
//   //       [{ text: 'OK', onPress: () => console.log('OK Pressed') }]
//   //     );
//   //   }

//   //   // Configure Android-specific notification channel
//   //   if (Platform.OS === 'android') {
//   //     Notifications.setNotificationChannelAsync('default', {
//   //       name: 'General Notifications',
//   //       importance: Notifications.AndroidImportance.MAX,
//   //       vibrationPattern: [0, 250, 250, 250],
//   //       lightColor: '#76ABAE',
//   //     });
//   //   }
//   // };

//   // Schedule a local notification
//   // const scheduleNotification = async () => {
//   //   console.log('Scheduling notification...🚀🚀🚀');
//   //   await Notifications.scheduleNotificationAsync({
//   //     content: {
//   //       title: 'Hello! fahim-ux',
//   //       body: 'This is a test notification.',
//   //       data: { extraData: 'Some extra data here!' },
//   //     },
//   //     trigger: { 
//   //       type: SchedulableTriggerInputTypes.TIME_INTERVAL,
//   //       seconds: 2,
//   //       repeats:false }, // Notification will trigger in 2 seconds
//   //   });
//   // };
//   const [expoPushToken, setExpoPushToken] = useState<PushToken>(null);
//   let notificationListener: any;
//   let responseListener: any;
//   useEffect(() => {
//     console.log('Listing Channels....🚀🚀🚀');
//     listAllChannels();

//     const removeListeners = () => {
//       console.log('Cleaning up old notification listeners... 🔇');
//       if (notificationListener) notificationListener.remove();
//       if (responseListener) responseListener.remove();
//     };

//     registerForPushNotificationsAsync().then((token) => {
//       if (token) {
//         setExpoPushToken(token);
//         console.log('Expo Push Token:', token);
//       }
//     });

//     // Listener for incoming notifications
//     const notificationListener = Notifications.addNotificationReceivedListener((notification) => {
//       console.log('Notification received:', notification);
//     });

//     // Notifications.setNotificationChannelAsync('expo-experience', {
//     //   name: 'Default',
//     //   importance: Notifications.AndroidImportance.DEFAULT,
//     // });
//     // Listener for user interactions with notifications
//     const responseListener = Notifications.addNotificationResponseReceivedListener((response) => {
//       console.log('User interacted with notification:', response);
//     });

//     return () => {
//       // Cleanup listeners on unmount
//       // notificationListener.remove();
//       // responseListener.remove();
//       if (notificationListener) {
//         Notifications.removeNotificationSubscription(notificationListener);
//       }
//       if (responseListener) {
//         Notifications.removeNotificationSubscription(responseListener);
//       }
//       console.log('Notification listeners cleaned up!');
//     };

//   },[]);
//   const scheduleNotificationOnExistingChannel = async () => {
//     try {
//       await Notifications.scheduleNotificationAsync({
//         content: {
//           title: 'Hello from Existing Channel! Fahim ☠️😊',
//           body: 'This notification uses the existing channel.',
//         },
//         trigger: null, // Send immediately
//         // android: {
//         //   channelId: 'expo-experience', // Use the existing channel ID
//         // },
//       });
//       console.log('Notification scheduled on the existing channel.');
//     } catch (error) {
//       console.error('Error scheduling notification:', error);
//     }
//   };
//   const registerForPushNotificationsAsync = async () => {
//     try {
//       // Check if the app is running on a physical device
//       if (!Device.isDevice) {
//         Alert.alert('Error', 'Push notifications are only supported on physical devices.');
//         return null;
//       }

//       // Request permission to send notifications
//       const { status: existingStatus } = await Notifications.getPermissionsAsync();
//       let finalStatus = existingStatus;

//       if (existingStatus !== 'granted') {
//         const { status } = await Notifications.requestPermissionsAsync();
//         finalStatus = status;
//       }

//       if (finalStatus !== 'granted') {
//         Alert.alert('Permission required', 'Push notifications permission is not granted.');
//         return null;
//       }

//       // Fetch the Expo push token
//       const token = (await Notifications.getExpoPushTokenAsync()).data;
//       return token;
//     } catch (error) {
//       console.error('Error registering for push notifications:', error);
//       return null;
//     }
//   };
//   const listAllChannels = async () => {
//     if (Platform.OS === 'android') {
//       const channels = await Notifications.getNotificationChannelsAsync();
//       console.log('Notification Channels:', channels);
  
//       channels.forEach((channel) => {
//         console.log(`Channel ID: ${channel.id}, Name: ${channel.name}`);
//       });
//     } else {
//       console.log('Notification channels are only supported on Android.');
//     }
//   };
//   return (
//     <>
//     <StatusBar barStyle="light-content" backgroundColor="#F97300"/>
//     <View style={styles.container}>
//       {/* <Button title="Send Notification" onPress={scheduleNotification} /> */}
//       {/* <Button title="Alert"  /> */}
//       <TouchableOpacity style={styles.button} onPress={scheduleNotificationOnExistingChannel}>
//         <Text style={styles.buttonText}>Alert</Text>
//       </TouchableOpacity>
//     </View>
//     </>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#E2DFD0',
//   },
//   button: {
//     backgroundColor: '#4CAF50', // Green background
//     paddingVertical: 12,
//     paddingHorizontal: 24,
//     borderRadius: 8, // Rounded corners
//     shadowColor: '#000', // Shadow for iOS
//     shadowOpacity: 0.2,
//     shadowOffset: { width: 0, height: 2 },
//     shadowRadius: 4,
//     elevation: 5, // Shadow for Android
//   },
//   buttonText: {
//     color: '#FFFFFF', // White text
//     fontSize: 16,
//     fontWeight: 'bold',
//     textAlign: 'center',
//   },
// });


{/* <ScrollView > */}
      {/* <View style={styles.container}>
        <ImageBackground source={require('@/assets/images/login.png')} style={styles.background}>
        <View style={styles.logo}>
          <Image source={require('@/assets/images/folkie-5.png')} style={styles.image}/>
        </View>
        <View></View>
        <View style={styles.form}>
          <Image source={require('@/assets/images/login-2.png')} style={styles.box} />
        <View>
          <Text style={styles.word}>SignUp!</Text>
        </View>
        </View>
        </ImageBackground>
      </View> */}
    {/* </ScrollView> */}