import React, { useState } from 'react';
import { View, Button, StyleSheet, Text } from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";

const TimePickerExample = () => {
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const [selectedTime, setSelectedTime] = useState(null);

  const showTimePicker = () => {
    setTimePickerVisibility(true);
  };

  const hideTimePicker = () => {
    setTimePickerVisibility(false);
  };

  const handleTimeConfirm = (time) => {
    setSelectedTime(time.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit', hour12: false}));
    console.log(selectedTime);
    
    hideTimePicker();
  };

  return (
    <View style={styles.container}>
      <Button title="Seleccionar Hora" onPress={showTimePicker} />
      {selectedTime && <Text>Hora seleccionada: {selectedTime}</Text>}
      <DateTimePickerModal
        isVisible={isTimePickerVisible}
        mode="time"
        is24Hour={true}
        onConfirm={handleTimeConfirm}
        onCancel={hideTimePicker}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default TimePickerExample;
