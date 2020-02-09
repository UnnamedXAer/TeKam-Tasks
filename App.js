import React from 'react';
import { AppLoading } from 'expo';
import { enableScreens } from 'react-native-screens';
import AppNavigator from './Navigation/AppNavigator';

enableScreens();

export default function App() {
  return (
    <AppNavigator />
  );
}