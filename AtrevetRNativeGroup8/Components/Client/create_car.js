import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Create_CarStyles from '../../Styles/create_carStyles';

const Create_Car = () => {
    const [licensePlate, setLicensePlate] = useState('');
    const [height, setHeight] = useState('');
    const [width, setWidth] = useState('');
    const [length, setLength] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = () => {
        // Handle submission logic here
        // For example, you can send the car data to a server
        console.log('Submitted:', { licensePlate, height, width, length, description });
    };

  return (
    <View style={Create_CarStyles.container}>
        <View style={Create_CarStyles.title_container}>
            <Text style={Create_CarStyles.heading}>Agrega tu Auto</Text>
        </View>

        <Text style={[Create_CarStyles.label, {alignItems: 'flex-start'}]}>Placa</Text>
        <TextInput
            style={Create_CarStyles.input}
            placeholder="Placa"
            value={licensePlate}
            onChangeText={text => setLicensePlate(text)}
        />

        <Text style={Create_CarStyles.label}>Altura del Auto</Text>
        <TextInput
            style={Create_CarStyles.input}
            placeholder="Altura"
            value={height}
            onChangeText={text => setHeight(text)}
            keyboardType="numeric"
        />

        <Text style={Create_CarStyles.label}>Ancho</Text>
        <TextInput
            style={Create_CarStyles.input}
            placeholder="Ancho del Auto (m)"
            value={width}
            onChangeText={text => setWidth(text)}
            keyboardType="numeric"
        />

        <Text style={Create_CarStyles.label}>Largo</Text>
        <TextInput
            style={Create_CarStyles.input}
            placeholder="Largo del Auto"
            value={length}
            onChangeText={text => setLength(text)}
            keyboardType="numeric"
        />

        <Text style={Create_CarStyles.label}>Descripcion</Text>
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
  );
};

export default Create_Car;
