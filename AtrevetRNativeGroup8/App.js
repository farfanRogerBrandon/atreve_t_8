import { StatusBar } from 'expo-status-bar';
import {  StyleSheet, Text, View } from 'react-native';
import MyStatusBar from './Components/myStatus';
import TimePickerExample from './Components/Client/TimePickerExample';
import RequestGarage from './Components/Client/RequestGarage';
import Create_Car from "./Components/Client/create_car"
import Edit_Car from "./Components/Client/Edit_Car"
import ListCars from "./Components/Client/ListCars"
import Create_Garage from "./Components/Offertant/create_garage"
import Edit_Garage from "./Components/Offertant/Edit_Garage"
import ListGarages from "./Components/Offertant/ListGarages"
import { createStackNavigator } from '@react-navigation/stack';

import Rating_InterfaceOffertant from './Components/Offertant/rating_interfaceOffertant';


import { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import StartNavigator from './Components/Navigations/StartNavigator';
export default function App() {


  const Stack = createStackNavigator();
/*
  function MyStack(){
    return(
      <Stack.Navigator>
        <Stack.Screen name='ListCars' component={Rating_InterfaceOffertant} />
        <Stack.Screen name='CreateCar' component={Create_Car} />
        <Stack.Screen name='EditCar' component={Edit_Car} />
        <Stack.Screen name='ListGarages' component={ListGarages} />
        <Stack.Screen name='CreateGarage' component={Create_Garage} />
        <Stack.Screen name='EditGarage' component={Edit_Garage} />
      </Stack.Navigator>
    )
  }*/

  return (
    <>
   
      <StartNavigator></StartNavigator>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  navigationContainerStyle: {
    backgroundColor: '#FFE3B3'
  }
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
 




/**
 * const Stack = createStackNavigator();

  function MyStack(){
    return(
      <Stack.Navigator>
        <Stack.Screen name='ListCars' component={ListGarages} />
        <Stack.Screen name='CreateCar' component={Create_Car} />
        <Stack.Screen name='EditCar' component={Edit_Car} />
        <Stack.Screen name='ListGarages' component={ListGarages} />
        <Stack.Screen name='CreateGarage' component={Create_Garage} />
        <Stack.Screen name='EditGarage' component={Edit_Garage} />
      </Stack.Navigator>
    )
  }

  return (
    <>
    <MyStatusBar/>
      <NavigationContainer>
        <MyStack />
      </NavigationContainer>
    </>
  );
 */
