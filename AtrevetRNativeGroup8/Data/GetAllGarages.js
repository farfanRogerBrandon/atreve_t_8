
import appFirebase  from "./firebaseConfig.js";

import { getFirestore,doc,getDoc,query,collection,where,getDocs, updateDoc, addDoc, serverTimestamp } from "firebase/firestore";

const db = getFirestore(appFirebase);


const getAllGarages =async ()=>{

    try {
        const garages=[];
        const docs = collection(db, "grage");
    
        const q = query(docs, where("state","==", 1));
    
        const myRes =await getDocs(q);
    
        myRes.forEach((it)=>{
            garages.push(it);
        })
        return garages;
    } catch (error) {

        return [];
        console.log(error);
    }
   

}

export {getAllGarages};