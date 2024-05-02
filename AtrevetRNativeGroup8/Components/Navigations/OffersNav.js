import { createStackNavigator } from "@react-navigation/stack";
import HomeDates from "../Client/HomeDates";
import HomeOffers from "../Offertant/HomeOffers";
import NegociationOffer from "../Offertant/NegociationOffer";


const Stack = createStackNavigator();

const OffersNav = () => {


  return (
    
      <Stack.Navigator initialRouteName="HomeOffers">
       
       
        <Stack.Screen name='HomeOffers' component={HomeOffers}  options={{headerShown:false}} />
        <Stack.Screen name='NegociationOffer' component={NegociationOffer}  options={{headerShown:false}} />
      

      </Stack.Navigator>

  );
};
export default OffersNav;