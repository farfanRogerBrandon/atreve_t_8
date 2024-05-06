import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'; // Importar funciones de autenticación de Firebase
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { appFirebase } from './Data/firebaseConfig'; // Importar la configuración de Firebase
import { creategoogleuser, setUserLogued } from "./Data/usersdata"
import { useNavigation } from '@react-navigation/native';

import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google.js";
import { GoogleAuthProvider,onAuthStateChanged, signInWithCredential } from 'firebase/auth';
import { AntDesign } from '@expo/vector-icons';

const auth = getAuth(appFirebase); // Obtener la instancia de autenticación de Firebase
const db = getFirestore(appFirebase);

WebBrowser.maybeCompleteAuthSession();

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const [request, response, myMethod ] =  Google.useAuthRequest({
    iosClientId:"838277525434-lk0omg23t69gm761k2ct90op2djjqqfv.apps.googleusercontent.com"
    , androidClientId:"160580814948-uu4enf91if7fpt24ua85ften6fpo8o17.apps.googleusercontent.com"
  });

  useEffect(()=>{
    if( response?.type==="success"){
      const{id_token}= response.params;
      const credential = GoogleAuthProvider.credential(id_token);
    

      signInWithCredential(getAuth(appFirebase),credential);

      const unsub= onAuthStateChanged(getAuth(appFirebase), async(user)=>{

        if(user){
          let dt ={
            names: user.displayName.split(" ")[0],
            lastnames: user.displayName.split(" ")[1],
            ci:"1201111",
            cellphone: user.phoneNumber,
            mail: user.email,
            rating:3,
            state:1,
            role:"client"


        }
       let r= await creategoogleuser(user.uid, dt);
        if(r){
          let muser = {
            id: user.uid,
            data:dt
          }
          await setUserLogued(muser);
          Alert.alert("Éxito", "Bienvenido");
          n.replace("ClientNavigation");


        }
        else{
          Alert.alert("error", "No seleccionó cuenta");

        }

        }
        return ()=>unsub();
      })
    }
    
  },[response])

const n = useNavigation();
  const handleLogin = async () => {
    try {

      //160580814948-uu4enf91if7fpt24ua85ften6fpo8o17.apps.googleusercontent.com
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

    

      <TouchableOpacity onPress={handleLogin} style={styles.loginButton}>
        <Text style={styles.loginButtonText}>Entrar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={()=>myMethod()} ><Text style={[styles.loginButton,{backgroundColor:"#26798e", color:"white"}]}> <AntDesign name="google" size={28} color="white" /> Continuar con Google</Text></TouchableOpacity>

      <TouchableOpacity onPress={()=>{n.navigate("SignUpScreen")}} style={styles.button}>
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
