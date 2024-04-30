import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Create_Car from './Components/Client/create_car.js';
import MyStatusBar from './Components/myStatus.js';
import Create_Garage from './Components/Offertant/create_garage.js';
import Rating_InterfaceClient from './Components/Client/rating_interfaceClient.js';
import Rating_InterfaceOffertant from './Components/Offertant/rating_interfaceOffertant.js';
import ListCars from './Components/Client/ListCars.js';
import Edit_Car from './Components/Client/Edit_Car.js';
import Edit_Garage from './Components/Offertant/Edit_Garage.js';
import ListGarages from './Components/Offertant/ListGarages.js';

export default function App() {

  const Stack = createStackNavigator();

  function MyStack(){
    return(
      <Stack.Navigator>
        <Stack.Screen name='ListCars' component={ListCars} />
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
}

const styles = StyleSheet.create({
  navigationContainerStyle: {
    backgroundColor: '#FFE3B3'
  }
})

