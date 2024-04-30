// App.js
import React, { useState } from 'react';
import { View, StatusBar, StyleSheet } from 'react-native';
import LoginScreen from './LoginScreen';
import SignUpScreen from './SignUpScreen';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('login');

  const handleNavigation = () => {
    setCurrentScreen('signup');
  };

  return (
    <View style={styles.container}>
      {currentScreen === 'login' ?
        <LoginScreen onNavigate={handleNavigation} /> :
        <SignUpScreen />
      }
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
});
