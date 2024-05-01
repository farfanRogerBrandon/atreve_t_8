import { StatusBar } from 'expo-status-bar';
import {  StyleSheet, Text, View } from 'react-native';
import MyStatusBar from './Components/myStatus';
import TimePickerExample from './Components/Client/TimePickerExample';
import RequestGarage from './Components/Client/RequestGarage';
import { useState } from 'react';
export default function App() {
  const [currentScreen, setCurrentScreen] = useState('login');

  const handleNavigation = () => {
    setCurrentScreen('signup');
  };

  return (
    
    <>
    <MyStatusBar>

    </MyStatusBar>
    <RequestGarage></RequestGarage>
    </>
   
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
});


/**
 *  <View style={styles.container}>
      {currentScreen === 'login' ?
        <LoginScreen onNavigate={handleNavigation} /> :
        <SignUpScreen />
      }
      <StatusBar style="auto" />
    </View>
 */