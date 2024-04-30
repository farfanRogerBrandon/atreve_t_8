import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView  } from 'react-native';
import Create_GarageStyles from '../../Styles/create_garageStyles';
import MapView, { MapMarker, Marker } from 'react-native-maps';
import MapMaker from '../../Tools/Maper';

const Create_Garage = () => {
    
    const [address, setAddress] = useState('');
    const [cost, setCost] = useState('');
    const [height, setHeight] = useState('');
    const [width, setWidth] = useState('');
    const [length, setLength] = useState('');
    const [location, setLocation] = useState(null);
    const [description, setDescription] = useState('');
    const [spaces, setSpaces] = useState('');

    const mapMaker = new MapMaker();

    const handleMapPress = (event) => {
        const { latitude, longitude } = event.nativeEvent.coordinate;
        setLocation(event.nativeEvent.coordinate);
        setAddress(mapMaker.getAddressFromCoordinates(latitude, longitude));

        console.log('Latitude:', latitude);
        console.log('Longitude:', longitude);
        console.log('Address:', address);
    };

    const handleSubmit = () => {
        // Handle submission logic here
        // For example, you can send the garage data to a server
        console.log('Submitted:', { address, cost, height, width, length, description, location });
    };

  return (
    <ScrollView contentContainerStyle={Create_GarageStyles.scrollViewContent}>
        <View style={Create_GarageStyles.container}>
            <View style={Create_GarageStyles.title_container}>
                <Text style={Create_GarageStyles.heading}>Agrega tu Garaje</Text>
            </View>

            <Text style={[Create_GarageStyles.label]}>Costo:</Text>
            <TextInput
                style={Create_GarageStyles.input}
                placeholder="Costo"
                value={cost}
                onChangeText={text => setCost(text)}
                keyboardType="numeric"
            />

            <Text style={[Create_GarageStyles.label]}>Espacios:</Text>
            <TextInput
                style={Create_GarageStyles.input}
                placeholder="Espacios"
                value={spaces}
                onChangeText={text => setSpaces(text)}
                keyboardType="numeric"
            />

            <Text style={Create_GarageStyles.label}>Altura del garaje:</Text>
            <TextInput
                style={Create_GarageStyles.input}
                placeholder="Altura del garaje"
                value={height}
                onChangeText={text => setHeight(text)}
                keyboardType="numeric"
            />

            <Text style={Create_GarageStyles.label}>Ancho del garaje:</Text>
            <TextInput
                style={Create_GarageStyles.input}
                placeholder="Ancho del garaje (m)"
                value={width}
                onChangeText={text => setWidth(text)}
                keyboardType="numeric"
            />

            <Text style={Create_GarageStyles.label}>Largo del garaje:</Text>
            <TextInput
                style={Create_GarageStyles.input}
                placeholder="Largo del Auto"
                value={length}
                onChangeText={text => setLength(text)}
                keyboardType="numeric"
            />

            <Text style={Create_GarageStyles.label}>Descripcion:</Text>
            <TextInput
                style={[Create_GarageStyles.textArea]}
                placeholder="Descripcion del Auto"
                value={description}
                onChangeText={text => setDescription(text)}
                multiline={true} // Enable multi-line
                numberOfLines={4} // Set number of visible lines
            />

            <Text style={Create_GarageStyles.label}>Ubicacion en Mapa:</Text>
            <MapView
                style={{ flex: 1 }}
                onPress={handleMapPress}
                initialRegion={{
                latitude: -17.388,
                longitude: -66.155,
                latitudeDelta: 0.03,
                longitudeDelta: 0.03,
                }}
            >
                {location && (
                <Marker coordinate={location} />
                )}
            </MapView>

            <View style={Create_GarageStyles.title_container}>
                <TouchableOpacity style={Create_GarageStyles.button} onPress={handleSubmit}>
                    <Text style={Create_GarageStyles.buttonText}>Guardar Garaje</Text>
                </TouchableOpacity>
            </View>
        
        </View>
    </ScrollView>
  );
};

export default Create_Garage;
