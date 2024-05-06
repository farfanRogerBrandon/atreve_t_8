import React, { useEffect, useState } from 'react';
import { StatusBar } from "expo-status-bar";
import { View, Text, TextInput, TouchableOpacity, ScrollView, FlatList, Alert } from 'react-native';
import ListGaragesStyles from '../../Styles/ListGaragesStyles';
import Icon from 'react-native-vector-icons/FontAwesome';
import { getGarages } from '../../Data/GaragesGet';
import { logicalDeleteGarageById } from '../../Data/GarageEdit';
import { FontAwesome6 } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ListGarages = (props) => {
    const [data, setData] = useState([]);

    const getGaragesList = async (id) => {
        try {
            let newData = await getGarages(id)
            setData(newData);
            console.log(newData);
        } catch (error) {
            console.log(error);
        }
    };

    const handleDelete = async (garageId) => {
        try {
            await logicalDeleteGarageById(garageId);
            Alert.alert('Eliminado', 'El garaje se elimino con exito');
            // Perform any additional actions after successful deletion
        } catch (error) {
            console.error('Error deleting garage:', error);
            // Handle error (e.g., display error message)
        }
    };

    const [myuser, setuser] = useState("");

  var muser = "";
  const getLocalUser = async () => {
    try {
      muser = await AsyncStorage.getItem("user");
      let muserJson = muser ? JSON.parse(muser) : null;
      setuser(muserJson);
      await getGaragesList(muserJson.id);
    }
    catch (e) {
      console.error(e);
    }
  }

  useEffect(()=>{
    getLocalUser();
  }, [])

    const renderItem = ({ item, index }) => {
        return (
            <View >
                <TouchableOpacity style={{backgroundColor:"#26798e", alignSelf:"flex-start", padding:6, borderRadius:30}} 
                    onPress={()=>props.navigation.navigate("Calendar", {id:item.id})}
                >
                <FontAwesome6 name="calendar-alt" size={RFValue(28)} color="white" />
                </TouchableOpacity>
                <View style={ListGaragesStyles.row}>
                    <Text style={[ListGaragesStyles.cell, { width: 200 }]}>{item.address}</Text>
                    <Text style={[ListGaragesStyles.cell, { width: 90 }]}>{item.height}</Text>
                    <Text style={[ListGaragesStyles.cell, { width: 90 }]}>{item.width}</Text>
                    <Text style={[ListGaragesStyles.cell, { width: 90 }]}>{item.length}</Text>
                    <Text style={[ListGaragesStyles.cell, { width: 90 }]}>{item.cost}</Text>
                    <Text style={[ListGaragesStyles.cell, { width: 100 }]}>{item.spaces}</Text>
                    <Text style={[ListGaragesStyles.cell, { width: 150 }]}>{item.description}</Text>
                    <Text style={[ListGaragesStyles.cell, { width: 80 }]}>
                        <TouchableOpacity style={ListGaragesStyles.editButton} key={item.id}
                            onPress={() => props.navigation.navigate('EditGarage', { garageId: item.id })} >
                            <Icon style={ListGaragesStyles.edit} name="edit" size={30} />
                        </TouchableOpacity>
                    </Text>
                    <Text style={[ListGaragesStyles.cell, { width: 80 }]}>
                        <TouchableOpacity style={ListGaragesStyles.editDelete}
                            onPress={() => handleDelete(item.id)}>
                            <Icon style={ListGaragesStyles.delete} name="trash" size={30} />
                        </TouchableOpacity>
                    </Text>
                </View>
            </View>

        )
    }

    return (
        <View style={ListGaragesStyles.container}>
            <View style={ListGaragesStyles.headerTopBar}>
                <Text style={ListGaragesStyles.headerTopBarTitle}>Mis Garajes</Text>
            </View>

            <TouchableOpacity style={ListGaragesStyles.addButton} onPress={() => props.navigation.navigate('CreateGarage')}>
                <Text style={ListGaragesStyles.addButtonText}>Agregar Garaje</Text>
            </TouchableOpacity>

            <ScrollView horizontal>
                <View style={ListGaragesStyles.listContainer}>
                    <View style={ListGaragesStyles.header}>
                        <Text style={[ListGaragesStyles.headerText, { width: 200 }]}>Direccion</Text>
                        <Text style={[ListGaragesStyles.headerText, { width: 90 }]}>Altura</Text>
                        <Text style={[ListGaragesStyles.headerText, { width: 90 }]}>Ancho</Text>
                        <Text style={[ListGaragesStyles.headerText, { width: 90 }]}>Largo</Text>
                        <Text style={[ListGaragesStyles.headerText, { width: 90 }]}>Costo</Text>
                        <Text style={[ListGaragesStyles.headerText, { width: 100 }]}>Espacios</Text>
                        <Text style={[ListGaragesStyles.headerText, { width: 150 }]}>Descripcion</Text>
                        <Text style={[ListGaragesStyles.headerText, { width: 80 }]}>Editar</Text>
                        <Text style={[ListGaragesStyles.headerText, { width: 80 }]}>Eliminar</Text>
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

export default ListGarages;
