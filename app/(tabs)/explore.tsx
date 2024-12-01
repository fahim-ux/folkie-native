import {  View,ScrollView ,StyleSheet,Image} from 'react-native';
import * as React from 'react';
export default function HomeScreen() {
  return (
    <>
    <ScrollView >
      <View style={styles.Container}>
          <View style={styles.sub}>
          <Image source={require('@/assets/images/folkie-4.png')} style={styles.image2}/>
          </View>
      <View style={styles.sub}>
            <Image source={require('@/assets/images/folkie-2.png')} style={styles.image}/>
          </View>
          <View style={styles.sub}>
            <Image source={require('@/assets/images/folkie-3.png')} style={styles.image}/>
          </View>
      </View>
    </ScrollView>
    </>
    
  );
}

const styles = StyleSheet.create({
  Container: {
    backgroundColor: '#FBFBFB',
    // height: 1000,
    display:'flex',
    justifyContent:'flex-start',
    alignItems:'center',
    padding:3,
    borderColor: '#F4F6FF',
    borderWidth:2,
    paddingTop:5
  },
  sub:{
    backgroundColor: '#F5F7F8',
    width: '100%',
    height: 300,
    marginBottom: 4,
    borderRadius:2,
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
  },
  image:{
    width: 360,
    height: 280,
    borderRadius:2,
    aspectRatio:1.3
  },
  image2:{
    width: 360,
    height: 280,
    borderRadius:2,
    // aspectRatio:1
  },
  
});
