
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


const GetRentalsByOf = async (idClient) => {

    try {
        const data = [];
        const rentals = collection(db, "rental");
        const q = query(rentals, where("offer.garage.ofid", "==", idClient)); //,where("ofid","==",id)

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

const changeStatusRental = async(idRental, status, idGarge)=>{

    try {
        let d = doc(db, "rental", idRental);
        await updateDoc(d, {status:status});
    
    
        let g = doc(db, "grage", idGarge);
    let st =""
        if(status == 1){
            st ="Ocupado";
        }
        if(status ==2){
            st ="Libre"
        }
        await updateDoc(g, {avialability:st});
    
        return true;
    } catch (error) {
        console.log(error);

        return false;
    }
   
}


const regitsterCalClient =  async(idRental, idUser, rat, idOffer, idGarage) =>{
    try {
        let r = doc(db, "rental", idRental);

        await updateDoc(r, {
            ratingForOf: rat,
            status: 3
        })
            console.log("AllOk");
        //atualizar promedio calificación garage:
    
        let q = query(collection(db, "rental"), where("status","==",3),where("offer.gID", "==", idGarage));
    
        let count =0;
        let prom =0;
        const querySnapshot = await getDocs(q);
       count= querySnapshot.docs.length;
        let promises =  querySnapshot.docs.map(async(doc)=>{
            prom+= doc.data().ratingForOf 
        })
        await Promise.all(promises);
        let prome = prom/count;
    
        let u = doc(db, "grage", idGarage);
        await updateDoc(u, {
            rating: parseFloat(prome)
        })
        console.log("Paso1");
    
        
        //ofer
        let q2 = query(collection(db, "rental"), where("status","==",3),where("offer.garage.ofid", "==", idOffer));
        console.log("Paso2");
    
        let count2 =0;
        let prom2 =0;
        const querySnapshot2 = await getDocs(q2);
       count2= querySnapshot2.docs.length;
        let promises2 =  querySnapshot.docs.map(async(doc)=>{
            prom2+= doc.data().ratingForOf 
        })
        await Promise.all(promises2);
        let prome2 = prom/count;
    
        let u2 = doc(db, "user", idOffer);
        await updateDoc(u2, {
            rating: parseFloat(prome2)
        })
    
        



    
        return true;
    } catch (error) {
        console.log(error);

        return false;
    }
  


}





const regitsterCalOffer =  async(idRental, idUser, rat, idOffer) =>{
    try {
        let r = doc(db, "rental", idRental);

        await updateDoc(r, {
            ratingForUser: rat,
            status: 3
        })
    
        console.log("Paso esto");
    
        let q = query(collection(db, "rental"), where("status","==",3),where("offer.vehicle.cID", "==", idUser));
    
        let count =0;
        let prom =0;
        const querySnapshot = await getDocs(q);
       count= querySnapshot.docs.length;
        let promises =  querySnapshot.docs.map(async(doc)=>{
            prom+= doc.data().ratingForUser
        })
        await Promise.all(promises);
        
        let prome =  (prom/count).toFixed(2);
        console.log("paso1");
        let u = doc(db, "user", idUser);
        await updateDoc(u, {
            rating: parseFloat(prome)
        })
    
    
    
        return true;
    } catch (error) {
        console.log(error);

        return false;
    }
  


}

export {GetRentalsByClient, GetRentalsByOf, changeStatusRental, regitsterCalClient, regitsterCalOffer}