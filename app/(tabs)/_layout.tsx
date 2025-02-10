import React from 'react';
import { Tabs } from 'expo-router';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Pressable } from 'react-native';

export default function TabLayout() {

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#144272',
        tabBarInactiveTintColor: '#2C74B3',
        headerShown: false,
        tabBarPosition: 'bottom',
        tabBarShowLabel: false,
        tabBarStyle: {
          // backgroundColor: '#DDE6ED',
        },
        tabBarButton: (props) => (
          <Pressable
            {...props}
            style={({ pressed }) => [
              {
                opacity: pressed ? 0.5 : 1,
              },
            ]}
          />
        ),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Subjects',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'nuclear' : 'nuclear-outline'} color={color} />
          ),
          tabBarItemStyle: {
            backgroundColor: 'white',
            justifyContent: 'center',
            alignItems: 'center',
          },
        }}
      />
      <Tabs.Screen
        name="policy"
        options={{
          title: 'Info',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'information' : 'information-outline'} color={color} />
          ),
          tabBarItemStyle: {
            backgroundColor: 'white',
            justifyContent: 'center',
            alignItems: 'center',
          },
        }}
      />
    </Tabs>
  );
}
