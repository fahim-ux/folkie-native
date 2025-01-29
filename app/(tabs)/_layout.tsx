import { Tabs } from 'expo-router';
import React from 'react';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { useColorScheme } from '@/hooks/useColorScheme';
import { StyleSheet } from 'react-native';
import { Pressable } from 'react-native';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#EB3678',
        tabBarInactiveTintColor: '#006A67',
        headerShown: false,
        // tabBarShowLabel: false,
        // animation:'fade',
        // tabBarAccessibilityLabel:'igg',
        // tabBarLabelPosition:'beside-icon',
        // tabBarLabelPosition:'below-icon',
        tabBarPosition:'bottom',
        // tabBarVariant: 'material',
        // tabBarVariant: 'uikit',
        tabBarStyle: {
          backgroundColor:'#DDE6ED',
          // height:500,
          // width:'90%',
          // position:'absolute',
          // top:0,
          // left:20,
          // padding:10,
        },
        tabBarButton: (props) => (
          <Pressable
            {...props}
            android_ripple={null}
            style={({ pressed }) => [
              {
                opacity: pressed ? 1 : 1,
              },
              // styles.defaultIcon,
              // pressed ? styles.focusedIcon : styles.defaultIcon,
            ]}
          />
        ),
        
      }}
        // screenListeners={{
        //   // Monitor tab press and if 'test' tab is pressed, toggle value in zustand to trigger refetching of data from server
        //   tabPress: (e) => {
        //     e.preventDefault();
        //   }
        // }}
        >
        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon name={focused ? 'nuclear' : 'nuclear-outline'} color={color} />
            ),
            tabBarItemStyle: { backgroundColor: '#DDE6ED' ,
              // margin:5,
              // height:80,
              // width:20,
              // display:'flex',
              justifyContent:'center',
              alignItems:'center',
            },
          }}
        />
      <Tabs.Screen
        name="subjects"
        options={{
          title: 'Subjects',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'code-slash' : 'code-slash-outline'} color={color} />
          ),
          tabBarItemStyle: { backgroundColor: 'white',
            // margin:5,
            // height:80,
            // width:20,
            // display:'flex',
            justifyContent:'center',
            alignItems:'center',
          },

        }}
      />
      {/* <Tabs.Screen
        name="ui"
        options={{
          title: 'UI',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'star-half' : 'star-half-outline'} color={color} />
          ),
          tabBarItemStyle: { backgroundColor: '#DDE6ED',
            // margin:5,
            // height:80,
            // width:20,
            // display:'flex',
            justifyContent:'center',
            alignItems:'center',
          },
          tabBarStyle:{
            // display:'none',
          }
        }}
      /> */}
      <Tabs.Screen
        name="admin"
        options={{
          title: 'Admin',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'terminal' : 'terminal-outline'} color={color} />
          ),
          tabBarItemStyle: { backgroundColor: 'white' ,
            // margin:5,
            // height:80,
            // width:20,
            // display:'flex',
            justifyContent:'center',
            alignItems:'center',
          },
        }}
      />
    </Tabs>
  );
}
const styles = StyleSheet.create({
  focusedIcon: {
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.8,
    // shadowRadius: 3, 
    // elevation: 5, 
  },
  defaultIcon: {
    // transform: [{ scale: 1 }],
    // Add other styles for the default state here
  },
});