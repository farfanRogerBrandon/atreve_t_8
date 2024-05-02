import appFirebase  from "./firebaseConfig.js";
 
import { getFirestore,doc,getDoc,collection,where,getDocs, updateDoc, addDoc, serverTimestamp, query } from "firebase/firestore";
 
const db = getFirestore(appFirebase);

const insertCars = async (car) => {
    try{
        car.clientId = doc(db, "user", car.cID);
        await addDoc(collection(db,"car"), car);
    }
    catch{
        console.error(error);
    }
}

export {insertCars};