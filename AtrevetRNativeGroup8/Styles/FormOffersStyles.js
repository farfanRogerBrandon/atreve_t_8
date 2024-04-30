import { StyleSheet } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

const stylesNf = StyleSheet.create({
  container: {
    backgroundColor: '#fff6ed', 
  
    
    borderColor: 'black', // Color del borde
    
  },
  container2: {
    backgroundColor: '#fff6ed', 
  
    borderBottomWidth:3,
    padding:7
    
  },
  horizontal:{
    flexDirection:"row",
    width:"100%"
},
  title: {
    fontSize: 20,
    marginBottom: 20,
    color: 'black',
  },
  section: {
    marginBottom: 7,
  },
  label: {
    fontSize: 18,
    marginBottom: 5,
    color: '#006d46',
    fontWeight:"bold"
  },
  input: {
    borderBottomWidth: 2, // Solo el borde inferior
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 8,
    flex: 1,
    fontSize: RFValue(16), // Tamaño del texto
    borderColor: 'green',
    borderRadius: 5,
    padding: 10,
  },
  textarea: {
    height: 100,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: 'white',
    color: 'black',
    borderRadius: 8,
    textAlignVertical: 'top', 
  },
  button: {
    backgroundColor: '#008259', // Nuevo color del botón
    padding: 15,
    borderRadius: 10, // Bordes redondeados,
    borderColor:"green",
    borderWidth:2,
    elevation:4,
    alignItems: 'center',
    marginTop: 20, // Mover el botón hacia abajo
  },
  buttonC: {
    paddingVertical: 10, 
    paddingHorizontal: 50, 
    borderRadius: 5, 
    alignItems: 'center',
    margin:4
},

  
  buttonText: {
    color: 'white',
    fontSize: RFValue(19),
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 10,
    borderRadius: 10,
  },
  startHeader:{
    backgroundColor: "#338b85",
    padding:19,
    borderRadius:10,
    width:"100%"
  },
  headerText:{
    color:"black",
    fontSize:27,
    textAlign:"center",
    fontWeight:"bold",
  },
  inputError: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginTop: 5,
  },
  dateTimePicker: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',  // Cambia el color de fondo según tus preferencias
    borderRadius: 8,
    marginTop: 10,
    marginBottom: 20,
    padding: 10,
  },
  dateTimePickerText: {
    color: '#333',  // Cambia el color del texto según tus preferencias
    fontSize: 16,   // Ajusta el tamaño del texto según tus necesidades
    textAlign: 'center',
    marginLeft: 10,  // Espacio entre el ícono y el texto
  },
  calendarIcon: {
    marginRight: 10,  // Espacio entre el ícono y el borde derecho del contenedor
  },
  validationMessage: {
    color: 'red',
    fontSize: 12,
    marginTop: 5, // Espacio entre el mensaje de validación y el TextInput
  },
  
  
  inputContainer: {
    flexDirection: 'row', // Alinea los elementos en una fila
    alignItems: 'center', // Alinea verticalmente los elementos
    backgroundColor: '#e0e0e0', // Color de fondo del contenedor
    borderRadius: 5, // Bordes redondeados
    padding: 10, // Espacio de relleno
  },
  carnetIcon: {
    marginRight: 10, // Espacio a la derecha del ícono
  },
  uploadButton: {
    backgroundColor: '#26ADEE', // Color de fondo del botón
    padding: 15, // Espaciado interno del botón
    borderRadius: 10, // Bordes redondeados
    alignItems: 'center', // Alineación de contenido centrada horizontalmente
    justifyContent: 'center', // Alineación de contenido centrada verticalmente
    marginTop: 20, // Margen superior
    
  },
  uploadButtonText: {
    color: 'white', // Color del texto del botón
    fontSize: 16, // Tamaño del texto del botón
  },
});

export { stylesNf };

