import React, {useState} from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, Image, Alert } from 'react-native';
import Rating_InterfaceStyles from '../../Styles/rating_interfaceStyles';
import { regitsterCalOffer } from '../../Data/Rentals';
import { useNavigation, useRoute } from '@react-navigation/native';
import { RFValue } from 'react-native-responsive-fontsize';

const Rating_InterfaceOffertant = () => {

  const [defaultRating, setdefaultRating] = useState(2)
  const [maxRating, setmaxRating] = useState([1,2,3,4,5])

  const starImgFilled = require('../../assets/star_filled.png');
  const starImgEmpty = require('../../assets/star_corner.png');


  const n = useNavigation();
  const r = useRoute();






  
  const {rental} = r.params;
  const RegisterOferCal =async()=>{
    let res = await regitsterCalOffer(rental.id, rental.data.offer.vehicle.cID, defaultRating, rental.data.offer.garage.ofid);
if(res){
  try {
    Alert.alert("Éxito", "Se ha registrado la calificación");
        n.replace("OfDates");
  } catch (error) {
    
  }
      
}
else{

  Alert.alert("Error", "Ha ocurrido un error");
}
  }

  const CustomRatingBar = () => {
    return (
      <View style={Rating_InterfaceStyles.customRatingBarStyle}>
        {
          maxRating.map((item, key) => {
            return (
              <TouchableOpacity
                activeOpacity={0.7}
                key={item}
                onPress={() => setdefaultRating(item)}
              >
                <Image
                  style={Rating_InterfaceStyles.starImgStyle}
                  source={
                    item <= defaultRating
                      ? starImgFilled
                      : starImgEmpty
                  }
                />
              </TouchableOpacity>
            )
          })
        }
      </View>
    )
  }

  return (
    <SafeAreaView style={Rating_InterfaceStyles.container}>
      <Text style={{fontSize:RFValue(20), fontWeight:"bold", color:"#26798e", alignSelf:"center"}}>¿Cómo fue tu experiencia con el vehículo?</Text>
      <Text style={Rating_InterfaceStyles.title}>Deja tu calificacion!</Text>
      <CustomRatingBar/>
      <Text style={Rating_InterfaceStyles.title}>
        {defaultRating + ' / ' + maxRating.length}
      </Text>
      <TouchableOpacity
        activeOpacity={0.7}
        style={Rating_InterfaceStyles.button}
        onPress={() => RegisterOferCal()}
      >
        <Text>Enviar calificación</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Rating_InterfaceOffertant;
