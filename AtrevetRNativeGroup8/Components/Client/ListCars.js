import React, { useEffect, useState } from 'react';
import { StatusBar } from "expo-status-bar";
import { View, Text, TextInput, TouchableOpacity, ScrollView, FlatList, Alert } from 'react-native';
import ListCarStyles from '../../Styles/ListCarsStyles';
import Icon from 'react-native-vector-icons/FontAwesome';
import { getCars } from '../../Data/CarsGet';
import { logicalDeleteCarById } from '../../Data/CarsEdit';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ListCars = (props) => {
    const [data, setData] = useState([]);

    const handleDelete = async (carId) => {
        try {
            await logicalDeleteCarById(carId);
            Alert.alert('Eliminado', 'El auto se elimino con exito');
            // Perform any additional actions after successful deletion
        } catch (error) {
            console.error('Error deleting car:', error);
            // Handle error (e.g., display error message)
        }
    };

    const   getCarsList = async(id)=>{
        try {
            let newData = await getCars(id)
            setData(newData);
            console.log(newData);
        } catch (error) {
            console.log(error);
        }
    }

    const [myuser, setuser] = useState("");

  var muser = "";
  const getLocalUser = async () => {
    try {
      muser = await AsyncStorage.getItem("user");
      let muserJson = muser ? JSON.parse(muser) : null;
      setuser(muserJson);
      await getCarsList(muserJson.id);
    }
    catch (e) {
      console.error(e);
    }
  }

  useEffect(()=>{
    getLocalUser();
  }, []);

    const renderItem = ({item, index}) => {
        return(
            <View style={ListCarStyles.row}>
                <Text style={[ListCarStyles.cell, {width: 100}]}>{item.plate}</Text>
                <Text style={[ListCarStyles.cell, {width: 90}]}>{item.height}</Text>
                <Text style={[ListCarStyles.cell, {width: 90}]}>{item.width}</Text>
                <Text style={[ListCarStyles.cell, {width: 90}]}>{item.length}</Text>
                <Text style={[ListCarStyles.cell, {width: 150}]}>{item.description}</Text>
                <Text style={[ListCarStyles.cell, {width: 90}]}>
                    <TouchableOpacity style={ListCarStyles.editButton} key={item.id}
                    onPress={()=>props.navigation.navigate('EditCar',{carId:item.id})} >
                        <Icon style={ListCarStyles.edit} name="edit" size={30} />
                    </TouchableOpacity>
                </Text>
                <Text style={[ListCarStyles.cell, {width: 90}]}>
                    <TouchableOpacity style={ListCarStyles.deleteButton}
                    onPress={() => handleDelete(item.id)}>
                        <Icon style={ListCarStyles.delete} name="trash" size={30} />
                    </TouchableOpacity>
                </Text>
            </View>
        )
    }

  return (
    <View style={ListCarStyles.container}>
        <View style={ListCarStyles.headerTopBar}>
            <Text style={ListCarStyles.headerTopBarTitle}>Mis autos</Text>
        </View>

        <TouchableOpacity style={ListCarStyles.addButton} onPress={()=>props.navigation.navigate('CreateCar')}>
            <Text style={ListCarStyles.addButtonText}>Agregar Auto</Text>
        </TouchableOpacity>
        
        <ScrollView horizontal>
            <View style={ListCarStyles.listContainer}>
                <View style={ListCarStyles.header}>
                    <Text style={[ListCarStyles.headerText, {width: 100}]}>Placa</Text>
                    <Text style={[ListCarStyles.headerText, {width: 90}]}>Altura</Text>
                    <Text style={[ListCarStyles.headerText, {width: 90}]}>Ancho</Text>
                    <Text style={[ListCarStyles.headerText, {width: 90}]}>Largo</Text>
                    <Text style={[ListCarStyles.headerText, {width: 150}]}>Descripcion</Text>
                    <Text style={[ListCarStyles.headerText, {width: 90}]}>Editar</Text>
                    <Text style={[ListCarStyles.headerText, {width: 90}]}>Eliminar</Text>
                </View>
                <FlatList
                    data={data}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>
        </ScrollView>
    </View>
  );
};

export default ListCars;
