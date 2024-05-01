import React, {useState} from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, Image } from 'react-native';
import Rating_InterfaceStyles from '../../Styles/rating_interfaceStyles';

const Rating_InterfaceOffertant = () => {

  const [defaultRating, setdefaultRating] = useState(2)
  const [maxRating, setmaxRating] = useState([1,2,3,4,5])

  const starImgFilled = require('../../assets/star_filled.png');
  const starImgEmpty = require('../../assets/star_corner.png');

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
      <Text style={Rating_InterfaceStyles.title}>Deja tu calificacion!</Text>
      <CustomRatingBar/>
      <Text style={Rating_InterfaceStyles.title}>
        {defaultRating + ' / ' + maxRating.length}
      </Text>
      <TouchableOpacity
        activeOpacity={0.7}
        style={Rating_InterfaceStyles.button}
        onPress={() => console.log(defaultRating)}
      >
        <Text>Get selected value</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Rating_InterfaceOffertant;
