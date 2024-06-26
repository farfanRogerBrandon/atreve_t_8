import { getFirestore, setDoc, doc, getDoc} from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { appFirebase } from "./firebaseConfig";
import AsyncStorage from '@react-native-async-storage/async-storage';

const auth = getAuth(appFirebase);
const db = getFirestore(appFirebase);

const createuser = async (user) => {
   await createUserWithEmailAndPassword(auth, user.mail, user.password)
    .then (async(userCredential) => {
        // Signed in 
        const id = userCredential.user.uid;
        delete user.password;
        await setDoc(doc(db, "user", id), user);

        // ...
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
        return false;
    });
};




 const setUserLogued= async(user) =>{
    await AsyncStorage.setItem('user', JSON.stringify(user))
  }


  
const creategoogleuser = async (i, dt) => {
  
         const id = i;
        let d = await getDoc(doc(db, "user", id));
        if(d.exists()){
            if(d.data().state ==1){
                return true;

            }
        }
        else{
            
            await setDoc(doc(db, "user", id), dt);
            return true;

        }
       



 
     
 };
export { createuser, setUserLogued, creategoogleuser };
