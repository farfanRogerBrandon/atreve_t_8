import appFirebase  from "./firebaseConfig.js";
 
import { getFirestore,doc,getDoc,collection,where,getDocs, updateDoc, addDoc, serverTimestamp, query } from "firebase/firestore";
 
const db = getFirestore(appFirebase);

const updateCarById = async (carId, updatedCarData) => {
    const carRef = doc(db, "car", carId);
    try {
        await updateDoc(carRef, updatedCarData);
        console.log("Car updated successfully!");
    } catch (error) {
        console.error("Error updating car:", error);
        throw error; // Re-throw the error to handle it in the component
    }
};

const logicalDeleteCarById = async (carId) => {
    const carRef = doc(db, "car", carId);
    const updatedCarData = {
        state: 0 // Set the state to 0 for logical delete
    };

    try {
        await updateDoc(carRef, updatedCarData);
        console.log("Car logically deleted successfully!");
    } catch (error) {
        console.error("Error logically deleting car:", error);
        throw error; // Re-throw the error to handle it in the component
    }
};

export {updateCarById };
export { logicalDeleteCarById };