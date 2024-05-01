import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Touchable, TouchableOpacity, Modal, Button, Alert } from 'react-native';
import { stylesNf } from '../../Styles/FormOffersStyles';
import { GetTimeTable, SaveCalendar } from '../../Data/CalendarGarageData';
import { RFValue } from 'react-native-responsive-fontsize';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import DateTimePicker from "@react-native-community/datetimepicker"

import { FontAwesome, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons"
import { GetDateTraducedWithOutH, convertToFirestoreTimestamp } from '../../Tools/TransformDate';
//import DateTimePicker from 'react-native-modal-datetime-picker';
const Calendar = () => {
    // Supongamos que estos son los datos para cada día


    const [sDate, setTitulationDate] = useState(new Date());
const [showDatePicker, setShowDatePicker] = useState(false);

    const [daysData, setDaysData] = useState([]);

    const [specialDays, setSpecialDays] = useState([]);


    const [type, setType] = useState(0);
    //#region Not Important now
    const [modalVisible, setModalVisible] = useState(false);

    const [modal2Visible, setModal2Visible] = useState(false);


    const [currentDay, setCurrentDay] = useState([]);


    const [isTimeStartPickerVisible, setTimeStartPickerVisibility] = useState(false);
    const [selectedStartTime, setSelectedStartTime] = useState(null);



    const [isTimeENDPickerVisible, setTimeENDPickerVisibility] = useState(false);
    const [selectedENDTime, setSelectedENDTime] = useState(null);

    //#endregion


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
        console.log(selectedStartTime);
        setTimeENDPickerVisibility(false);

    };



    const getTimeTable = async () => {
        let timeTable = await GetTimeTable("gFS8PibCfpmgGOoA75sw");

        setDaysData(timeTable.timeTable);
        setSpecialDays(timeTable.specialDates);
    }
    useEffect(() => {
        getTimeTable();
    }, [])


    const saveCalendar = async () => {
        let res = await SaveCalendar("gFS8PibCfpmgGOoA75sw", daysData, specialDays)
        if (res) {
            Alert.alert("Éxito", "Se ha guardado con éxito");
        }
    }

    const addNormalPeriod = () => {
        //validamo básico

        let mydaysData = [...daysData];
        console.log("day: ", currentDay);
        let index = mydaysData.findIndex(x => x.day == currentDay);

        console.log(index);

        let start = parseFloat(selectedStartTime.replace(":", ""));
        let end = parseFloat(selectedENDTime.replace(":", ""));
        console.log("START: " + start + " END: " + end);

        let aux = 0;

        if (start > end) {
            aux = start;
            start = end;
            end = aux;
        }
        let r = mydaysData[index].periods.findIndex(x => (start >= x.startHour && start <= x.endHour) || (end >= x.startHour && end <= x.endHour));

        if (r != -1) {
            Alert.alert("Error", "El periodo choca con otros existentes");
            return;
        }
        let period = {
            startHour: start,
            endHour: end
        }

        mydaysData[index].periods.push(period)
        console.log("ALL OK");
        mydaysData[index].periods.sort(sortByHour)



        setDaysData(mydaysData);
        console.log("JP");
        //    console.log(mydaysData);
        setModalVisible(false);




    }


    const addSpecialPeriod = () => {
        //validamo básico

        let mydaysData = [...specialDays];
        console.log("day: ", currentDay);
        let index = mydaysData.findIndex(x => x.day == currentDay);

        console.log(index);

        let start = parseFloat(selectedStartTime.replace(":", ""));
        let end = parseFloat(selectedENDTime.replace(":", ""));
        console.log("START: " + start + " END: " + end);

        let aux = 0;

        if (start > end) {
            aux = start;
            start = end;
            end = aux;
        }
        let r = mydaysData[index].periods.findIndex(x => (start >= x.startHour && start <= x.endHour) || (end >= x.startHour && end <= x.endHour));

        if (r != -1) {
            Alert.alert("Error", "El periodo choca con otros existentes");
            return;
        }
        let period = {
            startHour: start,
            endHour: end
        }

        mydaysData[index].periods.push(period)
        console.log("ALL OK");
        mydaysData[index].periods.sort(sortByHour)



        setSpecialDays(mydaysData);
        console.log("JP");
        //    console.log(mydaysData);
        setModalVisible(false);




    }

    const addPeriod = () => {
        if (type == 0) {
            addNormalPeriod();
        }
        else {
            addSpecialPeriod();
        }
    }

    const deleteNormalPerios = async (day, start, end) => {
        try {
            let mydaysData = [...daysData];
            console.log("day: ", day);
            let index = mydaysData.findIndex(x => x.day == day);

            console.log(index);


            console.log("START: " + start + " END: " + end);



            let aux = 0;

            if (start > end) {
                aux = start;
                start = end;
                end = aux;
            }
            console.log("LLEGO");
            let finalIndex = mydaysData[index].periods.findIndex(x => x.startHour == start && x.endHour == end);
            if (finalIndex != -1) {
                mydaysData[index].periods.splice(finalIndex, 1);

                setDaysData(mydaysData)
            }

        } catch (error) {
            console.log(error);
        }

    }


    const deleteSpecialPerios = async (day, start, end) => {
        try {
            let mydaysData = [...specialDays];
            console.log("day: ", day);
            let index = mydaysData.findIndex(x => x.day == day);

            console.log(index);


            console.log("START: " + start + " END: " + end);



            let aux = 0;

            if (start > end) {
                aux = start;
                start = end;
                end = aux;
            }
            console.log("LLEGO");
            let finalIndex = mydaysData[index].periods.findIndex(x => x.startHour == start && x.endHour == end);
            if (finalIndex != -1) {
                mydaysData[index].periods.splice(finalIndex, 1);

                setSpecialDays(mydaysData)
            }

        } catch (error) {
            console.log(error);
        }

    }
    function sortByHour(a, b) {
        return a.startHour - b.startHour;
    }

const addNewSpecialDay = async()=>{
    try {
        let mydaysData = [...specialDays];
    let newSpecial ={
        day: convertToFirestoreTimestamp(sDate),
        periods:[]
    }


    mydaysData.push(newSpecial);

    setSpecialDays(mydaysData);

    setModal2Visible(false);

    } catch (error) {
        console.log(error);
    }
    
}

const deleteSpecialDay=(item)=>{
    let mydaysData = [...specialDays];
   
    let index = mydaysData.findIndex(x => x == item);

    console.log(index);


   
    if (index != -1) {
        mydaysData.splice(index, 1);

        setSpecialDays(mydaysData)
    }
}

    const renderItem = ({ item }) => (
        <View style={stylesNf.container2}>

            <Text style={{ color: "#26798e", fontWeight: "bold", fontSize: RFValue(20) }}>{item.day}</Text>
            <View style={stylesNf.horizontal}>
                <Text style={{ fontSize: RFValue(14) }}>Periodos de disponibilidad:</Text>
                <TouchableOpacity onPress={() => { setType(0), setCurrentDay(item.day); setModalVisible(true); }} style={{ marginLeft: "auto", marginRight: RFValue(32), backgroundColor: "#63caa7", borderRadius: 10, padding: 3 }}><MaterialIcons name="more-time" size={RFValue(25)} color="black" /></TouchableOpacity>
            </View>
            <FlatList
                data={item.periods}

                renderItem={({ item: ite }) =>
                    <>
                        <View style={stylesNf.horizontal} >
                            <FontAwesome name="clock-o" size={RFValue(25)} color="black" style={{ margin: 5 }} />
                            <Text style={{ margin: 8, fontSize: RFValue(16), color: "#00c0a9", fontWeight: "bold" }} >{ite.startHour != 0 ? ite.startHour.toString().slice(0, -2) + ":" + ite.startHour.toString().slice(-2) : "00:00"} a {ite.endHour.toString().slice(0, -2) + ":" + ite.endHour.toString().slice(-2)}</Text>
                            <TouchableOpacity style={{ backgroundColor: "#FFc172", borderRadius: 10, marginLeft: "auto", marginRight: RFValue(110), marginVertical: 1 }}
                                onPress={() => {

                                    deleteNormalPerios(item.day, ite.startHour, ite.endHour)
                                }}
                            >
                                <Text style={{ alignSelf: "center" }}><MaterialCommunityIcons name="delete-clock" size={RFValue(27)} color="black" /></Text>
                            </TouchableOpacity>
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
                <TouchableOpacity onPress={() => { setType(1); setCurrentDay(item.day); setModalVisible(true); }} style={{ marginLeft: "auto", marginRight: RFValue(32), backgroundColor: "#63caa7", borderRadius: 10, padding: 3 }}><MaterialIcons name="more-time" size={RFValue(25)} color="black" /></TouchableOpacity>
            </View>
            <Text onPress={()=>{deleteSpecialDay(item)}}>Borrar</Text>
            <FlatList
                data={item.periods}

                renderItem={({ item: ite }) =>
                    <>
                        <View style={stylesNf.horizontal} >
                            <FontAwesome name="clock-o" size={RFValue(25)} color="black" style={{ margin: 5 }} />
                            <Text style={{ margin: 8, fontSize: RFValue(16), color: "#00c0a9", fontWeight: "bold" }} >{ite.startHour != 0 ? ite.startHour.toString().slice(0, -2) + ":" + ite.startHour.toString().slice(-2) : "00:00"} a {ite.endHour.toString().slice(0, -2) + ":" + ite.endHour.toString().slice(-2)}</Text>
                            <TouchableOpacity style={{ backgroundColor: "#FFc172", borderRadius: 10, marginLeft: "auto", marginRight: RFValue(110), marginVertical: 1 }}
                                onPress={() => {
                                    deleteSpecialPerios(item.day, ite.startHour, ite.endHour)
                                }}
                            >
                                <Text style={{ alignSelf: "center" }}><MaterialCommunityIcons name="delete-clock" size={RFValue(27)} color="black" /></Text>
                            </TouchableOpacity>
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
                <View style={{ alignSelf: "center", justifyContent: "center", height: "100%" }}>

                    <View style={{ backgroundColor: "#ffc172", borderRadius: 25, padding: RFValue(15), elevation: 5 }}>
                        <Text style={{ fontWeight: "bold", fontSize: RFValue(22), textAlign: "center" }} >
                            Seleccione el nuevo periodo
                        </Text>

                        <Text>Hora Inicio</Text>

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

                        <Text>_______________</Text>
                        <Text>Hora Fin</Text>

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
                        <Text>___________</Text>
                        <View style={[stylesNf.horizontal, { marginTop: 5, alignSelf: "center", alignItems: "center", justifyContent: "center" }]}>
                            <TouchableOpacity

                                onPress={() => setModalVisible(!modalVisible)}
                                style={{ alignSelf: "center", backgroundColor: "red", padding: 10, borderRadius: 10, margin: 10 }}
                            >







                                <Text style={{ color: "white" }}  >Cancelar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{ alignSelf: "center", backgroundColor: "#26798e", padding: 10, borderRadius: 10, margin: 10 }} onPress={() => { addPeriod() }}
                            >


                                <Text style={{ color: "white" }}>Aceptar</Text>
                            </TouchableOpacity>
                        </View>

                    </View>


                </View>
            </Modal>

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
            <Text style={{ alignSelf: "center", color: "#63caa7", fontWeight: "bold", fontSize: RFValue(25) }}>Horarios Especiales</Text>
            <TouchableOpacity onPress={()=>{setModal2Visible(true)}}>
                <Text style={{ color: "#236177", fontWeight: "bold" }}>  Nuevo Horario Especial</Text>
            </TouchableOpacity>


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
                <View style={{ alignSelf: "center", justifyContent: "center", height: "100%" }}>

                    <View style={{ backgroundColor: "#ffc172", borderRadius: 25, padding: RFValue(15), elevation: 5 }}>
                        <Text style={{ fontWeight: "bold", fontSize: RFValue(22), textAlign: "center" }} >
                            Seleccione la fecha
                        </Text>
                        <Text onPress={()=>setShowDatePicker(true)}>{sDate != null ? sDate.toLocaleDateString() : "Ingrese la fecha"}</Text>
                        {showDatePicker && (
                            <DateTimePicker
                                value={sDate}
                                mode="date"
                                display="default"
                                onChange={handleDateChange}
                                style={stylesNf.dateTimePicker}  
                            />

                        )}



                        <View style={[stylesNf.horizontal, { marginTop: 5, alignSelf: "center", alignItems: "center", justifyContent: "center" }]}>
                            <TouchableOpacity

                                onPress={() => setModal2Visible(!modal2Visible)}
                                style={{ alignSelf: "center", backgroundColor: "red", padding: 10, borderRadius: 10, margin: 10 }}
                            >







                                <Text style={{ color: "white" }}  >Cancelar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{ alignSelf: "center", backgroundColor: "#26798e", padding: 10, borderRadius: 10, margin: 10 }} onPress={() => { addNewSpecialDay() }}
                            >


                                <Text style={{ color: "white" }}>Aceptar</Text>
                            </TouchableOpacity>
                        </View>

                    </View>


                </View>
            </Modal>



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





            <View style={[stylesNf.horizontal, { marginTop: 5, alignSelf: "center", alignItems: "center", justifyContent: "center" }]}>
                <TouchableOpacity


                    style={{ alignSelf: "center", backgroundColor: "red", padding: 10, borderRadius: 10, margin: 10 }}
                >







                    <Text style={{ color: "white" }}  >Cancelar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{ alignSelf: "center", backgroundColor: "#26798e", padding: 10, borderRadius: 10, margin: 10 }} onPress={() => { saveCalendar() }}
                >


                    <Text style={{ color: "white" }}>GUARDAR CAMBIOS</Text>
                </TouchableOpacity>
            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 22,
        backgroundColor: "#fff6ed"
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 100,
    },
});

export default Calendar;