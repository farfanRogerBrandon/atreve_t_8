import appFirebase  from "./firebaseConfig.js";
 
import { getFirestore,doc,getDoc,collection,where,getDocs, updateDoc, addDoc, serverTimestamp, query } from "firebase/firestore";
 
const db = getFirestore(appFirebase);

const getCars = async (userId) => {
    const data = [];
    const cars = collection(db,"car");
    const q = query(cars,where("state","==",1));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        const carData = doc.data();
        if (carData.cID == userId) {
            data.push({ id: doc.id, ...carData }); // Include the ID along with the data
        }
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