import React, { useState } from 'react';
import { StatusBar } from "expo-status-bar";
import { View, Text, TextInput, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import ListGaragesStyles from '../../Styles/ListGaragesStyles';
import Icon from 'react-native-vector-icons/FontAwesome';

const ListGarages = (props) => {
    const [data, setData] = useState([
        {"licensePlate": "123abc", "height": "4", "width": "3", "lenght": "2.6", "description": "Auto viejo rojo"},
        {"licensePlate": "433gfd", "height": "5", "width": "3.4", "lenght": "3", "description": "Bmw x5"},
        {"licensePlate": "654ggf", "height": "6", "width": "4", "lenght": "4", "description": "Toyota corolla viejo"},
        {"licensePlate": "019gdf", "height": "7", "width": "2.8", "lenght": "3.1", "description": "Verde fiat 500"},
        {"licensePlate": "8573fgd", "height": "8", "width": "3.1", "lenght": "1.9", "description": "Moderno color negro"},
    ]);

    const renderItem = ({item, index}) => {
        return(
            <View style={ListGaragesStyles.row}>
                <Text style={[ListGaragesStyles.cell, {width: 90}]}>{item.licensePlate}</Text>
                <Text style={[ListGaragesStyles.cell, {width: 90}]}>{item.height}</Text>
                <Text style={[ListGaragesStyles.cell, {width: 90}]}>{item.width}</Text>
                <Text style={[ListGaragesStyles.cell, {width: 90}]}>{item.lenght}</Text>
                <Text style={[ListGaragesStyles.cell, {width: 150}]}>{item.description}</Text>
                <Text style={[ListGaragesStyles.cell, {width: 90}]}>
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
                    <Text style={[ListGaragesStyles.headerText, {width: 90}]}>Placa</Text>
                    <Text style={[ListGaragesStyles.headerText, {width: 90}]}>Altura</Text>
                    <Text style={[ListGaragesStyles.headerText, {width: 90}]}>Ancho</Text>
                    <Text style={[ListGaragesStyles.headerText, {width: 90}]}>Largo</Text>
                    <Text style={[ListGaragesStyles.headerText, {width: 150}]}>Descripcion</Text>
                    <Text style={[ListGaragesStyles.headerText, {width: 90}]}>Editar/Eliminar</Text>
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
