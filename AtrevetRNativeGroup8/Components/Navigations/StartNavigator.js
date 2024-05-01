import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../../LoginScreen';
import SignUpScreen from "../../SignUpScreen"
import ClientNavigation from './ClientNavigation';
import OfNavigation from './OfNavigation';



//import JobRequest from '../../Nurse/JobRequest';

const Stack = createStackNavigator();

const StartNavigator = () => {

  //luego seprar lo de payments you know
  return (
    <NavigationContainer >
      <Stack.Navigator initialRouteName="LoginScreen">
      <Stack.Screen name="LoginScreen" component={LoginScreen}  options={{headerShown:false}}  />
      <Stack.Screen name="SignUpScreen" component={SignUpScreen}  options={{headerShown:false}}  />
      <Stack.Screen name="ClientNavigation" component={ClientNavigation}  options={{headerShown:false}}  />
      <Stack.Screen name="OfNavigation" component={OfNavigation}  options={{headerShown:false}}  />

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StartNavigator;

/* 
        <Stack.Screen name="AdminHome" component={AdminNavigation} options={{headerShown:false}}/>
        <Stack.Screen name="UserHome" component={UserNavigation} options={{headerShown:false}}/>
        <Stack.Screen name="NurseHome" component={NurseNavigation} options={{headerShown:false}}/>
        <Stack.Screen name="JobRequest" component={JobRequest} options={{headerShown:false}}/>
        <Stack.Screen name="UserForm" component={UserForm} options={{headerShown:false}}/>
        <Stack.Screen name='AtentionOK' component={AtentionAcceptedMap} options={{headerShown:false}}></Stack.Screen>
        <Stack.Screen name="AtentionForm" component={AtentionForm} options={{headerShown:false}}/>
        <Stack.Screen name="WaitingConfirmationByUser" component={WaitingConfirmationByUser} options={{headerShown:false}}/>
    
        <Stack.Screen name="BeingServed" component={BeingServed} options={{headerShown:false}}/>
        <Stack.Screen name="Calification" component={Calification} options={{headerShown:false}}/>
        <Stack.Screen name="UserComplaint" component={UserComplaint} options={{headerShown:false}}/>

*/
   