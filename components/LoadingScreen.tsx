import React,{useRef,useEffect} from 'react';
import { View, Text, StyleSheet, ActivityIndicator,Animated,Easing,Image } from 'react-native';


const LoadingScreen = () => {

    const scaleValue =useRef(new Animated.Value(1)).current;
    const opacityValue =useRef(new Animated.Value(1)).current;

    useEffect(()=>{
        const animate = ()=>{
            Animated.loop(
                Animated.sequence([
                    Animated.parallel([
                        Animated.timing(scaleValue,{
                            toValue:0.5,
                            duration:1000,
                            easing:Easing.inOut(Easing.ease),
                            useNativeDriver:true
                        }),
                        Animated.timing(opacityValue,{
                            toValue:0.5,
                            duration:1000,
                            easing:Easing.inOut(Easing.ease),
                            useNativeDriver:true
                        })
                    ]),
                    Animated.parallel([
                        Animated.timing(scaleValue,{
                            toValue:1,
                            duration:1000,
                            easing:Easing.inOut(Easing.ease),
                            useNativeDriver:true
                        }),
                        Animated.timing(opacityValue,{
                            toValue:1,
                            duration:1000,
                            easing:Easing.inOut(Easing.ease),
                            useNativeDriver:true
                        })
                    ])
                ])
            ).start();
        };

        animate();
    },[scaleValue,opacityValue])

  return (
    <View style={styles.loadingContainer}>
        <Animated.Image
        source={require('@/assets/images/folkie.png')}
        style={[
            styles.image,
            {
                transform:[{scale:scaleValue}],
                opacity:opacityValue
            }
        ]}
       />
      {/* <ActivityIndicator size="large" color="#0000ff" /> */}
      {/* <Text style={styles.loadingText}>Loading...</Text> */}
    </View>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    flexDirection:'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    // display:'flex',
    // justifyContent:'center',
    // alignItems:'center'
    borderWidth:2,
    marginTop:0

  },
  image: {
    width: 70,
    height: 70,
  },
  loadingText: {
    // marginTop: 10,
    fontSize: 15,
    fontWeight: 'light',
    textAlign:'center',
    paddingLeft:11,
    color:'#D3D3D3'
  },
});

export default LoadingScreen;