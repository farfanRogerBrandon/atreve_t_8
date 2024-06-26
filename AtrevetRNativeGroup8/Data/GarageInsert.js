import appFirebase  from "./firebaseConfig.js";
 
import { getFirestore,doc,getDoc,collection,where,getDocs, updateDoc, addDoc, serverTimestamp, query } from "firebase/firestore";
 
const db = getFirestore(appFirebase);

const insertGarage = async (garage) => {
    try{
        garage.offerorId = doc(db, "user", garage.ofid);
        await addDoc(collection(db,"grage"), garage);
    }
    catch{
        console.error(error);
    }
}

export {insertGarage};