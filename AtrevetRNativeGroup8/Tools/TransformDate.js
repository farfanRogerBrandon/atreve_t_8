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

const getDATEfromTime =(d)=>{
    try {
        let date = new Date(d.seconds * 1000 + d.nanoseconds / 1000000);
    console.log(date);
    return date
    } catch (error) {
        console.log(error);
    }
    
}
const GetDayName = (date)=>{
    const dayOfWeek = date.toLocaleDateString('es-ES', { weekday: 'long' });
    console.log(dayOfWeek);
    return dayOfWeek;
}

const GetDayIndex=(day)=>{
    switch (day) {
        case 'lunes':
          return 0;
        case 'martes':
          return 1;
        case 'miércoles':
          return 2;
        case 'jueves':
          return 3;
        case 'viernes':
          return 4;
        case 'sábado':
          return 5;
        case 'domingo':
          return 6;
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
const getIINDEX =(times)=>{
    
    let day = GetDayName(times);
    let index = GetDayIndex(day);

    return index;
}


const  compareDate = (d1, d2) =>{
    const dia1 = d1.getDate();
    const mes1 = d1.getMonth();
    const anio1 = d1.getFullYear();
  
    const dia2 = d2.getDate();
    const mes2 = d2.getMonth();
    const anio2 = d2.getFullYear();
  
    if (dia1 === dia2 && mes1 === mes2 && anio1 === anio2) {
        console.log("HOLA");
      return true;
    } 
    else{
        return false;
    }
  }
const convertToFirestoreTimestamp = (date) => {
    
    try {
        const seconds = Math.floor(date.getTime() / 1000); // Convertir milisegundos a segundos
        const nanoseconds = (date.getTime() % 1000) * 1000000; // Calcular nanosegundos (resto de milisegundos)
    console.log(seconds);
    console.log(nanoseconds);
        return {
            nanoseconds: nanoseconds
,
            seconds: seconds,
        };
        
    } catch (error) {
        console.log(error);
    }
   
}


export {GetDateTraduced, GetDateTraducedWithOutH, convertToFirestoreTimestamp, GetDayIndex, GetDayName, getDATEfromTime, getIINDEX, compareDate};