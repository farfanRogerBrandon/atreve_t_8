import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import Create_CarStyles from '../../Styles/create_carStyles';
import { insertCars } from '../../Data/CarsInsert';

const Create_Car = (props) => {
    const [plate, setLicensePlate] = useState('');
    const [high, setHeight] = useState('');
    const [width, setWidth] = useState('');
    const [lenght, setLength] = useState('');
    const [description, setDescription] = useState('');
    const [state, setState] = useState(1);

    const handleSubmit = async() => {
        // Handle submission logic here
        // For example, you can send the car data to a server
        const car = {
            plate,
            high,
            width,
            lenght,
            description,
            state
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

        console.log('Submitted:', { plate, high, width, lenght, description });
    };

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
                value={high}
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
                value={lenght}
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

export default Create_Car;
