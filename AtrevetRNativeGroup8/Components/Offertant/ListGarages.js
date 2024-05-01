import React, { useEffect, useState } from 'react';
import { StatusBar } from "expo-status-bar";
import { View, Text, TextInput, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import ListGaragesStyles from '../../Styles/ListGaragesStyles';
import Icon from 'react-native-vector-icons/FontAwesome';
import { getGarages } from '../../Data/GaragesGet';

const ListGarages = (props) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const getGaragesList = async()=>{
            try {
                let newData = await getGarages("Iq3zIGu8BQtN3d0Gcuhh")
                setData(newData);
                console.log(newData);
            } catch (error) {
                console.log(error);
            }
        }
        getGaragesList()
    },[])

    const renderItem = ({item, index}) => {
        return(
            <View style={ListGaragesStyles.row}>
                <Text style={[ListGaragesStyles.cell, {width: 200}]}>{item.address}</Text>
                <Text style={[ListGaragesStyles.cell, {width: 90}]}>{item.height}</Text>
                <Text style={[ListGaragesStyles.cell, {width: 90}]}>{item.width}</Text>
                <Text style={[ListGaragesStyles.cell, {width: 90}]}>{item.length}</Text>
                <Text style={[ListGaragesStyles.cell, {width: 90}]}>{item.cost}</Text>
                <Text style={[ListGaragesStyles.cell, {width: 100}]}>{item.spaces}</Text>
                <Text style={[ListGaragesStyles.cell, {width: 150}]}>{item.description}</Text>
                <Text style={[ListGaragesStyles.cell, {width: 150}]}>
                    <TouchableOpacity style={ListGaragesStyles.editButton} key={item.id}
                    onPress={()=>props.navigation.navigate('EditGarage',{garageId:item.id})} >
                    <   Icon style={ListGaragesStyles.edit} name="edit" size={30} />
                    </TouchableOpacity>
                    <TouchableOpacity style={ListGaragesStyles.editDelete} key={item.id}>
                        <Icon style={ListGaragesStyles.delete} name="trash" size={30} />
                    </TouchableOpacity>                   
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
