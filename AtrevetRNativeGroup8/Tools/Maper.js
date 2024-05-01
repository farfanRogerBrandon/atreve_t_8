import axios from "axios";

class MapMaker{
    async getAddressFromCoordinates(latitude, longitude) {
        try {
          const response = await axios.get(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`
          );
      
          if (response.data.display_name) {
            console.log(response.data.display_name);
            const address = response.data.display_name;
            return address;
          } else {
            return 'Dirección no encontrada';
          }
        } catch (error) {
          console.error('Error al obtener la dirección:', error);
          return 'Error al obtener la dirección';
        }
      }
}
export default MapMaker;