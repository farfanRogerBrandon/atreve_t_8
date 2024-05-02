import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import Create_CarStyles from '../../Styles/create_carStyles';
import { insertCars } from '../../Data/CarsInsert';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Create_Car = (props) => {
    const [plate, setLicensePlate] = useState('');
    const [height, setHeight] = useState('');
    const [width, setWidth] = useState('');
    const [length, setLength] = useState('');
    const [description, setDescription] = useState('');
    const [state, setState] = useState(1);

    const handleSubmit = async() => {
        // Handle submission logic here
        // For example, you can send the car data to a server
        const car = {
            plate,
            height:parseFloat(height),
            width:parseFloat(width),
            length:parseFloat(length),
            description,
            state,
            cID: myuser.id,
            clientId:""
        };

        try {
            await insertCars(car);
            Alert.alert('Registrado', 'El auto se registro con exito');
            console.log('Car inserted successfully:', car);
            props.navigation.navigate('ListCars');
        } catch {
            Alert.alert('Error', 'El auto no se registro');
            console.error('Error inserting car:', error);
        }

        console.log('Submitted:', { plate, height, width, length, description });
    };

    const [myuser, setuser] = useState("");


  var muser = "";
  const getLocalUser = async () => {
    try {
      muser = await AsyncStorage.getItem("user");
      let muserJson = muser ? JSON.parse(muser) : null;
      setuser(muserJson);
     // await getRentals(muserJson.id);
    }
    catch (e) {
      console.error(e);
    }
  }

  useEffect(()=>{
    getLocalUser();
  })
  
  return (
    <ScrollView contentContainerStyle={Create_CarStyles.scrollViewContent}>
        <View style={Create_CarStyles.container}>
            <View style={Create_CarStyles.title_container}>
                <Text style={Create_CarStyles.heading}>Agrega tu Auto</Text>
            </View>

            <Text style={[Create_CarStyles.label]}>Placa:</Text>
            <TextInput
                style={Create_CarStyles.input}
                placeholder="Placa"
                value={plate}
                onChangeText={text => setLicensePlate(text)}
            />

            <Text style={Create_CarStyles.label}>Altura del Auto:</Text>
            <TextInput
                style={Create_CarStyles.input}
                placeholder="Altura del auto"
                value={height}
                onChangeText={text => setHeight(text)}
                keyboardType="numeric"
            />

            <Text style={Create_CarStyles.label}>Ancho del auto:</Text>
            <TextInput
                style={Create_CarStyles.input}
                placeholder="Ancho del Auto (m)"
                value={width}
                onChangeText={text => setWidth(text)}
                keyboardType="numeric"
            />

            <Text style={Create_CarStyles.label}>Largo del auto:</Text>
            <TextInput
                style={Create_CarStyles.input}
                placeholder="Largo del Auto"
                value={length}
                onChangeText={text => setLength(text)}
                keyboardType="numeric"
            />

            <Text style={Create_CarStyles.label}>Descripcion del auto:</Text>
            <TextInput
                style={[Create_CarStyles.textArea]}
                placeholder="Descripcion del Auto"
                value={description}
                onChangeText={text => setDescription(text)}
                multiline={true} // Enable multi-line
                numberOfLines={4} // Set number of visible lines
            />

            <View style={Create_CarStyles.title_container}>
                <TouchableOpacity style={Create_CarStyles.button} onPress={handleSubmit}>
                    <Text style={Create_CarStyles.buttonText}>Guardar Auto</Text>
                </TouchableOpacity>
            </View>
        
        </View>
    </ScrollView>
  );
};
//mi apu : AIzaSyCPxGM_Coema3d1JidFraPMQ1jXzI5xKWo
export default Create_Car;
