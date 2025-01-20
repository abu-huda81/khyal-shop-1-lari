import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import { ToastProvider } from 'react-native-toast-notifications'
import AuthProvider from '../providers/auth-provider'

export default function RootLayout() {
  return (
    <ToastProvider>
      <AuthProvider>
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
            options={{ headerShown: false, title: 'Product' }}
          />
          <Stack.Screen
            name='cart'
            options={{ presentation: 'modal', title: 'Shoping Cart' }}
          />
          <Stack.Screen name='auth' options={{ headerShown: false }} />
        </Stack>
      </AuthProvider>
    </ToastProvider>
  )
}

const styles = StyleSheet.create({})
