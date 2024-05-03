import React, { useEffect, useState } from 'react';
import { StatusBar } from "expo-status-bar";
import { View, Text, TextInput, TouchableOpacity, ScrollView, FlatList, Alert, ActivityIndicator, Modal } from 'react-native';
import ListCarStyles from '../../Styles/ListCarsStyles';
import Icon from 'react-native-vector-icons/FontAwesome';
import { getCars } from '../../Data/CarsGet';
import { logicalDeleteCarById } from '../../Data/CarsEdit';

import * as Location from 'expo-location';
import { useNavigation, useRoute } from '@react-navigation/native';
import { collection, doc, getFirestore, onSnapshot, query, updateDoc, where } from 'firebase/firestore';
import appFirebase from '../../Data/firebaseConfig';
import MapMaker from '../../Tools/Maper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GetDateTraducedWithOutH } from '../../Tools/TransformDate';
import { RFValue } from 'react-native-responsive-fontsize';
import { stylesNf } from '../../Styles/FormOffersStyles';
import { AcceptOffer, RejectOffer, makeCostOffer } from '../../Data/Negociation';
const db = getFirestore(appFirebase);

const NegociationClient = () => {
  const n = useNavigation();
  const r = useRoute();

  const { offer } = r.params;

  const [currentPrice, setCurrentPrice] = useState(offer.data.cost);
  const [priceo, setPriceo] = useState(offer.data.cost);
  const [msg, setMsg] = useState("");


  const [priceOfs, setPricesOfs] = useState([]);

  const [modal2Visible, setModal2Visible] = useState(false);

  const [unSub, setUnsub] = useState(null)


  const [iOffer, setIOffer] = useState(true);

  useEffect(() => {
    susc();
  }, [])


  var canUp = true;


  const receiveMsg = async (msg, cost, ref)=>{
           let c =cost;
           
           await updateDoc(ref, { statusNegociation: 2 }).then(()=>{
            Alert.alert("Nueva oferta: " + c);
            let obj = {
              cost: c,
              msg: msg,
              im: false
            };
            let arr = [...priceOfs];
            console.log("ARREGLO or ")
            console.log(priceOfs);

            console.log("ARREGLO ANTES DE AÑADIR: ")
            console.log(arr);
            arr.push(obj);
            setPricesOfs(prevPrices => [...prevPrices, obj]);
            console.log(priceOfs);
            setIOffer(false);
            setCurrentPrice(c);
            setMsg("");
            setPriceo(c);
           
           });
            
           
  }
  const susc = async () => {
    try {
      let nro =0;
      const unsub = onSnapshot(doc(db, "offer", offer.id), async (doc) => {
        if (doc.data().statusNegociation == 1 ) {
          try {
                
              nro++;
              console.log(nro);
              await receiveMsg(doc.data().msg, doc.data().cost, doc.ref)            

          } catch (error) {
              console.log(error);
          }

        }


        if(doc.data().status == 1 ){
          Alert.alert("Se le ha rechazado");
          n.replace("HomeDates");
        }

        if(doc.data().status == 2 ){
          Alert.alert("Se le ha aceptado la oferta");
          n.replace("HomeDates");
        }

      }


      )

      //setUnsub(()=>{unsub});

    } catch (error) {
      console.log(error);
    }
  };

  const makeOffer = async () => {

    let res = await makeCostOffer(priceo, msg, offer.id, 0);
    if (res) {
      Alert.alert("", "Se ha enviado su oferta, espere por una respuesta");
      setIOffer(true);
      let obj = {
        cost: priceo,
        msg: msg,
        im: true
      }

      let arr = [...priceOfs];

      arr.push(obj);

      setPricesOfs(arr);
      console.log("MI arreglo");
      console.log(arr);
      setCurrentPrice(priceo);

      setModal2Visible(false);


    }
    else {
      Alert.alert("Error", "Verifique su conexión a internet");
    }



  }


  const acceptOffer =async ()=>{
    try {
      offer.data.cost = currentPrice;
        let res = await AcceptOffer(offer.id, offer);
        if(res){
          n.replace("HomeDates");

          Alert.alert("Se ha guardado");
        }
        else{
       Alert.alert("Error2");

        }

    } catch (error) {
       console.log(error);
       Alert.alert("Error");
    }
  }

  const rejectOffer= async()=>{
    try {
      let res = await RejectOffer(offer.id, 0);
      if(res){
        Alert.alert("Se ha rechazado");

        n.replace("HomeDates");
      }
      else{
     Alert.alert("Error2");

      }

  } catch (error) {
     console.log(error);
        Alert.alert("Error");
      }
  }
  return (
    <View style={[ListCarStyles.container,{backgroundColor:"#a18262"}]}>
      <View style={ListCarStyles.headerTopBar}>
        <Text style={ListCarStyles.headerTopBarTitle}>Oferta en disputa:</Text>
      </View>
      <Modal
        style={

          {
            justifyContent: "center", alignItems: "center", alignSelf: "center",



          }}
        transparent={true}
        animationType="slide"

        visible={modal2Visible}
        onRequestClose={() => {

          setModal2Visible(!modal2Visible);
        }}>
        <View style={{ alignSelf: "center", justifyContent: "center", height: "77%", marginTop: 10 }}>

          <View style={{ backgroundColor: "beige", borderRadius: 25, padding: RFValue(15), elevation: 5 }}>
            <Text style={{ alignSelf: "center", color: "#63caa7", fontWeight: "bold", fontSize: RFValue(20) }}>Ingrese el precio a ofrecer por el total del periodo</Text>

            <TextInput style={stylesNf.input}
              placeholder='Ingrese el precio a ofrecer (Bs)'
              value={priceo + ""}
              onChangeText={(t) => setPriceo(t)}
              keyboardType="numeric"

            ></TextInput>
            <Text>Mensaje</Text>
            <TextInput style={stylesNf.input}
              value={msg}
              onChangeText={(text) => setMsg(text)}
              placeholder='Ingrese un mensaje'>



            </TextInput>

            <TouchableOpacity
              style={{ backgroundColor: "#23498e", padding: 4, alignSelf: "center", borderRadius: 9 }}
              onPress={
                async () => { await makeOffer(); }
              }
            >


              <Text style={{ color: "white" }} >Enviar</Text>


            </TouchableOpacity>






            <TouchableOpacity
              style={{ backgroundColor: "red", padding: 4, margin: 1, alignSelf: "center", borderRadius: 9 }}
              onPress={() => { setModal2Visible(false) }}

            >
              <Text style={{ color: "white" }} >Volver</Text>
            </TouchableOpacity>

          </View>
        </View>
      </Modal>
      <ScrollView>
        <View style={{ backgroundColor: "white", padding: 10, borderRadius: 10, elevation: 7 }}>

          <Text style={{ fontWeight: "bold", fontSize: RFValue(18) }} > GARAJE </Text>
          <Text style={{ fontWeight: "bold", fontSize: RFValue(16) }} > Descripción: <Text style={{ fontWeight: "normal" }}>{offer.data.garage.description}</Text> </Text>
          <Text style={{ fontWeight: "bold", fontSize: RFValue(16) }} > Costo/Hora: <Text style={{ fontWeight: "normal" }}>{offer.data.garage.cost} Bs</Text> </Text>
          <Text style={{ fontWeight: "bold", fontSize: RFValue(16) }} > Dirección: <Text style={{ fontWeight: "normal" }}>{offer.data.garage.address}</Text> </Text>
          <Text style={{ fontWeight: "bold", fontSize: RFValue(16) }} > Estado actual: <Text style={{ fontWeight: "normal" }}>{offer.data.garage.avialability}</Text> </Text>
          
          <Text>______</Text>
          <Text style={{ fontWeight: "bold", fontSize: RFValue(18) }} > OFERTA INICIAL: </Text>
          <Text style={{ fontWeight: "bold", fontSize: RFValue(16) }} > Fecha: <Text style={{ fontWeight: "normal" }}>{}</Text> </Text>
          <Text style={{ fontWeight: "bold", fontSize: RFValue(16) }} > Lapso: <Text style={{ fontWeight: "normal" }}>{offer.data.startHour.toString().slice(0, -2) + ":" + offer.data.startHour.toString().slice(-2) + " - " + offer.data.endHour.toString().slice(0, -2) + ":" + offer.data.endHour.toString().slice(-2)}</Text> </Text>
          <Text style={{ fontWeight: "bold", fontSize: RFValue(18) }} > Costo Inicial Ofrecido (por el total del lapso): <Text style={{ fontWeight: "normal" }}>{offer.data.cost} Bs</Text> </Text>
          <Text style={{ fontWeight: "bold", fontSize: RFValue(15) }} > Ofertante:<Text style={{ fontWeight: "normal" }}>{offer.data.offeror.names + " " + offer.data.offeror.lastnames + " - CI:" + offer.data.offeror.ci} </Text>  </Text>
          <Text style={{ fontWeight: "bold", fontSize: RFValue(16) }} > Vehículo: <Text style={{ fontWeight: "normal" }}>{offer.data.vehicle.description}</Text> </Text>



          <Text style={{ fontWeight: "bold", fontSize: RFValue(19), color: "darkgreen" }}>PRECIOS OFERTADOS:</Text>
          {
            priceOfs.length > 0 ?

              priceOfs.map((item) => {

                if(item.im){
                 return(
                  <View style={{backgroundColor:"#cd9564", padding:10, marginLeft:"auto",  borderRadius:6, margin:5}}>

                  <Text style={{color:"white"}}> Precio ofrecido: {item.cost} Bs </Text>
                  <Text style={{color:"white"}}> Mensaje: {item.msg} </Text>

               </View>
                 )
                }
                else{
                  return(
                    <View style={{backgroundColor:"#986842", padding:10,borderRadius:6, marginRight:"auto", margin:5}}>

                    <Text> Precio ofrecido: {item.cost} Bs </Text>
                    <Text> Mensaje: {item.msg} </Text>

                        </View>
                  )
                }
              })
              : ""
          }

          {
            iOffer ?
              <ActivityIndicator size={RFValue(30)} color="black" style={{ alignSelf: "center" }}></ActivityIndicator>
              :
              <>
                <TouchableOpacity
                  style={{ backgroundColor: "#26798e", padding: 4, alignSelf: "center", borderRadius: 9 }}

                  onPress={async () => { setModal2Visible(true); }}
                >

                  <Text>Hacer Oferta</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={{ backgroundColor: "#63caa7", padding: 4, alignSelf: "center", borderRadius: 9 }}
onPress={()=>acceptOffer()}
                >
                  <Text> Aceptar Oferta</Text>
                </TouchableOpacity>
              </>


          }


          <TouchableOpacity
            style={{ backgroundColor: "red", padding: 4, alignSelf: "center", borderRadius: 9 }}
            onPress={()=>{
              rejectOffer();
            }}
          >

            <Text>Dejar de nogociar y rechazar</Text>
          </TouchableOpacity>

        </View>


      </ScrollView>






    </View>
  );
};

export default NegociationClient;
