const GetDateTraduced=(d)=>{
    try {
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', timeZoneName: 'short' };
        let date = new Date(d.seconds * 1000 + d.nanoseconds / 1000000);
        let fDate = date.toLocaleDateString('es-ES', options);
    
        return fDate;
    } catch (error) {
        console.log(error);
        return "";
    }
  
}
const GetDateTraducedWithOutH=(d)=>{
    try {
        const options = { year: 'numeric', month: 'long', day: 'numeric',};
        let date = new Date(d.seconds * 1000 + d.nanoseconds / 1000000);
        let fDate = date.toLocaleDateString('es-ES', options);
    
        return fDate;
    } catch (error) {
        console.log(error);
        return "";
    }
  
}

const convertToFirestoreTimestamp = (date) => {
    
    try {
        const seconds = Math.floor(date.getTime() / 1000); // Convertir milisegundos a segundos
        const nanoseconds = (date.getTime() % 1000) * 1000000; // Calcular nanosegundos (resto de milisegundos)
    console.log(seconds);
        return {
            nanoseconds: nanoseconds
,
            seconds: seconds,
        };
        
    } catch (error) {
        console.log(error);
    }
   
}


export {GetDateTraduced, GetDateTraducedWithOutH, convertToFirestoreTimestamp};