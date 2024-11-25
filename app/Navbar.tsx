import React from "react";
import { View ,Text, StyleSheet,StatusBar, TouchableOpacity,Image,FlatList, ListRenderItem,Animated} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import { useState,useRef , useEffect} from "react";
import * as Font from 'expo-font'
import * as SplashScreen from 'expo-splash-screen';
import LoadingScreen from "@/components/LoadingScreen";
import { useNavigation,NavigationProp } from "@react-navigation/native";
import { Link } from "expo-router";


interface Item {
    id: string;
    title: string;
    no:number;
  }
const items: Item[] = [
    { id: '1', title: 'Home' , no:1},
    { id: '2', title: 'About Us', no:1},
    { id: '3', title: 'Dev-info', no:1},
    { id: '4', title: 'Careers' , no:1},
  ];

export default function Navbar(){

    const [sidebarVisible,setSidebarVisible] = useState(false);
    const sidebarLeft = useRef(new Animated.Value(-250)).current;
    

    const toggleSidebar = () =>{
        Animated.timing(sidebarLeft,{
            toValue: sidebarVisible ? -250 :0,
            duration:300,
            useNativeDriver:false
        }).start();
        setSidebarVisible(!sidebarVisible);
    }
    const src = 'details';
    const links = ['index', 'details', 'details', 'details'];
    const renderItem:ListRenderItem<Item> = ({ item}) => (
        <TouchableOpacity style={styles.item}>
          {/* <Text style={styles.itemText}>{item.title}</Text> */}
          <Link href={{
            pathname: `/`,
            params: { id: 'bacon' }
    }} style={styles.itemText}>{item.title}</Link>
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
        // position:'fixed',
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
        // position:'fixed',
        top:60,
        left:-250,
        // right:0,
        // bottom:0,
        borderWidth:1,
        borderColor:'blue',
        zIndex:1000

    }

})