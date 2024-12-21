import React from 'react';
import {  Image,View,ScrollView ,StyleSheet,ImageBackground,StatusBar,Text,Button,Alert,TouchableOpacity} from 'react-native';

export default function HomeScreen() {
  const sendalert = () =>{
    Alert.alert(
      'Name',
      `Hii 💟 fahim-ux this side `,
      [
        { text: 'OK', onPress: () => console.log('OK Pressed') },
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel'
        },
        { text: 'Delete', onPress: () => console.log('Delete Pressed'), style: 'destructive' },
      ]
    )
  }
  return (
    <>
    <StatusBar barStyle="light-content" backgroundColor="#222831"/>
    
        <View style={styles.container1}>
              {/* <Button title="Send Notification" onPress={scheduleNotification} /> */}
              {/* <Button title="Alert"  /> */}
              <TouchableOpacity style={styles.button} onPress={sendalert}>
                <Text style={styles.buttonText}>Alert</Text>
              </TouchableOpacity>
        </View>
    </>
    
  );
}

const styles = StyleSheet.create({
  background:{
    // flex: 1,
    // resizeMode: 'cover',
    width: 385,
    height: 780,
    display: 'flex',
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 1,
  },
  container:{
    display: 'flex',
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EEEEEE',
  },
  image:{
    width: 80,
    height: 80,
    borderRadius:2,
    aspectRatio:1.3
  },
  logo:{
    width: 80,
    height: 60,
    display: 'flex',
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 10,
    left: 157,
  },
  form:{
    width: 200,
    height: 500,
    backgroundColor: '#FFFFFF',
    // borderRadius: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 170,
    left: 0,
    borderTopRightRadius: 50,
    borderBottomRightRadius: 50,
    shadowColor: "#000",
    shadowOffset: { width: 5, height: 5 }, // Shadow to the right and bottom
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 10,
    overflow: 'hidden',
  },
  box:{
    width: 200,
    height: 200,
    position: 'absolute',
    top: 400,
  },
  word:{
    fontSize: 20,
    color: '#FFFFFF',
    position: 'absolute',
    top: 0,
    left: 100,
  },
  container1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EEEEEE',
  },
  button: {
    backgroundColor: '#76ABAE', // Green background
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8, // Rounded corners
    shadowColor: '#000', // Shadow for iOS
    shadowOpacity: 0.2,
    shadowOffset: { width: 2, height: 5 },
    shadowRadius: 10,
    elevation: 5, // Shadow for Android
  },
  buttonText: {
    color: '#222831', // White text
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  cancel:{
    color: '#FF204E',
    fontSize: 16,
    fontWeight: 'bold',
  }
});
