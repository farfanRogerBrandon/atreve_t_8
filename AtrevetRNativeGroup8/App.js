import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Create_Car from './Components/Client/create_car.js';
import MyStatusBar from './Components/myStatus.js';
import Create_Garage from './Components/Offertant/create_garage.js';
import Rating_InterfaceClient from './Components/Client/rating_interfaceClient.js';
import Rating_InterfaceOffertant from './Components/Offertant/rating_interfaceOffertant.js';

export default function App() {
  return (
    <>
    <MyStatusBar/>
    <Rating_InterfaceOffertant />
    </>
  );
}

