import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name='(shop)'
        options={{ headerShown: false, title: 'Shop' }}
      />
      <Stack.Screen
        name='categories'
        options={{ headerShown: true, title: 'Categories' }}
      />
      <Stack.Screen
        name='product'
        options={{ headerShown: true, title: 'Product' }}
      />
      <Stack.Screen
        name='cart'
        options={{ presentation: 'modal', title: 'Shoping Cart' }}
      />
      <Stack.Screen name='auth' options={{ headerShown: true }} />
    </Stack>
  )
}

const styles = StyleSheet.create({})
