import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView  } from 'react-native';
import Create_GarageStyles from '../../Styles/create_garageStyles';
import MapView, { MapMarker, Marker } from 'react-native-maps';
import MapMaker from '../../Tools/Maper';
import { insertGarage } from '../../Data/GarageInsert';
import { getGarageById } from '../../Data/GaragesGet';

const Edit_Garage = (props) => {
    
    const [address, setAddress] = useState('');
    const [cost, setCost] = useState('');
    const [height, setHeight] = useState('');
    const [width, setWidth] = useState('');
    const [length, setLength] = useState('');
    const [location, setLocation] = useState(null);
    const [description, setDescription] = useState('');
    const [spaces, setSpaces] = useState('');
    const [avialability, setavialability] = useState('libre');
    const [rating, setRating] = useState(0);
    const [state, setState] = useState(1);

    const mapMaker = new MapMaker();

    const [garage, setGarage] = useState({})

    const getOneGarage = async(id)=>{
        try{
            let newData = await getGarageById(id)
            setGarage(newData);
            console.log(newData);
        }catch{
            console.error(error)
        }
    }

    useEffect(()=>{
        getOneGarage(props.route.params.garageId)
    },[]);

    useEffect(() => {
        // Update state values with garage data when garage object changes
        setAddress(garage.address || '');
        setHeight(garage.height || '');
        setWidth(garage.width || '');
        setLength(garage.length || '');
        setDescription(garage.description || '');
        setState(garage.state || 1);
        setLocation(garage.location || '');
        setavialability(garage.avialability || 'Libre');
        setRating(garage.rating || 0);
        setCost(garage.cost || '');
        setSpaces(garage.spaces || '');
    }, [garage]);

    const handleMapPress = async(event) => {
        const { latitude, longitude } = event.nativeEvent.coordinate;
        setLocation(event.nativeEvent.coordinate);
        const displayName = await mapMaker.getAddressFromCoordinates(latitude, longitude)
        setAddress(displayName);

        console.log('Latitude:', latitude);
        console.log('Longitude:', longitude);
        console.log('Address:', address);
    };

    const handleSubmit = async() => {
        // Handle submission logic here
        // For example, you can send the garage data to a server
        const garageUpdated = {
            address,
            avialability,
            cost,
            description,
            height,
            width,
            length,
            location,
            rating,
            spaces,
            state
        };

        try {
            await insertGarage(garageUpdated);
            Alert.alert('Registrado', 'El garaje se registro con exito');
            console.log('Garage inserted successfully:', garageUpdated);
            props.navigation.navigate('ListGarages');
        } catch {
            Alert.alert('Error', 'El garaje no se registro');
            console.error('Error inserting garage:', error);
        }

        console.log('Submitted:', { address, cost, height, width, length, description, location });
    };

  return (
    <ScrollView contentContainerStyle={Create_GarageStyles.scrollViewContent}>
        <View style={Create_GarageStyles.container}>
            <View style={Create_GarageStyles.title_container}>
                <Text style={Create_GarageStyles.heading}>Edita tu Garaje</Text>
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
                latitudeDelta: 0.1,
                longitudeDelta: 0.1,
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

export default Edit_Garage;
