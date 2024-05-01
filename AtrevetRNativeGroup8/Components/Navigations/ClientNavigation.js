import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';


import { Entypo, Ionicons, FontAwesome5, EvilIcons, FontAwesome, Fontisto, FontAwesome6  } from '@expo/vector-icons';
import { Platform } from 'react-native';
import ListCars from '../Client/ListCars';
import CarsNavigation from './CarsNavigation';

const Tab = createBottomTabNavigator();

function MyTabs(){
    let height =60;
    if(Platform.OS =="ios"){
        height=70;
    }
    return(
        <Tab.Navigator 
            initialRouteName='Reservas'        
            screenOptions={{
                tabBarActiveTintColor: '#000000',
                tabBarInactiveTintColor: '#000000',
                tabBarActiveBackgroundColor: '#63caa7',
                
                headerShown: false,
                tabBarStyle: {
                         
                   backgroundColor: '#26798e',                 
                   height: height,
                   borderColor: '#000000',
                   
                }
            }}
            >
            <Tab.Screen 
                name="Reservas" 
                component={CarsNavigation}
                options={{           
                            
                    tabBarIcon: ({ color, size}) => (
                        <Fontisto name="date" size={30} color="white" />
                    ),
                }}
            
            />
          
            <Tab.Screen 
                name="Mis vehículos" 
                component={CarsNavigation } 
                options={{                   
                    tabBarIcon: ({ color, size}) => (
                        <FontAwesome6 name="car-side" size={30} color="white" />
                    ),
                }}
                 
            />
           
            
            
        </Tab.Navigator>
    );
}

export default function ClientNavigation(){
    return(
            <MyTabs></MyTabs>
    );
}