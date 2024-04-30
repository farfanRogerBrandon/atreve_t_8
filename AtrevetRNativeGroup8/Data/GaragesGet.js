import appFirebase  from "./firebaseConfig.js";
 
import { getFirestore,doc,getDoc,collection,where,getDocs, updateDoc, addDoc, serverTimestamp, query } from "firebase/firestore";
 
const db = getFirestore(appFirebase);

const getGarages = async (id) => {
    const data = [];
    const garages = collection(db,"grage");
    const q = query(garages,where("state","==",1)); //,where("ofid","==",id)

    const xG = await getDocs(q);
    xG.forEach(g => {
        data.push(g)
    });

    return data;
}

export {getGarages};