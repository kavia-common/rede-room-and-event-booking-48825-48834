import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, Platform, View } from 'react-native';
import AppNavigator from './src/navigation/AppNavigator';
import { StoreProvider } from './src/state/store';
import { Theme } from './src/theme';

export default function App() {
  return (
    <StoreProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: Theme.colors.background }}>
        <View style={{ flex: 1 }}>
          <AppNavigator />
        </View>
        <StatusBar style={Platform.OS === 'ios' ? 'dark' : 'auto'} />
      </SafeAreaView>
    </StoreProvider>
  );
}
