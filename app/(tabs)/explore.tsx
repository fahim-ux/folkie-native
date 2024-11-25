import {  View,ScrollView ,StyleSheet} from 'react-native';

export default function HomeScreen() {
  return (
    <>
    <ScrollView >
      <View style={styles.Container}>
          <View style={styles.sub}></View>
          <View style={styles.sub}></View>
          <View style={styles.sub}></View>
      </View>
    </ScrollView>
    </>
    
  );
}

const styles = StyleSheet.create({
  Container: {
    backgroundColor: '#FBFBFB',
    height: 1000,
    display:'flex',
    justifyContent:'flex-start',
    alignItems:'center',
    padding:3,
    borderColor: '#F4F6FF',
    borderWidth:2,
    paddingTop:5
  },
  sub:{
    backgroundColor: '#EA5455',
    width: '99%',
    height: 300,
    marginBottom: 4,
    borderRadius:4,
    // display:'flex',
  }
});
