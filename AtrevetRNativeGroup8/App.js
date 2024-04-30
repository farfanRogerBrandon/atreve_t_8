import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import MyStatusBar from './Components/myStatus';
import Calendar from './Components/Client/Calendar';
import TimePickerExample from './Components/Client/TimePickerExample';

export default function App() {
  return (
    
    <>
    <MyStatusBar>

    </MyStatusBar>
    <Calendar></Calendar>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
