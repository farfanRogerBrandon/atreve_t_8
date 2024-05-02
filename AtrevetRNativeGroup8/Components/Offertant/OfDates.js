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
import { GetRentalsByClient, GetRentalsByOf, changeStatusRental } from '../../Data/Rentals';
import { stylesNf } from '../../Styles/FormOffersStyles';
import { RFValue } from 'react-native-responsive-fontsize';
import { TraduceRentalStatus } from '../../Tools/TraduceStatus';
const OfDates = () => {
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
        let res =await  GetRentalsByOf(id);
        
        setData(res);

    } catch (error) {
      console.log(error);
    }
  }


  const changeStatus = async (idRental, status, idGarage, rental)=>{
        let res = await changeStatusRental(idRental,status,idGarage);

        if(res){
            Alert.alert("Éxito", "Se registró");

            if(status ==2){
                n.navigate("Rating_InterfaceOffertant", {rental: rental })
            }
            await getRentals(myuser.id);



        }
        else{
            Alert.alert("Error", "No se registró");

        }




  }

  useEffect(() => {
    getLocalUser();
  }, [])



  return (
    <View style={ListCarStyles.container}>
      <View style={ListCarStyles.headerTopBar}>
        <Text style={ListCarStyles.headerTopBarTitle}>RESERVAS DE MIS GARAJES</Text>
      </View>

     

      <TouchableOpacity onPress={async () => await getLocalUser()}>
        <Text style={ListCarStyles.addButtonText}>Recargar</Text>
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
                <Text style={{ fontWeight: "bold", fontSize: RFValue(16) }} > Monto a COBRAR (por el total del lapso): <Text style={{ fontWeight: "normal" }}>{doc.data.totalAccordedPrice} Bs</Text> </Text>
                <Text style={{ fontWeight: "bold", fontSize: RFValue(16) }} > Vehículo: </Text>
                <Text style={{ fontWeight: "normal" }}>Descripción: {doc.data.offer.vehicle.description}</Text>
                <Text style={{ fontWeight: "normal" }}>Placa: {doc.data.offer.vehicle.plate}</Text>

                <Text style={{ fontWeight: "bold", fontSize: RFValue(16) }} > Cliente: <Text style={{ fontWeight: "normal" }}>{doc.data.offer.user.names+" "+ doc.data.offer.user.lastnames}</Text> </Text>
                

               
                <Text style={{ fontWeight: "normal" }}>ESTADO: {TraduceRentalStatus(doc.data.status)}</Text>

                <View style={stylesNf.horizontal}>

                {
                    doc.data.status==0?
                    <TouchableOpacity style={{ backgroundColor: "#ffc172", padding: 4, alignSelf: "center", borderRadius: 9 }}
                    onPress={()=>{changeStatus(doc.id, 1, doc.data.offer.gID)}}
                        >
                            <Text>Reportar INGRESO del vehículo</Text>
                        </TouchableOpacity>

                        :(
                        doc.data.status == 1 ?
                        <TouchableOpacity style={{ backgroundColor: "darkgreen", padding: 4, alignSelf: "center", borderRadius: 9 }}
                                onPress={()=>{changeStatus(doc.id, 2, doc.data.offer.gID, doc)}}
                            >
                                <Text style={{color:"white"}}>Reportar SALIDA del vehículo</Text>
                            </TouchableOpacity>
                            :""
                        )

                }
                 

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

export default OfDates;
