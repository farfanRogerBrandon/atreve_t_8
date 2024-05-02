
import { Alert } from "react-native";
import Car from "../Models/Car.js";
import { GetDateTraducedWithOutH, compareDate, convertToFirestoreTimestamp, getDATEfromTime } from "../Tools/TransformDate.js";
import appFirebase from "./firebaseConfig.js";

import { getFirestore, doc, getDoc, query, collection, where, getDocs, updateDoc, addDoc, serverTimestamp } from "firebase/firestore";

const db = getFirestore(appFirebase);

const GetRentalsByClient = async (idClient) => {

    try {
        const data = [];
        const rentals = collection(db, "rental");
        const q = query(rentals, where("offer.vehicle.cID", "==", idClient)); //,where("ofid","==",id)

        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            let obj = {
                id: doc.id,
                data: doc.data()
            }
            obj.data.offer.beginDate=  GetDateTraducedWithOutH(obj.data.offer.beginDate);
            data.push(obj);
        });

        return data;
    } catch (error) {
        console.log(error);
        return[];
    }

}

export {GetRentalsByClient}