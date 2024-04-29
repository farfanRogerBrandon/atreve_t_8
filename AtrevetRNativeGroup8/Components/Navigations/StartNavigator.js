import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
//import StartPage from '../StartPage';
//import Loggin from '../Login';

/*
import AdminNavigation from "../../../Navigations/AdministratorNavigation/Navigation.js";
import UserNavigation from "../../../Navigations/UserNavigation/Navigation";
import NurseNavigation from "../../../Navigations/NurseNavigation/Navigation";
import JobRequest from '../JobRequest';
import UserForm from '../../User/UserRegistration';
import AtentionAcceptedMap from '../../Nurse/GiveAtention/AtentionAcceptedMap';
import AtentionForm from '../../Nurse/AtentionForm';
import BeingServed from '../../User/BeingServed';
import Calification from '../../User/Calification';
import WaitingConfirmationByUser from '../../Nurse/GiveAtention/WaitingConfirmationByUser';
import UserComplaint from '../../User/UserComplaint';
*/



//import JobRequest from '../../Nurse/JobRequest';

const Stack = createStackNavigator();

const StartNavigator = () => {

  //luego seprar lo de payments you know
  return (
    <NavigationContainer >
      <Stack.Navigator initialRouteName="AdminHome">
     { /*<Stack.Screen name="Loggin" component={Loggin}  options={{headerShown:false}} />
        <Stack.Screen name="StartPage" component={StartPage} options={{headerShown:false}}/>
        <Stack.Screen name="JobRequest" component={JobRequest} options={{headerShown:false}}/>
        <Stack.Screen name="UserRegistration" component={UserRegistration} options={{headerShown:false}}/>


       <Stack.Screen name="RechargeMenu" component={RechargeMenu} options={{headerShown:false}}/>
       <Stack.Screen name="PaypalPayScreen" component={PaypalPayScreen} options={{headerShown:false}}/>

       <Stack.Screen name="AdviserHome" component={AdviserNavigation} options={{headerShown:false}}/>
       <Stack.Screen name="AdminHome" component={AdminNavigation} options={{headerShown:false}}/>
       <Stack.Screen name="NurseHome" component={NurseNavigation} options={{headerShown:false}}/>
  <Stack.Screen name="UserHome" component={UserNavigation} options={{headerShown:false}}/>*/}
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
   