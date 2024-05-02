import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, StatusBar } from 'react-native';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'; // Importar funciones de autenticación de Firebase
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { appFirebase } from './Data/firebaseConfig'; // Importar la configuración de Firebase
import { setUserLogued } from "./Data/usersdata"
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

import { GoogleAuthProvider, onAuthStateChanged, signInWithCredential } from 'firebase/auth';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';

WebBrowser.maybeCompleteAuthSession();

const auth = getAuth(appFirebase); // Obtener la instancia de autenticación de Firebase
const db = getFirestore(appFirebase);

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const n = useNavigation();
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId: '233656417186-81up989jhsno94khcv141m4gtk4crt52.apps.googleusercontent.com',
    redirectUri: `com.anonymous.AtrevetRNativeGroup8`,
  });
  const handleLogin = async () => {
    try {
      // Iniciar sesión con el correo electrónico y la contraseña proporcionados
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      // Obtener el rol del usuario desde la base de datos
      const userDoc = await getDoc(doc(db, 'user', user.uid));
      const userData = userDoc.data();
      const userRole = userData.role;

      let muser = {
        id: userDoc.id,
        data:userData
      }
      await setUserLogued(muser);
      
      if (userRole === 'client') {
        n.replace("ClientNavigation")
      } else if (userRole === 'offeror') {
        n.replace("OfNavigation")
      } else {
        console.log('Rol desconocido');
      }
    } catch (error) {
      // Manejar errores de inicio de sesión
      console.error('Error al iniciar sesión:', error);
      setErrorMessage('Credenciales inválidas. Por favor, inténtalo de nuevo.');
    }
  };
  
  if (response?.type === 'success') {
    const { id_token } = response.params;
    const credential = GoogleAuthProvider.credential(id_token);
    signInWithCredential(auth, credential);
  }

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

      <TouchableOpacity onPress={()=>{n.navigate("SignUpScreen")}} style={styles.button}>
        <Text style={styles.buttonText}>Crear cuenta/No tienes una cuenta??</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => promptAsync()} style={styles.googleButton}>
        <AntDesign name="google" size={30} color="white" />
        <Text style={styles.googleButtonText}>Sign In with Google</Text>
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
  googleButton: {
    backgroundColor: '#4285F4',
    width: '90%',
    padding: 10,
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  googleButtonText: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 17,
    marginLeft: 15,
  },
});

export default LoginScreen;
