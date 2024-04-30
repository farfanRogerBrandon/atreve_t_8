import appFirebase  from "./firebaseConfig.js";
 
import { getFirestore,doc,getDoc,collection,where,getDocs, updateDoc, addDoc, serverTimestamp, query } from "firebase/firestore";
 
const db = getFirestore(appFirebase);

const getCars = async (id) => {
    const data = [];
    const cars = collection(db,"car");
    const q = query(cars,where("state","==",1),where("clientId","==",id));

    const xG = await getDocs(q);
    xG.forEach(g => {
        data.push(g)
    });

    return data;
}

export {getCars};