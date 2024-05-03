import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Touchable, TouchableOpacity, Modal, Button, Alert, Image, ScrollView, TextInput } from 'react-native';
import { stylesNf } from '../../Styles/FormOffersStyles';
import { GetTimeTable, SaveCalendar } from '../../Data/CalendarGarageData';
import { RFValue } from 'react-native-responsive-fontsize';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import stylesMap from "../../Styles/GarageRequest"
//import DateTimePicker from 'react-native-modal-datetime-picker';
import DateTimePicker from "@react-native-community/datetimepicker"
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { SendOffer, VerifyReservesByDate, getAllGarages, getCarsByUser } from '../../Data/GetAllGarages';
import { GetDateTraducedWithOutH, compareDate, getDATEfromTime, getIINDEX } from '../../Tools/TransformDate';
import { FontAwesome } from '@expo/vector-icons';

import AsyncStorage from "@react-native-async-storage/async-storage"
import { Picker } from '@react-native-picker/picker';
import { useNavigation, useRoute } from '@react-navigation/native';
const RequestGarage = () => {

    const [garages, setGarages] = useState([]);
    const [cars, setCars] = useState([]);

    const [heightMap, setHeight] = useState(550);


    const [garage, setGarage] = useState(null);



    const [daysData, setDaysData] = useState([]);

    const [specialDays, setSpecialDays] = useState([]);

    const [modalVisible, setModalVisible] = useState(false);

    const [myuser, setuser] = useState("");

    const [sDate, setTitulationDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);

    const [isTimeStartPickerVisible, setTimeStartPickerVisibility] = useState(false);
    const [selectedStartTime, setSelectedStartTime] = useState(null);



    const [isTimeENDPickerVisible, setTimeENDPickerVisibility] = useState(false);
    const [selectedENDTime, setSelectedENDTime] = useState(null);



    const [selectedCar, setSelectedCar] = useState({});

    const [modal2Visible, setModal2Visible] = useState(false);

    const [isAvailable, setAvailable] = useState(false);


    const [priceo, setPriceo] = useState("");
    const [msg, setMsg] = useState("");


    const n = useNavigation();
    const r = useRoute();

    const { location } = r.params;
    const handleDateChange = (event, date) => {

        setShowDatePicker(false);
        if (date !== undefined) {
            setTitulationDate(date);
        }
    };


    const handleTimeStartConfirm = (time) => {
        setSelectedStartTime(time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }));
        console.log(selectedStartTime);
        setTimeStartPickerVisibility(false);
    };


    const handleTimeENDConfirm = (time) => {
        setSelectedENDTime(time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }));
        setTimeENDPickerVisibility(false);

    };



    var muser = "";
    const getLocalUser = async () => {
        try {
            muser = await AsyncStorage.getItem("user");
            let muserJson = muser ? JSON.parse(muser) : null;
            setuser(muserJson);
            await getCars(muserJson.id);
        }
        catch (e) {
            console.error(e);
        }
    }



    useEffect(() => {
        getLocalUser();
        getGarages();

    }, [])

    const getCars = async (id) => {
        let c = await getCarsByUser(id);
        console.log(c);
        setCars(c);
    }
    const getGarages = async () => {
        let res = await getAllGarages();

        setGarages(res);

    }





    const selectGarage = async (garage) => {
        console.log("Hola");

        setHeight(400);
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



    const verifyAvailability = async () => {
        try {
             //verifiquemos si entra, lugo si hay reservas que choquen, luego si el periodo entra en medio de periodos disponible, verificar día especial
        if (garage.data().height < selectedCar.height || garage.data().width < selectedCar.width || garage.data().length < selectedCar.length) {
            Alert.alert("No disponible", "Las dimensiones del vehículo son mayores a las del espacio del garaje");

            return;

        }
        let start = parseFloat(selectedStartTime.replace(":", ""));
        let end = parseFloat(selectedENDTime.replace(":", ""));



        let n = await VerifyReservesByDate(sDate, start, end, garage.id);

        if (n >= garage.data().spaces) {
            Alert.alert("No disponible", "EL garaje ya cuenta con " + n + " reservas en el periodo seleccionado, lo que supera el número de espacios disponibles");

            return;
        }



        let indexSpecialDay = specialDays.findIndex(x => compareDate(getDATEfromTime(x.day), sDate) == true)

        let isEnable = false;
        if (indexSpecialDay != -1) {
            console.log("ES DÏA ESPECIAL: ", indexSpecialDay);

            specialDays[indexSpecialDay].periods.forEach(p => {
                if ((start >= p.startHour && end <= p.endHour)) {
                    isEnable = true;
                }
            });

            if (!isEnable) {
                Alert.alert("No disponible", "La fecha ingresada corresponde a un día especial del garaje, dichos periodos no cumplen con sus requisitos que acaba de especificar, verifique lo periodos de disponibilidad del garaje");
                return;
            }
        }
        else {

            let dayIndex = getIINDEX(sDate);


            console.log("No es especial ", dayIndex);

            daysData[dayIndex].periods.forEach(p => {
                if ((start >= p.startHour && end <= p.endHour)) {
                    isEnable = true;
                }
            })
            if (!isEnable) {
                Alert.alert("No disponible", "El garaje no tiene un periodo en el día específicado que cumpla con los requisitos solicitados, verifique los periodos de disponibilidad del garaje");
                return;
            }

        }
        if (isEnable) {
            Alert.alert("Disponible", "El garaje puede recibirlo en la fecha y periodos seleccionados, ingrese el precio que ofrece por el total de horas");

            setAvailable(true);
        }
        else {
            Alert.alert("NO ES ENABLE");

        }



        console.log(sDate);



        } catch (error) {
            console.log(error);
        }
       



    }


    const sendOffer = async () => {
        try {
            let start = parseFloat(selectedStartTime.replace(":", ""));
        let end = parseFloat(selectedENDTime.replace(":", ""));

        let data = {
            cost: parseFloat(priceo),
            beginDate: sDate,
            endDate: sDate,
            startHour: start,
            endHour: end,
            gID: garage.id,
            garage: garage.data(),
            msg: msg,
            user: myuser.data,
            garageRef: "",
            offeror: {},
            registrationDate: new Date(),
            updateDate: new Date(),
            status: 3,
            vehicle: selectedCar.toJSON(),
            statusNegociation: 2
        }

        let res = await SendOffer(data)
        if (res != "") {
            Alert.alert("Éxito", "Se ha enviado su oferta, espere por una respuesta del ofertante");
            
            n.navigate("NegociationClient", {offer:res});
        }
        else {
            Alert.alert("Error", "Ha ocurrido un error inesperado, verifique su conexión");

        }
        } catch (error) {
            console.log(error);
        }
        
    }
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
                <View style={{ alignSelf: "center", justifyContent: "center", height: "77%", marginTop: 10 }}>

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


                        <TouchableOpacity onPress={() => { setModalVisible(false) }}><Text>Volver</Text></TouchableOpacity>
                    </View></View>




            </Modal>
            <Text style={{ color: "white", fontWeight: "bold", fontSize: RFValue(20), alignSelf: "center" }}>Escoja un Garaje</Text>
            <View style={[stylesMap.myMapContainer3, { height: RFValue(heightMap) }]}>
                <MapView

provider={PROVIDER_GOOGLE}
                    onPress={() => {
                        if (heightMap != 550) {
                            setHeight(550);
                        }
                    }}

                    style={[stylesMap.MyMap2, { height: RFValue(heightMap) }]}
                    initialRegion={{
                        latitude: location.latitude

                        ,
                        longitude: location.longitude,
                        latitudeDelta: 0.0041022,
                        longitudeDelta: 0.00421,
                    }}

                >
                    <Marker


                        coordinate={{
                            latitude: location.latitude
                            ,
                            longitude: location.longitude
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

                        <View style={{ width: "100%", height: 280, borderTopLeftRadius: 20, borderTopRightRadius: 20, marginBottom: "auto", marginTop: -20, backgroundColor: "beige" }}>
                            <ScrollView style={{ width: "100%", height: 100 }}>
                                <View style={stylesNf.horizontal}>

                                    <TouchableOpacity onPress={() => { setHeight(550), setGarage(null) }} style={{ backgroundColor: "#ffc172", padding: 4, alignSelf: "center", borderRadius: 9 }} >
                                        <Text>Cerrar</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => { setDaysData(garage.data().timeTable); setSpecialDays(garage.data().specialDates); setModalVisible(true); }}
                                        style={{ backgroundColor: "#63caa7", padding: 4, alignSelf: "center", borderRadius: 9 }}
                                    >
                                        <Text>Ver periodos disponibles</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={{ backgroundColor: "#26798e", padding: 4, alignSelf: "center", borderRadius: 9 }}
                                        onPress={() => { setModal2Visible(true); setAvailable(false); }}

                                    >
                                        <Text style={{ color: "white" }} >Enviar Oferta</Text>
                                    </TouchableOpacity>



                                </View>

                                <Text style={{ margin: 8, fontSize: RFValue(16), color: "#00c0a9", fontWeight: "bold" }} >
                                    Descripción: {garage.data().description}
                                </Text>
                                <Text style={{ margin: 8, fontSize: RFValue(16), color: "#00c0a9", fontWeight: "bold" }} >
                                    Dimensiones de cada espacio: <Text style={{ fontWeight: "normal" }}>{garage.data().width}mts. de ancho, {garage.data().height}mts. de alto y {garage.data().length}mts. de largo</Text>

                                </Text>
                                <Text style={{ margin: 8, fontSize: RFValue(16), color: "#00c0a9", fontWeight: "bold" }} >
                                    Cantidad de espacios máxima: <Text style={{ fontWeight: "normal" }}>{garage.data().spaces}</Text>


                                </Text>
                                <Text style={{ margin: 8, fontSize: RFValue(16), color: "#00c0a9", fontWeight: "bold" }} >
                                    Calificación Promedio: {garage.data().rating}
                                </Text>
                                <Text style={{ margin: 8, fontSize: RFValue(16), color: "#00c0a9", fontWeight: "bold" }} >
                                    Costo Bs/hora: {garage.data().cost}
                                </Text>

                                <Text style={{ margin: 8, fontSize: RFValue(16), color: "#00c0a9", fontWeight: "bold" }} >
                                    Dirección: {garage.data().address}
                                </Text>




                            </ScrollView>





                        </View>

                        :
                        ""
                }

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

                    <View style={{ backgroundColor: "#ffe3b3", borderRadius: 25, padding: RFValue(15), elevation: 5 }}>
                        <Text style={{ alignSelf: "center", color: "#63caa7", fontWeight: "bold", fontSize: RFValue(20) }}>Seleccione la fecha y los horarios que requeríra el garaje y verifique la disponibilidad</Text>
                        <Text style={{ alignSelf: "flex-start", color: "black", fontWeight: "bold", fontSize: RFValue(15) }}>
                            Fecha:
                        </Text>

                        <Text onPress={() => setShowDatePicker(true)}>{sDate != null ? sDate.toLocaleDateString() : "Ingrese la fecha"}</Text>
                        {showDatePicker && (
                            <DateTimePicker
                                value={sDate}
                                mode="date"
                                display="default"
                                onChange={handleDateChange}
                                style={stylesNf.dateTimePicker}
                            />

                        )}


                        <Text style={{ alignSelf: "flex-start", color: "black", fontWeight: "bold", fontSize: RFValue(15) }}>
                            Hora Inicio:
                        </Text>
                        <View >
                            <TouchableOpacity onPress={() => setTimeStartPickerVisibility(true)} style={{ backgroundColor: "#63caa7", padding: 5, borderRadius: 8 }} ><Text>Seleccionar Hora fin</Text></TouchableOpacity>
                            {selectedStartTime && <Text>Hora seleccionada: {selectedStartTime}</Text>}
                            <DateTimePickerModal
                                isVisible={isTimeStartPickerVisible}
                                mode="time"
                                is24Hour={true}
                                onConfirm={handleTimeStartConfirm}
                                onCancel={() => setTimeStartPickerVisibility(false)}
                            />
                        </View>

                        <Text style={{ alignSelf: "flex-start", color: "black", fontWeight: "bold", fontSize: RFValue(15) }}>
                            Hora Fin:
                        </Text>

                        <View >
                            <TouchableOpacity onPress={() => setTimeENDPickerVisibility(true)} style={{ backgroundColor: "#63caa7", padding: 5, borderRadius: 8 }}  ><Text>Seleccionar Hora Fin</Text></TouchableOpacity>
                            {selectedStartTime && <Text>Hora seleccionada: {selectedENDTime}</Text>}
                            <DateTimePickerModal
                                isVisible={isTimeENDPickerVisible}
                                mode="time"
                                is24Hour={true}
                                onConfirm={handleTimeENDConfirm}
                                onCancel={() => setTimeENDPickerVisibility(false)}
                            />
                        </View>
                        <Text style={{ alignSelf: "flex-start", color: "black", fontWeight: "bold", fontSize: RFValue(15) }}>
                            Vehículo:
                        </Text>

                        <Picker style={stylesNf.input} selectedValue={selectedCar} onValueChange={(itemValue) => { console.log(itemValue); setSelectedCar(itemValue) }}>

                            {cars.length > 0 ?
                                cars.map((item) => (
                                    <Picker.Item key={item.id} label={item.plate + " " + item.description} value={item} />

                                ))
                                : ""
                            }



                        </Picker>

                        {
                            isAvailable ?
                                <>
                                    <Text style={{ fontWeight: "bold" }}>Precio a ofrecer(por el total del periodo ingresado) Bs</Text>

                                    <TextInput style={stylesNf.input}
                                        placeholder='Ingrese el precio a ofrecer (Bs)'
                                        value={priceo + ""}
                                        onChangeText={(t) => setPriceo(t)}
                                        keyboardType="numeric"
returnKeyType="done"
                                    ></TextInput>
                                    <Text>Precio estimado del garaje (por hora) {garage.data().cost} Bs</Text>
                                    <TextInput style={stylesNf.input}
                                        value={msg}
                                        onChangeText={(text) => setMsg(text)}
                                        placeholder='Ingrese un mensaje'>



                                    </TextInput>

                                    <TouchableOpacity
                                        style={{ backgroundColor: "#23498e", padding: 4, alignSelf: "center", borderRadius: 9 }}
                                        onPress={() => {
                                            sendOffer();

                                        }}
                                    >


                                        <Text style={{ color: "white" }} >ENVIAR OFERTA</Text>


                                    </TouchableOpacity>


                                </>


                                :
                                <TouchableOpacity
                                    style={{ backgroundColor: "#26798e", padding: 4, alignSelf: "center", borderRadius: 9 }}
                                    onPress={() => {
                                        verifyAvailability();

                                    }}
                                >
                                    <Text style={{ color: "white" }} >Verificar Disponibilidad</Text>


                                </TouchableOpacity>

                        }




                        <TouchableOpacity
                            style={{ backgroundColor: "red", padding: 4, margin: 1, alignSelf: "center", borderRadius: 9 }}
                            onPress={() => { setModal2Visible(false) }}

                        >
                            <Text style={{ color: "white" }} >Volver</Text>
                        </TouchableOpacity>

                    </View>
                </View>
            </Modal>
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