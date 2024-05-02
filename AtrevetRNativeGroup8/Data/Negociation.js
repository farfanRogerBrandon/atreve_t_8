
import { Alert } from "react-native";
import Car from "../Models/Car.js";
import { compareDate, convertToFirestoreTimestamp, getDATEfromTime } from "../Tools/TransformDate.js";
import appFirebase from "./firebaseConfig.js";

import { getFirestore, doc, getDoc, query, collection, where, getDocs, updateDoc, addDoc, serverTimestamp } from "firebase/firestore";

const db = getFirestore(appFirebase);

const makeCostOffer = async (cost, msg, idOffer, s) => {
    try {
        const dc = doc(db, "offer", idOffer);

        let res = await updateDoc(dc, {
            cost: parseFloat(cost),
            msg: msg,
            statusNegociation: s
        })
        return true;
    } catch (error) {
        console.log(error);

        return false;
    }



}


const AcceptOffer = async (idOf, offer) => {

    try {
        const of = doc(db, "offer", idOf)
        await updateDoc(of, {
            status: 2
        })

        //Creemos reserva

        let clientId = doc(db, "user", offer.data.vehicle.cID)
        let garageID = offer.data.garageRef;
        let offerorId = offer.data.garage.offerorId;


        let rental = {
            status: 0,
            clientId: clientId,
            garageId: garageID,
            offerorId: offerorId,
            ratingForOf: 0,
            ratingForUser: 3,
            totalAccordedPrice: offer.data.cost,
            offer: ""
        }
        console.log("Pasé los refs")
        delete offer.data.garage.specialDates;
        delete offer.data.garage.timeTable;

        rental.offer = offer.data;


        await addDoc(collection(db, "rental"),
            rental);

        return true;
    } catch (error) {

        console.log(error);
        return false;

    }








}

const RejectOffer = async (idOf, s) => {
    try {
        const of = doc(db, "offer", idOf)
        await updateDoc(of, {
            status: s
        })

        return true;
    }
    catch(er){


        console.log(er);

        return false;
    }
}

export { makeCostOffer, RejectOffer, AcceptOffer }