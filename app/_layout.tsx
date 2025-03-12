import { useEffect } from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { Provider as ReduxProvider } from 'react-redux';
import { store } from '../store';
import { StatusBar } from 'expo-status-bar';
import { loadToken } from '../utils/authUtils';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';
import { Slot, Stack, Redirect } from 'expo-router';
import { useColorScheme } from 'react-native';
import { SplashScreen } from 'expo-router';
import "../global.css";

// Catch any errors thrown by the Layout component.
export { ErrorBoundary } from 'expo-router';

// Set up the splash screen
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  return (
    <ReduxProvider store={store}>
      <PaperProvider>
        <StatusBar style="auto" />
       <Slot/>
      </PaperProvider>
    </ReduxProvider>
  );
}
