import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';


import { Entypo, Ionicons, FontAwesome5, EvilIcons, FontAwesome, MaterialCommunityIcons, Fontisto  } from '@expo/vector-icons';
import { Platform } from 'react-native';
import ListCars from '../Client/ListCars';
import ListGarages from '../Offertant/ListGarages';
import GaragesNavigation from './GaragesNavigation';
import OffersNav from './OffersNav';
import DateOffersNav from './DatesOfferNav';

const Tab = createBottomTabNavigator();

function MyTabs(){
    let height =60;
    if(Platform.OS =="ios"){
        height=70;
    }
    return(
        <Tab.Navigator 
            initialRouteName='Ofertas'        
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
                name="Ofertas" 
                component={OffersNav}
                options={{           
                            
                    tabBarIcon: ({ color, size}) => (
                        <MaterialCommunityIcons name="offer" size={30} color="white" />
                    ),
                }}
            
            />
          
            <Tab.Screen 
                name="Reservas" 
                component={DateOffersNav} 
                options={{                   
                    tabBarIcon: ({ color, size}) => (
                        <Fontisto name="date" size={30} color="white" />
                    ),
                }}
                 
            />
           
           <Tab.Screen 
                name="Mis Garajes" 
                component={GaragesNavigation } 
                options={{                   
                    tabBarIcon: ({ color, size}) => (
                        <MaterialCommunityIcons name="garage-variant" size={30} color="white" />
                    ),
                }}
                 
            />
            
        </Tab.Navigator>
    );
}

export default function OfNavigation(){
    return(
            <MyTabs></MyTabs>
    );
}