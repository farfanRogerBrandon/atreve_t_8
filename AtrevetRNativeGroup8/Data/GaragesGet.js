import appFirebase  from "./firebaseConfig.js";
 
import { getFirestore,doc,getDoc,collection,where,getDocs, updateDoc, addDoc, serverTimestamp, query } from "firebase/firestore";
 
const db = getFirestore(appFirebase);

const getGarages = async (userId) => {
    const data = [];
    const garages = collection(db,"grage");
    const q = query(garages,where("state","==",1));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        const garageData = doc.data();
        if (garageData.ofid === userId) {
            data.push({ id: doc.id, ...garageData }); // Include the ID along with the data
        }
    });

    return data;
}

const getGarageById = async (garageId) => {
    const garRef = doc(db, "grage", garageId); // Reference to the specific car document
    const garSnapshot = await getDoc(garRef);
    return garSnapshot.data();
};


export {getGarages};
export {getGarageById};