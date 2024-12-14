import React from "react";
import { View , StyleSheet,StatusBar, TouchableOpacity,Image,FlatList, ListRenderItem,Animated} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import { useState,useRef } from "react";
import { Link } from "expo-router";
import { PanResponder } from "react-native";

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
    const [sidebarLeft,setSidebarLeft] = useState(new Animated.Value(-250));
    // const [sidebarLeft,setSidebarLeft] = useState(new Animated.Value(-240));
    

    const toggleSidebar = () =>{
        Animated.timing(sidebarLeft,{
            toValue: sidebarVisible ? -250 :0,
            duration:300,
            useNativeDriver:false
        }).start();
        setSidebarVisible(!sidebarVisible);
    }
    
    // const panResponder = useRef(PanResponder.create({
    //     onMoveShouldSetPanResponder: (evt,gestureState) =>{
    //         console.log("gestureState.dx-1",gestureState.dx);
    //         return Math.abs(gestureState.dx) >0;
    //     },
    //     onPanResponderMove: (evt,gestureState) =>{
    //         if(gestureState.dx >0)
    //         {
    //             console.log("User swiping right");
    //             sidebarLeft.setValue(gestureState.dx);
    //         }
    //         else if (gestureState.dx <0 )
    //         {
    //             console.log("User swiping left");
    //             sidebarLeft.setValue(gestureState.dx);
    //         }
    //         else
    //         {
    //             console.log("Confuse state");
    //         }
    //         // if(gestureState.dx > 0) {
    //         //     console.log("User swiping right");
    //         // }
    //         // else if (gestureState.dx < 0) {
    //         //     console.log("User swiping left");
    //     },
    //     onPanResponderRelease: (evt,gestureState) =>{
    //         if(gestureState.dx >100){
    //             Animated.timing(sidebarLeft,{
    //                 toValue:0,
    //                 duration:600,
    //                 useNativeDriver:false
    //             }).start();
    //             setSidebarVisible(true);
    //         }
    //         else if (gestureState.dx < -10) {
    //             // Swiped left enough to close
    //             Animated.timing(sidebarLeft, {
    //               toValue: -240,
    //               duration: 300,
    //               useNativeDriver: false,
    //             }).start();
    //             setSidebarVisible(false);
    //           } else {
    //             // Not enough swipe, reset to current state
    //             Animated.timing(sidebarLeft, {
    //               toValue: sidebarVisible ? 0 : -250,
    //               duration: 300,
    //               useNativeDriver: false,
    //             }).start();
    //           }
    //     }
    // })).current;

    const renderItem:ListRenderItem<Item> = ({ item}) => (
        <TouchableOpacity style={styles.item}>
          {/* <Text style={styles.itemText}>{item.title}</Text> */}
          {/* <Link href={{
            pathname: `/`,
            params: { id: 'bacon' }
    }} style={styles.itemText}>{item.title}</Link> */}
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