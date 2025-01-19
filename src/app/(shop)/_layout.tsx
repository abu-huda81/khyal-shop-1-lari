import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import { FontAwesome } from '@expo/vector-icons'

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name']
  color: string
}) {
  return (
    <FontAwesome
      size={28}
      style={{ marginBottom: -3, color: 'rgba(192, 119, 24, 0.86)' }}
      {...props}
    />
  )
}

export default function TabsLayout() {
  return (
    <SafeAreaView edges={['top']} style={styles.safeArea}>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: 'rgba(192, 119, 24, 0.86)',
          tabBarInactiveTintColor: 'gray',
          tabBarLabelStyle: {
            fontSize: 16,
          },
          tabBarStyle: {
            backgroundColor: 'white',
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            paddingTop: 10,
          },
          headerShown: false,
        }}
      >
        <Tabs.Screen
          name='index'
          options={{
            tabBarIcon: ({ color }) => (
              <TabBarIcon name='shopping-cart' color={color} />
            ),
            title: 'Shop',
          }}
        />
        <Tabs.Screen
          name='orders'
          options={{
            tabBarIcon: ({ color }) => <TabBarIcon name='book' color={color} />,
            title: 'Orders',
          }}
        />
      </Tabs>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
})
