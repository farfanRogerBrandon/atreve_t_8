import React, { useEffect, useState } from 'react';
import { StatusBar } from "expo-status-bar";
import { View, Text, TextInput, TouchableOpacity, ScrollView, FlatList, Alert } from 'react-native';
import ListCarStyles from '../../Styles/ListCarsStyles';
import Icon from 'react-native-vector-icons/FontAwesome';
import { getCars } from '../../Data/CarsGet';
import { logicalDeleteCarById } from '../../Data/CarsEdit';
import * as Location from 'expo-location';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GetRentalsByClient } from '../../Data/Rentals';
import { stylesNf } from '../../Styles/FormOffersStyles';
import { RFValue } from 'react-native-responsive-fontsize';
const HomeDates = () => {
  const n = useNavigation();
  const [data, setData] = useState([]);
  const [myuser, setuser] = useState("");


  var muser = "";
  const getLocalUser = async () => {
    try {
      muser = await AsyncStorage.getItem("user");
      let muserJson = muser ? JSON.parse(muser) : null;
      setuser(muserJson);
      await getRentals(muserJson.id);
    }
    catch (e) {
      console.error(e);
    }
  }

  const getRentals = async (id) => {
    try {
        let res =await  GetRentalsByClient(id);
        
        setData(res);

    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getLocalUser();
  }, [])

  const requestDate = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== 'granted') {

      Alert.alert("Error", "Debe permitir acceso a su ubicación")

      return;
    }
    let location = await Location.getCurrentPositionAsync({});

    n.navigate("RequestGarage", { location: location.coords });

  }



  return (
    <View style={ListCarStyles.container}>
      <View style={ListCarStyles.headerTopBar}>
        <Text style={ListCarStyles.headerTopBarTitle}>MIS RESERVAS</Text>
      </View>

      <TouchableOpacity style={ListCarStyles.addButton} onPress={() => requestDate()}>
        <Text style={ListCarStyles.addButtonText}>Nueva Reserva</Text>
      </TouchableOpacity>

      <ScrollView>
        {data.length > 0 ?

          data.map((doc) => (

            <View style={{ backgroundColor: "#63caa7", padding: 10, borderRadius: 14, elevation: 7, margin: 4 }} >
             

                <Text style={{ fontWeight: "bold", fontSize: RFValue(18) }} > GARAJE </Text>
                <Text style={{ fontWeight: "bold", fontSize: RFValue(16) }} > Descripción: <Text style={{ fontWeight: "normal" }}>{doc.data.offer.garage.description}</Text> </Text>
                <Text style={{ fontWeight: "bold", fontSize: RFValue(16) }} > Dirección: <Text style={{ fontWeight: "normal" }}>{doc.data.offer.garage.address}</Text> </Text>
                <Text>______</Text>
                <Text style={{ fontWeight: "bold", fontSize: RFValue(18) }} > Fecha Reserva: </Text>
                <Text style={{ fontWeight: "bold", fontSize: RFValue(16) }} > Fecha: <Text style={{ fontWeight: "normal" }}>{doc.data.offer.beginDate}</Text> </Text>
                <Text style={{ fontWeight: "bold", fontSize: RFValue(16) }} > Lapso: <Text style={{ fontWeight: "normal" }}>{doc.data.offer.startHour.toString().slice(0, -2) + ":" + doc.data.offer.startHour.toString().slice(-2) + " - " + doc.data.offer.endHour.toString().slice(0, -2) + ":" + doc.data.offer.endHour.toString().slice(-2)}</Text> </Text>
                <Text style={{ fontWeight: "bold", fontSize: RFValue(16) }} > Costo (por el total del lapso): <Text style={{ fontWeight: "normal" }}>{doc.data.totalAccordedPrice} Bs</Text> </Text>
                <Text style={{ fontWeight: "bold", fontSize: RFValue(16) }} > Vehículo: </Text>
                <Text style={{ fontWeight: "normal" }}>Descripción: {doc.data.offer.vehicle.description}</Text>
                <Text style={{ fontWeight: "normal" }}>Placa: {doc.data.offer.vehicle.plate}</Text>

                <View style={stylesNf.horizontal}>

                  <TouchableOpacity style={{ backgroundColor: "#ffc172", padding: 4, alignSelf: "center", borderRadius: 9 }}

                  >
                    <Text>Rechazar</Text>
                  </TouchableOpacity>

                </View>


            </View>
          ))


          :
          <Text>Aún sin reservas</Text>
        }
      </ScrollView>


    </View>
  );
};

export default HomeDates;
