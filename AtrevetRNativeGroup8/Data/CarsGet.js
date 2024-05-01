import appFirebase  from "./firebaseConfig.js";
 
import { getFirestore,doc,getDoc,collection,where,getDocs, updateDoc, addDoc, serverTimestamp, query } from "firebase/firestore";
 
const db = getFirestore(appFirebase);

const getCars = async (id) => {
    const data = [];
    const cars = collection(db,"car");
    const q = query(cars,where("state","==",1)); //,where("clientId","==",id)

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() }); // Include the ID along with the data
    });

    return data;
}

const getCarById = async (carId) => {
    const carRef = doc(db, "car", carId); // Reference to the specific car document
    const carSnapshot = await getDoc(carRef);
    return carSnapshot.data();
};

export {getCars};
export {getCarById};