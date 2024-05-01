

import { createStackNavigator } from "@react-navigation/stack";
import ListCars from "../Client/ListCars";
import Create_Car from "../Client/create_car";
import Edit_Car from "../Client/Edit_Car";

const Stack = createStackNavigator();

const CarsNavigation = () => {


    return (

        <Stack.Navigator initialRouteName="ListCars">


            <Stack.Screen name='ListCars' component={ListCars} options={{ headerShown: false }} />
            <Stack.Screen name='CreateCar' component={Create_Car} options={{ headerShown: false }} />
            <Stack.Screen name='EditCar' component={Edit_Car} options={{ headerShown: false }} />
        </Stack.Navigator>

    );
};
export default CarsNavigation;