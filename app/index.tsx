import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useEffect } from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { Provider as ReduxProvider } from 'react-redux';
import { store } from '../store';
import { StatusBar } from 'expo-status-bar';
import { loadToken } from '../utils/authUtils';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';
import { Slot, Stack, Redirect } from 'expo-router';
import { useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SplashScreen } from 'expo-router';
import { verifyInstallation } from 'nativewind';

const index = () => {
  const dispatch = useAppDispatch();
  const { token, isLoading } = useAppSelector(state => state.auth);
  
  useEffect(() => {
    // Load token from storage on app start
    loadToken(dispatch);
  }, [dispatch]);

  useEffect(() => {
    if (!isLoading) {
      // Hide the splash screen once we're done checking auth
      SplashScreen.hideAsync();
    }
  }, [isLoading]);

  if (isLoading) {
    return null;
  }

  return token ? <Redirect href="/(tabs)" /> : <Redirect href="/(auth)/login" />;
}

export default index

const styles = StyleSheet.create({})