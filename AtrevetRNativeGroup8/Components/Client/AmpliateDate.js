import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Touchable, TouchableOpacity, Modal, Button, Alert, Image, ScrollView, TextInput } from 'react-native';
import { stylesNf } from '../../Styles/FormOffersStyles';
import { GetTimeTable, SaveCalendar } from '../../Data/CalendarGarageData';
import { RFValue } from 'react-native-responsive-fontsize';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import stylesMap from "../../Styles/GarageRequest"
//import DateTimePicker from 'react-native-modal-datetime-picker';
import DateTimePicker from "@react-native-community/datetimepicker"
import MapView, { Marker } from 'react-native-maps';
import { SendOffer, VerifyReservesByDate, getAllGarages, getCarsByUser } from '../../Data/GetAllGarages';
import { GetDateTraducedWithOutH, compareDate, getDATEfromTime, getIINDEX } from '../../Tools/TransformDate';
import { FontAwesome } from '@expo/vector-icons';

import AsyncStorage from "@react-native-async-storage/async-storage"
import { Picker } from '@react-native-picker/picker';
import { useNavigation, useRoute } from '@react-navigation/native';



import MapViewDirections from 'react-native-maps-directions';

const AmpliateDate = () => {




    const n = useNavigation();
    const r = useRoute();

    const { userLocation } = r.params;

    const { garageLocation } = r.params;


    return (

        <View style={styles.container}>

            <Text style={{ color: "white", fontWeight: "bold", fontSize: RFValue(20), alignSelf: "center" }}>Ubicación Garaje</Text>
            <View style={[stylesMap.myMapContainer3, { height: RFValue(555) }]}>
                <MapView


                    style={[stylesMap.MyMap2, { height: RFValue(555) }]}
                    initialRegion={{
                        latitude: userLocation.latitude

                        ,
                        longitude: userLocation.longitude,
                        latitudeDelta: 0.0041022,
                        longitudeDelta: 0.00421,
                    }}

                >
                    <Marker


                        coordinate={{
                            latitude: userLocation.latitude
                            ,
                            longitude: userLocation.longitude
                        }}
                        title="Mi ubicación"
                        description="Mi ubi"
                    >
                        <Image source={require("../../assets/UserPoint.gif")} style={{ width: 30, height: 80, alignSelf: "center", justifyContent: "center", padding: 10, paddingHorizontal: 40 }}></Image>

                    </Marker>


                    <Marker


                        coordinate={{
                            latitude: garageLocation.latitude
                            ,
                            longitude: garageLocation.longitude,
                        }}
                        title="Garaje"
                        description="Descripción Garaje"
                    >
                        <Image source={require("../../assets/GaragePoint.gif")} style={{ width: 30, height: 80, alignSelf: "center", justifyContent: "center", padding: 10, paddingHorizontal: 40 }}></Image>

                    </Marker>


                    <MapViewDirections

                        origin={userLocation}

                        destination={garageLocation}
                        apikey="AIzaSyCPxGM_Coema3d1JidFraPMQ1jXzI5xKWo"

                        strokeWidth={3}

                        strokeColor="#0000FF"

                    >

                    </MapViewDirections>

                </MapView>


            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 22,
        backgroundColor: "#26798e"
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 100,
    },
});

export default AmpliateDate;