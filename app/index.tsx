import React from "react";
import { View ,Text, StyleSheet,StatusBar, TouchableOpacity,Image,FlatList, ListRenderItem,Animated} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import { useState,useRef , useEffect} from "react";
import * as Font from 'expo-font'
import * as SplashScreen from 'expo-splash-screen';
import LoadingScreen from "@/components/LoadingScreen";

interface Item{
    id:string;
    title:string;
}

const items:Item[] = [
    { id: '1', title: 'Home' },
    { id: '2', title: 'About Us' },
    { id: '3', title: 'Dev-info' },
    { id: '4', title: 'Careers' },
  ];

export default function Navbar(){

    const [sidebarVisible,setSidebarVisible] = useState(false);
    const sidebarLeft = useRef(new Animated.Value(-250)).current;
    const [fontsLoaded,setFontsLoaded] = useState(false);

    const loadFonts = async () =>{
        await Font.loadAsync({
            'Roboto-Regular': require('@/assets/fonts/Roboto-Mono/RobotoMono-Regular.ttf'),
            'Roboto-Bold': require('@/assets/fonts/Roboto-Mono/RobotoMono-Bold.ttf'),
            'Roboto-Medium': require('@/assets/fonts/Roboto-Mono/RobotoMono-Medium.ttf'),
            'Roboto-Light': require('@/assets/fonts/Roboto-Mono/RobotoMono-Light.ttf')
        });
        setTimeout(()=>{
            setFontsLoaded(true);
            SplashScreen.hideAsync();
        },5000);
    };

    useEffect(()=>{
        SplashScreen.preventAutoHideAsync();
        loadFonts();
    },[]);

    if (!fontsLoaded) {
        return <LoadingScreen/>;
    }

    const toggleSidebar = () =>{
        Animated.timing(sidebarLeft,{
            toValue: sidebarVisible ? -250 :0,
            duration:300,
            useNativeDriver:false
        }).start();
        setSidebarVisible(!sidebarVisible);
    }

    const renderItem:ListRenderItem<Item> = ({ item}) => (
        <TouchableOpacity style={styles.item} onPress={() => alert(`Clicked on ${item.title}`)}>
          <Text style={styles.itemText}>{item.title}</Text>
        </TouchableOpacity>
      );
    return (
        <>
            <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF"/>
            <View style={styles.navbar}>
                <TouchableOpacity  onPress={toggleSidebar}>
                    <Ionicons  name="menu"  size={26} color="black"/>
                </TouchableOpacity>
                
                <Image source={require('@/assets/images/folkie.png')} style={styles.logo}/>
            </View>
            {/* <View  style={styles.container}>
                <Text>Set Screen (Home Screen)</Text>
            </View> */}
            <Animated.View style={[styles.sidebar,{left : sidebarLeft}]} >
                <FlatList
                    data={items}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                    contentContainerStyle={styles.list}
                />
            </Animated.View>
            
        </>
    )
}

const styles = StyleSheet.create({
    navbar:{
        backgroundColor:'#FFFFFF',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        height:60,
        paddingHorizontal:10,
        borderBottomWidth:0.5,
        borderBottomColor:'#D3D3D3',
    },
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    logo:{
        width:55,
        height:40,
        // borderWidth:2,
        // borderColor:'blue',
    },
    list: {
        // padding: 10,
    },
    item: {
        padding: 15,
        backgroundColor: '#f9f9f9',
        borderBottomWidth: 1,
        borderBottomColor: '#D3D3D3',
        // width:220,
        width:248,
        display:'flex',
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center'
        
    },
    itemText: {
        fontSize: 18,
        fontFamily:'Roboto-Light',
    },
    sidebar:{
        backgroundColor:'#f9f9f9',
        flexDirection:'column',
        justifyContent:'space-between',
        alignItems:'center',
        height:'100%',
        width:250,
        paddingHorizontal:10,
        borderBottomWidth:0.5,
        borderBottomColor:'#D3D3D3',
        paddingRight:0,
        paddingLeft:0,
        position:'absolute',
        top:60,
        left:-250,
        // right:0,
        // bottom:0,
        borderWidth:1,
        borderColor:'blue'

    }

})