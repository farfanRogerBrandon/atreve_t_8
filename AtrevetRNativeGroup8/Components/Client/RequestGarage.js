import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Touchable, TouchableOpacity, Modal, Button, Alert, Image, ScrollView } from 'react-native';
import { stylesNf } from '../../Styles/FormOffersStyles';
import { GetTimeTable, SaveCalendar } from '../../Data/CalendarGarageData';
import { RFValue } from 'react-native-responsive-fontsize';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import stylesMap from "../../Styles/GarageRequest"
//import DateTimePicker from 'react-native-modal-datetime-picker';
import DateTimePicker from "@react-native-community/datetimepicker"
import MapView, { Marker } from 'react-native-maps';
import { getAllGarages } from '../../Data/GetAllGarages';
import { GetDateTraducedWithOutH } from '../../Tools/TransformDate';
import { FontAwesome } from '@expo/vector-icons';


const RequestGarage = () => {

    const [garages, setGarages] = useState([]);

    const [heightMap, setHeight] = useState(550);


    const [garage, setGarage] = useState(null);



    const [daysData, setDaysData] = useState([]);

    const [specialDays, setSpecialDays] = useState([]);

    const [modalVisible, setModalVisible] = useState(false);


    useEffect(() => {
        getGarages();
    }, [])


    const getGarages = async () => {
        let res = await getAllGarages();

        setGarages(res);

    }



    const selectGarage = async (garage) => {
        console.log("Hola");

        setHeight(430);
        console.log("Hola");
        setGarage(garage);
    }




    const renderItem = ({ item }) => (
        <View style={stylesNf.container2}>

            <Text style={{ color: "#26798e", fontWeight: "bold", fontSize: RFValue(20) }}>{item.day}</Text>
            <View style={stylesNf.horizontal}>
                <Text style={{ fontSize: RFValue(14) }}>Periodos de disponibilidad:</Text>
            </View>
            <FlatList
                data={item.periods}

                renderItem={({ item: ite }) =>
                    <>
                        <View style={stylesNf.horizontal} >
                            <FontAwesome name="clock-o" size={RFValue(25)} color="black" style={{ margin: 5 }} />
                            <Text style={{ margin: 8, fontSize: RFValue(16), color: "#00c0a9", fontWeight: "bold" }} >{ite.startHour != 0 ? ite.startHour.toString().slice(0, -2) + ":" + ite.startHour.toString().slice(-2) : "00:00"} a {ite.endHour.toString().slice(0, -2) + ":" + ite.endHour.toString().slice(-2)}</Text>
                           
                        </View>

                    </>
                }




                keyExtractor={(item, index) => index.toString()}
                horizontal={false}
            />
        </View>
    );



    const renderSpecialItem = ({ item }) => (
        <View style={stylesNf.container2}>

            <Text style={{ color: "#267912", fontWeight: "bold", fontSize: RFValue(20) }}>{GetDateTraducedWithOutH(item.day)}</Text>
            <View style={stylesNf.horizontal}>
                <Text style={{ fontSize: RFValue(14) }}>Periodos de disponibilidad:</Text>
            </View>
            <FlatList
                data={item.periods}

                renderItem={({ item: ite }) =>
                    <>
                        <View style={stylesNf.horizontal} >
                            <FontAwesome name="clock-o" size={RFValue(25)} color="black" style={{ margin: 5 }} />
                            <Text style={{ margin: 8, fontSize: RFValue(16), color: "#00c0a9", fontWeight: "bold" }} >{ite.startHour != 0 ? ite.startHour.toString().slice(0, -2) + ":" + ite.startHour.toString().slice(-2) : "00:00"} a {ite.endHour.toString().slice(0, -2) + ":" + ite.endHour.toString().slice(-2)}</Text>
                       
                        </View>

                    </>
                }




                keyExtractor={(item, index) => index.toString()}
                horizontal={false}
            />
        </View>
    );





    return (

        <View style={styles.container}>
            <Modal
                style={

                    {
                        justifyContent: "center", alignItems: "center", alignSelf: "center",



                    }}
                transparent={true}
                animationType="slide"

                visible={modalVisible}
                onRequestClose={() => {

                    setModalVisible(!modalVisible);
                }}>
                <View style={{ alignSelf: "center", justifyContent: "center", height: "77%", marginTop:10 }}>

                    <View style={{ backgroundColor: "#ffe3b3", borderRadius: 25, padding: RFValue(15), elevation: 5 }}>
            <Text style={{ alignSelf: "center", color: "#63caa7", fontWeight: "bold", fontSize: RFValue(20) }}>Disponibilidad Semanal del Garaje</Text>
                        
                    {
                daysData != [] ?
                    <FlatList
                        data={daysData}
                        renderItem={renderItem}
                        keyExtractor={(item, index) => index.toString()}
                        style={{ height: RFValue(260) }}
                    />
                    : ""

            }
            <Text style={{ alignSelf: "center", color: "#63caa7", fontWeight: "bold", fontSize: RFValue(20) }}>Días Especiales</Text>

                        
            {
                specialDays != [] ?
                    <FlatList
                        style={{ elevation: 5 }}
                        data={specialDays}
                        renderItem={renderSpecialItem}
                        keyExtractor={(item, index) => index.toString()}
                    />
                    : ""

            }
                        
                        
                    <TouchableOpacity onPress={()=>{setModalVisible(false)}}><Text>Volver</Text></TouchableOpacity>
                        </View></View>
                    
                    
                    
                    
                    </Modal>
            <Text style={{ color: "white", fontWeight: "bold", fontSize: RFValue(20), alignSelf: "center" }}>Escoja un Garaje</Text>
            <View style={[stylesMap.myMapContainer3, { height: RFValue(heightMap) }]}>
                <MapView
                    onPress={() => {
                        if (heightMap != 550) {
                            setHeight(550);
                        }
                    }}

                    style={[stylesMap.MyMap2, { height: RFValue(heightMap) }]}
                    initialRegion={{
                        latitude: -17.396844

                        ,
                        longitude: -66.159927,
                        latitudeDelta: 0.0041022,
                        longitudeDelta: 0.00421,
                    }}

                >
                    <Marker


                        coordinate={{
                            latitude: -17.396844
                            ,
                            longitude: -66.159927,
                        }}
                        title="Mi ubicación"
                        description="Mi ubi"
                    >
                        <Image source={require("../../assets/UserPoint.gif")} style={{ width: 30, height: 80, alignSelf: "center", justifyContent: "center", padding: 10, paddingHorizontal: 40 }}></Image>

                    </Marker>

                    {
                        garages.length > 0 ?

                            garages.map((g) => (
                                <Marker key={g.id}

                                    onPress={() => {
                                        selectGarage(g)
                                    }}
                                    coordinate={{
                                        latitude: g.data().location.latitude
                                        ,
                                        longitude: g.data().location.longitude,
                                    }}
                                    title="Garaje"
                                    description={g.data().description}
                                >
                                    <Image source={require("../../assets/GaragePoint.gif")} style={{ width: 30, height: 80, alignSelf: "center", justifyContent: "center", padding: 10, paddingHorizontal: 40 }}></Image>

                                </Marker>
                            ))

                            : ""
                    }




                </MapView>


                {
                    garage != null ?

                        <View style={{ width: "100%", height: 200, borderTopLeftRadius: 20, borderTopRightRadius: 20, marginBottom: "auto", marginTop: -20, backgroundColor: "beige" }}>
                            <ScrollView style={{ width: "100%", height: 200 }}>

                                <Text style={{ margin: 8, fontSize: RFValue(16), color: "#00c0a9", fontWeight: "bold" }} >
                                    Descripción: {garage.data().description}
                                </Text>
                                <Text style={{ margin: 8, fontSize: RFValue(16), color: "#00c0a9", fontWeight: "bold" }} >
                                    Dimensiones de cada espacio:{garage.data().width}mts. de ancho, {garage.data().height}mts. de alto y {garage.data().length}mts. de largo

                                </Text>
                                <Text style={{ margin: 8, fontSize: RFValue(16), color: "#00c0a9", fontWeight: "bold" }} >
                                    Cantidad de espacios máxima: {garage.data().spaces}
                                </Text>
                                <Text style={{ margin: 8, fontSize: RFValue(16), color: "#00c0a9", fontWeight: "bold" }} >
                                    Calificación Promedio: {garage.data().rating}
                                </Text>

                                <Text style={{ margin: 8, fontSize: RFValue(16), color: "#00c0a9", fontWeight: "bold" }} >
                                    Dirección: {garage.data().address}
                                </Text>
                                <View style={stylesNf.horizontal}>

                                    <TouchableOpacity onPress={() => { setHeight(550), setGarage(null) }} >
                                        <Text>Cerrar</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={()=>{ setDaysData(garage.data().timeTable); setSpecialDays(garage.data().specialDates);setModalVisible(true);}}>
                                        <Text>Ver periodos disponibles</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity>
                                        <Text>Enviar Oferta</Text>
                                    </TouchableOpacity>
                                </View>




                            </ScrollView>





                        </View>

                        :
                        ""
                }

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

export default RequestGarage;