
import { Alert } from "react-native";
import Car from "../Models/Car.js";
import { compareDate, convertToFirestoreTimestamp, getDATEfromTime } from "../Tools/TransformDate.js";
import appFirebase from "./firebaseConfig.js";

import { getFirestore, doc, getDoc, query, collection, where, getDocs, updateDoc, addDoc, serverTimestamp } from "firebase/firestore";

const db = getFirestore(appFirebase);


const getAllGarages = async () => {

    try {
        const garages = [];
        const docs = collection(db, "grage");

        const q = query(docs, where("state", "==", 1));

        const myRes = await getDocs(q);

        myRes.forEach((it) => {
            garages.push(it);
        })
        return garages;
    } catch (error) {

        return [];
        console.log(error);
    }


}

const getCarsByUser = async (idUser) => {

    try {
        const garages = [];
        const docs = collection(db, "car");

        const q = query(docs, where("state", "==", 1), where("cID", "==", idUser));

        const myRes = await getDocs(q);

        myRes.forEach((it) => {

            let c = new Car(it.id, it.data().height, it.data().length, it.data().width, it.data().description, it.data().plate, idUser);

            garages.push(c);
        })
        return garages;
    } catch (error) {
        console.log(error);

        return [];
    }
}



const VerifyReservesByDate = async (date, start, end, garageID) => {

    try {
        const col = collection(db, "offer");
        const q = query(col, where("status", "==", 2), where("gID", "==", garageID));

        let results = await getDocs(q);

        let nro = 0;
        console.log("ENtro");
        results.docs.forEach((doc) => {


            let dateLeg = getDATEfromTime(doc.data().beginDate);
            console.log(dateLeg);
            if (compareDate(dateLeg, date)) {
                console.log("IGUALES")

                let isOne = false;
                console.log(start);
                if ((start >= doc.data().startHour && start <= doc.data().endHour) || (end >= doc.data().startHour && end <= doc.data().endHour)) {
                    isOne = true;
                }
                else if ((start <= doc.data().startHour) && (end >= doc.data().endHour)) {
                    isOne = true
                }

                if (isOne) {
                    nro++;
                    //según esto, fuera del for, comparar con el total de espacios y si va a haber campo
                }


            }
        })
        return nro;
    } catch (error) {
        console.log(error);

        return 0;
    }

}



const SendOffer = async (data) => {

    try {
        let refG = await doc(db, "grage", data.gID);

        data.garageRef = refG;
        console.log("Paso la ref");
        data.offeror = (await getDoc(data.garage.offerorId)).data();
        console.log("Paso el offer");

        data.registrationDate = serverTimestamp();
        data.updateDate = serverTimestamp();

        let col = collection(db, "offer");
        let res = (await addDoc(col, data)).id;

        console.log("Añadidio: ", res);
        return res;




    } catch (error) {
        console.log(error);
        return "";
    }







}
export { getAllGarages, getCarsByUser, VerifyReservesByDate , SendOffer};