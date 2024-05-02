// App.js
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoginScreen from './LoginScreen';
import AuthenticatedNavigation from './Components/Navigations/ClientNavigation'; // Ajusta el nombre si es
import StartNavigator from './Components/Navigations/StartNavigator';

const App = () => {
  /*
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const auth = getAuth();
  const db = getFirestore();
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        await AsyncStorage.setItem("@user", JSON.stringify(user));
        setUserInfo(user);
      } else {
        setUserInfo(null);
      }
      setLoading(false);
    });
    return unsubscribe;
  }, []);*/

  /*const handleLogin = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const userDoc = await getDoc(doc(db, 'user', user.uid));
      const userData = userDoc.data();
      const userRole = userData.role;

      let muser = {
        id: userDoc.id,
        data: userData
      };
      await AsyncStorage.setItem("@user", JSON.stringify(muser));

      if (userRole === 'client') {
        navigation.navigate("ClientNavigation"); // Ajusta el nombre si es diferente
      } else if (userRole === 'offeror') {
        navigation.navigate("OfNavigation"); // Ajusta el nombre si es diferente
      } else {
        console.log('Unknown role');
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }*/

  return (
   <StartNavigator></StartNavigator>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
