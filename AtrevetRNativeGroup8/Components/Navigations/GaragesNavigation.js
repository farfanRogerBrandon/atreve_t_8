import { createStackNavigator } from "@react-navigation/stack";
import ListGarages from "../Offertant/ListGarages";
import Create_Garage from "../Offertant/create_garage";
import Edit_Garage from "../Offertant/Edit_Garage";
import Calendar from "../Offertant/Calendar";

const Stack = createStackNavigator();

const GaragesNavigation = () => {


  return (
    
      <Stack.Navigator initialRouteName="ListGarages">
       
       
        <Stack.Screen name='ListGarages' component={ListGarages}  options={{headerShown:false}} />
        <Stack.Screen name='CreateGarage' component={Create_Garage} options={{headerShown:false}} />
        <Stack.Screen name='EditGarage' component={Edit_Garage} options={{headerShown:false}} />
        <Stack.Screen name='Calendar' component={Calendar} options={{headerShown:false}} />

      </Stack.Navigator>

  );
};
export default GaragesNavigation;