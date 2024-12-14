import React from 'react';
import {  Image,View,ScrollView ,StyleSheet,ImageBackground,StatusBar,Text} from 'react-native';

export default function HomeScreen() {
  return (
    <>
    <StatusBar barStyle="light-content" backgroundColor="#5e5d5d"/>
    {/* <ScrollView > */}
      <View style={styles.container}>
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
      </View>
    {/* </ScrollView> */}
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
  }
  
  
});
