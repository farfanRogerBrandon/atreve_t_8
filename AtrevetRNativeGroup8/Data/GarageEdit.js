import appFirebase  from "./firebaseConfig.js";
 
import { getFirestore,doc,getDoc,collection,where,getDocs, updateDoc, addDoc, serverTimestamp, query } from "firebase/firestore";
 
const db = getFirestore(appFirebase);

const updateGarageById = async (garageId, updatedGarageData) => {
    const garRef = doc(db, "grage", garageId);
    try {
        await updateDoc(garRef, updatedGarageData);
        console.log("Garage updated successfully!");
    } catch (error) {
        console.error("Error updating garage:", error);
        throw error; // Re-throw the error to handle it in the component
    }
};

const logicalDeleteGarageById = async (garageId) => {
    const garRef = doc(db, "grage", garageId);
    const updatedGarData = {
        state: 0 // Set the state to 0 for logical delete
    };

    try {
        await updateDoc(garRef, updatedGarData);
        console.log("Garage logically deleted successfully!");
    } catch (error) {
        console.error("Error logically deleting garage:", error);
        throw error; // Re-throw the error to handle it in the component
    }
};

export {updateGarageById };
export {logicalDeleteGarageById };