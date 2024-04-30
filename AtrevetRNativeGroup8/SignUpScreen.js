// SignUpScreen.js
import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, Modal, Keyboard } from 'react-native';

const SignUpScreen = () => {
  const [formData, setFormData] = useState({
    ci: '',
    lastnames: '',
    names: '',
    cellphone: '',
    mail: '',
    password: '',
    rating: 0,
    role: '', // Aquí se almacenará el valor seleccionado del Picker
    state: 1
  });

  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleRoleSelection = (selectedRole) => {
    setFormData(prevState => ({ ...prevState, role: selectedRole }));
    setIsModalVisible(false);
  };

  const handleSubmit = () => {
    // Convertir los valores de CI y número de teléfono a texto antes de enviarlos a la base de datos
    const ciValue = formData.ci.toString();
    const cellphoneValue = formData.cellphone.toString();

    // Formatear nombres y apellidos eliminando espacios al principio y al final
    const formattedNames = formData.names.trim();
    const formattedLastnames = formData.lastnames.trim();


    // Actualizar el estado con los nombres y apellidos formateados
    setFormData(prevState => ({
      ...prevState,
      ci: ciValue,
      cellphone: cellphoneValue,
      names: formattedNames,
      lastnames: formattedLastnames
    }));

    // Aquí va la lógica para manejar la creación de la cuenta
    console.log({
      ...formData,
      ci: ciValue,
      cellphone: cellphoneValue,
      names: formattedNames,
      lastnames: formattedLastnames
    });

    // Limpiar el teclado después de enviar el formulario
    Keyboard.dismiss();
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Crear Cuenta</Text>
      {Object.keys(formData).map((key) => (
        key !== 'rating' && key !== 'state' && key !== 'role' ?
          <TextInput
            key={key}
            style={styles.input}
            placeholder={key === 'cellphone' ? 'Ingresa tu número de celular' :
                         key === 'ci' ? 'Ingresa tu CI' :
                         key === 'lastnames' ? 'Ingresa tus apellidos' :
                         key === 'mail' ? 'Ingresa tu correo electrónico' :
                         key === 'names' ? 'Ingresa tus nombres' :
                         key === 'password' ? 'Ingresa tu contraseña' : ''}
            value={formData[key]}
            onChangeText={(text) => {
                if (key === 'ci' || key === 'cellphone') {
                  // Permitir solo números en CI y número de teléfono
                  const formattedText = text.replace(/\D/g, '');
                  setFormData(prevState => ({ ...prevState, [key]: formattedText }));
                } else if (key === 'names' || key === 'lastnames') {
                  // Eliminar caracteres especiales y convertir a mayúsculas
                  const formattedText = text.replace(/[^a-zA-Z\sñÑ]/g, '').toUpperCase();
                  setFormData(prevState => ({ ...prevState, [key]: formattedText }));
                } else {
                  setFormData(prevState => ({ ...prevState, [key]: text }));
                }
              }}
              secureTextEntry={key === 'password'}
              autoCapitalize="none"
              // Configurar el teclado para aceptar solo números para CI y número de teléfono
              keyboardType={(key === 'ci' || key === 'cellphone') ? 'numeric' : 'default'}
            />
            : null
      ))}
      <TouchableOpacity onPress={() => setIsModalVisible(true)} style={styles.roleButton}>
        <Text style={styles.buttonText}>{formData.role !== '' ? formData.role : 'Seleccionar Rol'}</Text>
      </TouchableOpacity>
      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity onPress={() => handleRoleSelection('Cliente')}>
              <Text style={styles.modalItem}>Cliente</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleRoleSelection('Ofertante')}>
              <Text style={styles.modalItem}>Ofertante</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setIsModalVisible(false)}>
              <Text style={styles.cancelButton}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <TouchableOpacity onPress={handleSubmit} style={styles.button1}>
        <Text style={styles.buttonText1}>Registrarse!</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 50
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFC172', // Orange from the palette
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: 'white',
    borderColor: '#63CAA7', // Teal from the palette
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 15,
    marginVertical: 8,
  },
  roleButton: {
    width: '100%',
    height: 50,
    backgroundColor: 'white',
    borderColor: '#63CAA7',
    borderWidth: 1,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 8,
  },
  buttonText: {
    fontSize: 16,
    color: '#63CAA7',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingVertical: 20,
    paddingHorizontal: 30,
  },
  modalItem: {
    fontSize: 18,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  cancelButton: {
    fontSize: 18,
    paddingVertical: 15,
    textAlign: 'center',
    color: 'red',
  },

  button1: {
    backgroundColor: '#FFC172', // Orange from the palette
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  buttonText1: {
    color: 'white',
    fontSize: 18,
  },
  
});

export default SignUpScreen;
