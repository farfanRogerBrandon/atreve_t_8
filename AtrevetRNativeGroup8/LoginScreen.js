import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';


    const LoginScreen = ({ onNavigate }) => {
        const [email, setEmail] = useState('');
        const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Implement your login logic here
    console.log(email, password);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hola!</Text>
      <Text style={styles.subtitle}>Entra en tu Cuenta!</Text>

      <TextInput
        style={styles.input}
        placeholder="john@email.com"
        placeholderTextColor="#8A8F9E"
        onChangeText={setEmail}
        value={email}
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        placeholderTextColor="#8A8F9E"
        secureTextEntry
        onChangeText={setPassword}
        value={password}
        autoCapitalize="none"
      />

      <TouchableOpacity onPress={() => {}} style={styles.button}>
        <Text style={styles.buttonText}>Olvidaste tu contraseña?</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleLogin} style={styles.loginButton}>
        <Text style={styles.loginButtonText}>Entrar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={onNavigate} style={styles.button}>
        <Text style={styles.buttonText}>Crear cuenta/No tienes una cuenta??</Text>
      </TouchableOpacity>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFEE3', // Light yellow from the palette
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  title: {
    fontSize: 30,
    color: '#26798E', // Dark blue from the palette
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#26798E', // Dark blue from the palette
    marginBottom: 48,
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: 'white',
    borderRadius: 6,
    marginTop: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    borderColor: '#63CAA7', // Teal from the palette
    borderWidth: 1,
  },
  button: {
    marginTop: 12,
  },
  buttonText: {
    color: '#FFC172', // Orange from the palette
    fontSize: 14,
  },
  loginButton: {
    width: '100%',
    height: 50,
    backgroundColor: '#FFC172', // Orange from the palette
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 32,
  },
  loginButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '500',
  },
});
export default LoginScreen;