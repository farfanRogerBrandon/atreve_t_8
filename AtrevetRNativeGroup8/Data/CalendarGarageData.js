

import appFirebase  from "./firebaseConfig.js";

import { getFirestore,doc,getDoc,query,collection,where,getDocs, updateDoc, addDoc, serverTimestamp } from "firebase/firestore";

const db = getFirestore(appFirebase);

const GetTimeTable=async(idGarage)=>{

    try {
    

        let myTime =  await getDoc( doc(db, "grage", idGarage));
        
        let dates ={
            timeTable: myTime.data().timeTable,
            specialDates: myTime.data().specialDates
        }
        return dates;
    
    } catch (error) {
        let dates ={
            timeTable:[],
            specialDates: []
        }
        console.log(error);
        return dates;
    }
   



}

const SaveCalendar = async (id, timeTable)=>{ //luego el otro
    try {
    

        let myTime =   doc(db, "grage", id);
        
        await updateDoc(myTime,{
            timeTable:timeTable
        })
      
        return true;
    
    } catch (error) {
       
        console.log(error);
        return false;
    }
   
}

export {GetTimeTable, SaveCalendar} ;