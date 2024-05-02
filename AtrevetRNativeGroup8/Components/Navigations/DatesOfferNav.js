import { createStackNavigator } from "@react-navigation/stack";
import HomeDates from "../Client/HomeDates";
import HomeOffers from "../Offertant/HomeOffers";
import NegociationOffer from "../Offertant/NegociationOffer";
import OfDates from "../Offertant/OfDates";
import Rating_InterfaceOffertant from "../Offertant/rating_interfaceOffertant";


const Stack = createStackNavigator();

const DateOffersNav = () => {


  return (
    
      <Stack.Navigator initialRouteName="OfDates">
       
       
        <Stack.Screen name='OfDates' component={OfDates}  options={{headerShown:false}} />

        <Stack.Screen name='Rating_InterfaceOffertant' component={Rating_InterfaceOffertant}  options={{headerShown:false}} />
   

      </Stack.Navigator>

  );
};
export default DateOffersNav;