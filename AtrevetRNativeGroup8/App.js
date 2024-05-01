import { StatusBar } from 'expo-status-bar';
import {  StyleSheet, Text, View } from 'react-native';
import MyStatusBar from './Components/myStatus';
import TimePickerExample from './Components/Client/TimePickerExample';
import RequestGarage from './Components/Client/RequestGarage';
export default function App() {
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
    alignItems: 'center',
    justifyContent: 'center',
  },
});
