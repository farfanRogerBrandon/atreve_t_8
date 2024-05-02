import { createStackNavigator } from "@react-navigation/stack";
import HomeDates from "../Client/HomeDates";
import RequestGarage from "../Client/RequestGarage";
import NegociationClient from "../Client/NegociationClient";


const Stack = createStackNavigator();

const RequestGarageNavig = () => {


  return (
    
      <Stack.Navigator initialRouteName="HomeDates">
       
       
        <Stack.Screen name='HomeDates' component={HomeDates}  options={{headerShown:false}} />
        <Stack.Screen name='RequestGarage' component={RequestGarage} options={{headerShown:false}} />
        <Stack.Screen name='NegociationClient' component={NegociationClient} options={{headerShown:false}} />
        

      </Stack.Navigator>

  );
};
export default RequestGarageNavig;