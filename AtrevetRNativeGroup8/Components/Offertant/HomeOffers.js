import React, { useEffect, useState } from 'react';
import { StatusBar } from "expo-status-bar";
import { View, Text, TextInput, TouchableOpacity, ScrollView, FlatList, Alert } from 'react-native';
import ListCarStyles from '../../Styles/ListCarsStyles';
import Icon from 'react-native-vector-icons/FontAwesome';
import { getCars } from '../../Data/CarsGet';
import { logicalDeleteCarById } from '../../Data/CarsEdit';

import * as Location from 'expo-location';
import { useNavigation } from '@react-navigation/native';
import { collection, getFirestore, onSnapshot, query, where } from 'firebase/firestore';
import appFirebase from '../../Data/firebaseConfig';
import MapMaker from '../../Tools/Maper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GetDateTraducedWithOutH } from '../../Tools/TransformDate';
import { RFValue } from 'react-native-responsive-fontsize';
import { stylesNf } from '../../Styles/FormOffersStyles';

const db = getFirestore(appFirebase);

const HomeOffers = () => {
  const n = useNavigation();
  const [offers, setOffers] = useState([]);

  const [garagesIds, setGaragesIds] = useState([]);

const [unSub, setUnsub] = useState(null);



  useEffect(() => {
    getLocalUser();
    
  }, [])
  const [myuser, setuser] = useState("");

  var muser = "";

  const getLocalUser = async () => {
    try {
      muser = await AsyncStorage.getItem("user");
      let muserJson = muser ? JSON.parse(muser) : null;
      setuser(muserJson);
      await susc(muserJson.id);
    }
    catch (e) {
      console.error(e);
    }
  }

  const susc = async (iduser) => {
    try {
      const q = await query(collection(db, "offer"), where("status", "==", 3), where("garage.ofid", "==", iduser));

      console.log("Hola")
      const unsubscribe = onSnapshot(q, async (querySnapshot) => {
        const rr = [];
        const promises = querySnapshot.docs.map(async (doc) => {


          let resu = {
            id: doc.id,
            data: doc.data()
          }
          console.log("RESU");
          resu.data.beginDate = GetDateTraducedWithOutH(resu.data.beginDate);
          console.log(resu);

          rr.push(resu);;
        });
        await Promise.all(promises);

        setOffers(rr);
        //  console.log(requests.length);

        // setload(true);

        console.log(rr.length);
      });
      setUnsub(()=>unsubscribe)

    } catch (error) {
      console.log(error);
    }
  };


  return (
    <View style={ListCarStyles.container}>
      <View style={ListCarStyles.headerTopBar}>
        <Text style={ListCarStyles.headerTopBarTitle}>Lista de ofertas para mis garajes:</Text>
      </View>
      <ScrollView>
      {

offers.length > 0 ?
  offers.map((doc) => (

    <View style={{ backgroundColor: "#fdecda", padding: 10, borderRadius: 14, elevation: 7, margin:4 }}>

      <Text style={{ fontWeight: "bold", fontSize: RFValue(18) }} > GARAJE </Text>
      <Text style={{ fontWeight: "bold", fontSize: RFValue(16) }} > Descripción: <Text style={{ fontWeight: "normal" }}>{doc.data.garage.description}</Text> </Text>
      <Text style={{ fontWeight: "bold", fontSize: RFValue(16) }} > Costo/Hora: <Text style={{ fontWeight: "normal" }}>{doc.data.garage.cost} Bs</Text> </Text>
      <Text style={{ fontWeight: "bold", fontSize: RFValue(16) }} > Dirección: <Text style={{ fontWeight: "normal" }}>{doc.data.garage.address}</Text> </Text>
      <Text>______</Text>
      <Text style={{ fontWeight: "bold", fontSize: RFValue(18) }} > OFERTA: </Text>
      <Text style={{ fontWeight: "bold", fontSize: RFValue(16) }} > Fecha: <Text style={{ fontWeight: "normal" }}>{doc.data.beginDate}</Text> </Text>
      <Text style={{ fontWeight: "bold", fontSize: RFValue(16) }} > Lapso: <Text style={{ fontWeight: "normal" }}>{doc.data.startHour.toString().slice(0, -2) + ":" + doc.data.startHour.toString().slice(-2) + " - " + doc.data.endHour.toString().slice(0, -2) + ":" + doc.data.endHour.toString().slice(-2)}</Text> </Text>
      <Text style={{ fontWeight: "bold", fontSize: RFValue(16) }} > Costo (por el total del lapso): <Text style={{ fontWeight: "normal" }}>{doc.data.cost} Bs</Text> </Text>
      <Text style={{ fontWeight: "bold", fontSize: RFValue(15) }} > Cliente:<Text style={{ fontWeight: "normal" }}>{doc.data.user.names + " " + doc.data.user.lastnames + " - CI:" + doc.data.user.ci} </Text>  </Text>
      <Text style={{ fontWeight: "bold", fontSize: RFValue(16) }} > Vehículo: <Text style={{ fontWeight: "normal" }}>{doc.data.vehicle.description}</Text> </Text>

      <View style={stylesNf.horizontal}>

        <TouchableOpacity  style={{ backgroundColor: "#ffc172", padding: 4, alignSelf: "center", borderRadius: 9 }} 
        
        >
          <Text>Rechazar</Text>
        </TouchableOpacity>
        <TouchableOpacity   
          style={{ backgroundColor: "#63caa7", padding: 4, alignSelf: "center", borderRadius: 9 }}
          onPress={()=>{
            unSub();
            Alert.alert("Información", "Acaba de iniciar una negociación con: "+doc.data.user.names);
            n.replace("NegociationOffer", {offer:doc});
          }}
        >
          <Text>Contraofertar</Text>
        </TouchableOpacity>
        <TouchableOpacity   
          style={{ backgroundColor: "#26798e", padding: 4, alignSelf: "center", borderRadius: 9 }}
          
        >
          <Text>Aceptar</Text>
        </TouchableOpacity>
      </View>


    </View>
  ))



  :
  <Text>Esperando ofertas</Text>
}


      </ScrollView>
     




    </View>
  );
};

export default HomeOffers;
