import React, { useEffect, useState } from 'react';
import { StatusBar } from "expo-status-bar";
import { View, Text, TextInput, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import ListGaragesStyles from '../../Styles/ListGaragesStyles';
import Icon from 'react-native-vector-icons/FontAwesome';
import { getGarages } from '../../Data/GaragesGet';

const ListGarages = (props) => {
    const [data, setData] = useState([
        
    ]);

    useEffect(async() => {
        let newData = await getGarages("Iq3zIGu8BQtN3d0Gcuhh")
        setData(newData);
        console.log(newData);
    },[])

    const renderItem = ({item, index}) => {
        return(
            <View style={ListGaragesStyles.row}>
                <Text style={[ListGaragesStyles.cell, {width: 200}]}>{item.data().address}</Text>
                <Text style={[ListGaragesStyles.cell, {width: 90}]}>{item.data().height}</Text>
                <Text style={[ListGaragesStyles.cell, {width: 90}]}>{item.data().width}</Text>
                <Text style={[ListGaragesStyles.cell, {width: 90}]}>{item.data().length}</Text>
                <Text style={[ListGaragesStyles.cell, {width: 90}]}>{item.data().cost}</Text>
                <Text style={[ListGaragesStyles.cell, {width: 100}]}>{item.data().spaces}</Text>
                <Text style={[ListGaragesStyles.cell, {width: 150}]}>{item.data().description}</Text>
                <Text style={[ListGaragesStyles.cell, {width: 150}]}>
                    <Icon style={ListGaragesStyles.edit} name="edit" size={30} />
                    <Icon style={ListGaragesStyles.delete} name="trash" size={30} />
                </Text>
            </View>
        )
    }

  return (
    <View style={ListGaragesStyles.container}>
        <View style={ListGaragesStyles.headerTopBar}>
            <Text style={ListGaragesStyles.headerTopBarTitle}>Mis Garajes</Text>
        </View>

        <TouchableOpacity style={ListGaragesStyles.addButton} onPress={()=>props.navigation.navigate('CreateGarage')}>
            <Text style={ListGaragesStyles.addButtonText}>Agregar Garaje</Text>
        </TouchableOpacity>
        
        <ScrollView horizontal>
            <View style={ListGaragesStyles.listContainer}>
                <View style={ListGaragesStyles.header}>
                    <Text style={[ListGaragesStyles.headerText, {width: 200}]}>Direccion</Text>
                    <Text style={[ListGaragesStyles.headerText, {width: 90}]}>Altura</Text>
                    <Text style={[ListGaragesStyles.headerText, {width: 90}]}>Ancho</Text>
                    <Text style={[ListGaragesStyles.headerText, {width: 90}]}>Largo</Text>
                    <Text style={[ListGaragesStyles.headerText, {width: 90}]}>Costo</Text>
                    <Text style={[ListGaragesStyles.headerText, {width: 100}]}>Espacios</Text>
                    <Text style={[ListGaragesStyles.headerText, {width: 150}]}>Descripcion</Text>
                    <Text style={[ListGaragesStyles.headerText, {width: 150}]}>Editar/Eliminar</Text>
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
