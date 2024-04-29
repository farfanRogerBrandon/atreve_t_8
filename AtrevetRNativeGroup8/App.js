import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Create_Car from './Components/Client/create_car.js';
import MyStatusBar from './Components/myStatus.js';
import Create_Garage from './Components/Offertant/create_garage.js';

export default function App() {
  return (
    <>
    <MyStatusBar/>
    <Create_Garage />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
