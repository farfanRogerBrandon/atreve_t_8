import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import Create_CarStyles from '../../Styles/create_carStyles';
import { insertCars } from '../../Data/CarsInsert';
import { getCarById } from '../../Data/CarsGet';
import { updateCarById } from '../../Data/CarsEdit';

const Edit_Car = (props) => {
    const [plate, setLicensePlate] = useState('');
    const [height, setHeight] = useState('');
    const [width, setWidth] = useState('');
    const [length, setLength] = useState('');
    const [description, setDescription] = useState('');
    const [state, setState] = useState(1);

    const [car, setCar] = useState({})

    const getOneCar = async(id)=>{
        try{
            let newData = await getCarById(id)
            setCar(newData);
            console.log(newData);
        }catch{
            console.error(error)
        }
    }

    useEffect(()=>{
        getOneCar(props.route.params.carId)
    },[]);

    useEffect(() => {
        // Update state values with car data when car object changes
        setLicensePlate(car.plate || '');
        setHeight(car.height ? String(car.height) : ''); // Parse numeric value to string
        setWidth(car.width ? String(car.width) : ''); // Parse numeric value to string
        setLength(car.length ? String(car.length) : ''); // Parse numeric value to string
        setDescription(car.description || '');
        setState(car.state || 1);
    }, [car]);

    const handleSubmit = async() => {
        // Handle submission logic here
        // For example, you can send the car data to a server
        const carUpdated = {
            plate,
            height:parseFloat(height),
            width:parseFloat(width),
            length:parseFloat(length),
            description,
            state
        };

        try {
            // Update the car data in Firebase
            await updateCarById(props.route.params.carId, carUpdated);
            Alert.alert('Actualizado', 'Los datos del auto se actualizaron con éxito');
            console.log('Car updated successfully:', carUpdated);
            props.navigation.replace('ListCars');
        } catch (error) {
            Alert.alert('Error', 'Los datos del auto no se pudieron actualizar');
            console.error('Error updating car:', error);
        }

        console.log('Submitted:', { plate, height, width, length, description });
    };

  return (
    <ScrollView contentContainerStyle={Create_CarStyles.scrollViewContent}>
        <View style={Create_CarStyles.container}>
            <View style={Create_CarStyles.title_container}>
                <Text style={Create_CarStyles.heading}>Modifica tu Auto</Text>
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

export default Edit_Car;
