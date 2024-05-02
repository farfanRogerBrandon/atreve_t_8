const TraduceRentalStatus = (status) => {
    if (status === 0) {
        return "Reservado";
    } else if (status === 1) {
        return "Auto Ingresado";
    } else if (status === 2) {
        return "Servicio Finalizado";
    } 
    else if (status ==3){
        return "Servicio Finalizado y calificado";

    }
    else {
        return "Estado no reconocido";
    }
}

export {TraduceRentalStatus};