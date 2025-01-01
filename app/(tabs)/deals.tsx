import React from 'react';
import {  Image,View,ScrollView ,StyleSheet,ImageBackground,StatusBar,Text,Button,Alert,TouchableOpacity} from 'react-native';
import { db } from '@/firebaseConfig';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { useState,useEffect } from 'react';

type Token = {
  id: string;          // Unique ID for the token
  last_updated: Date;  // Timestamp for the last update
  platform: string;    
  push_token: string;  
  user_id: string;     // ID of the user the token belongs to
};


export default function HomeScreen() {

  const [tokens, setTokens] = useState<Token[]>([]);

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
  const list_tokens = async () => {
    console.log('Fetching tokens...');
    try {
      const querySnapshot = await getDocs(collection(db, 'push_tokens'));
      const tokensList = querySnapshot.docs.map(doc => (
        console.log(doc.data()),
        {
        id: doc.id,
        ...(doc.data() as Omit<Token, 'id'>), // Type assertion for Firestore data
      }));
      console.log('Tokens:', tokensList);
      setTokens(tokensList);
    } catch (error) {
      console.error('Error fetching tokens:', error);
    }
  }
  useEffect(() => {
    list_tokens();},[]);
  return (
    <>
        <StatusBar barStyle="light-content" backgroundColor="#222831"/>
        {/* <View style={styles.container1}> */}
              {/* <Button title="Send Notification" onPress={scheduleNotification} /> */}
              {/* <Button title="Alert"  /> */}
              {/* <TouchableOpacity style={styles.button} onPress={sendalert}>
                <Text style={styles.buttonText}>Alert2</Text>
              </TouchableOpacity> */}
        {/* </View> */}
        <View style={styles.tokenView}>
        <Text style={styles.tokenList}>Tokens</Text>
        {tokens.map(token =>(<Text style={styles.listItem} key={token.id}>{token.push_token}</Text>))}
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
  },
  tokenList: {
    marginTop: 20,
    fontSize: 25,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  listItem: {
    fontSize: 16,
    marginTop: 5,
    height: 30,
    color: '#FF6500',
    backgroundColor: '#0B192C',
  },
  tokenView:{
    // flex: 1,
    padding: 20,
    backgroundColor: '#1E3E62',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
});
