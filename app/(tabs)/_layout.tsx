import { Tabs } from 'expo-router';
import React from 'react';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#EB3678',
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor:'#DDE6ED'
        }
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'code-slash' : 'code-slash-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'nuclear' : 'nuclear-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="deals"
        options={{
          title: 'Deals',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'star-half' : 'star-half-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="designer"
        options={{
          title: 'Designer',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'terminal' : 'terminal-outline'} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}