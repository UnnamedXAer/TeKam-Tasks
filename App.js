import React from 'react';
import { AppLoading } from 'expo';
import { useScreens } from 'react-native-screens';
import AppNavigator from './Navigation/AppNavigator';

useScreens();

export default function App() {
  return (
    <AppNavigator />
  );
}