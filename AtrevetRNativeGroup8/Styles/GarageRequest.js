
import { StyleSheet } from "react-native";
import {RFValue} from "react-native-responsive-fontsize"
const styles = StyleSheet.create({
    container: {
        backgroundColor: "#E7E7E7",
        flex: 1,
        justifyContent:"flex-start"
    },

    container7: {
      backgroundColor: "#E7E7E7",
      flex: 1,
      justifyContent:"flex-start",
      marginTop:-100,
      
  },

    header: {
      backgroundColor: '#0C124E',
      width: '100%',
      height: "10%",
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 0,
      paddingTop:30
    },
    headerText: {
      color: '#fff',
      fontSize: 26,
      fontWeight: 'bold'
    },
   
    containerImg:{
      width:"100%",
      height: 290,
      alignItems:"center",
      justifyContent:'center',
     
    }
    ,
    imgnStart:{
      flex:1,
     
      resizeMode:"contain",
      marginTop:10,
      width:300,
      height:300
  
    },
    containerButtons:{
      width:"100%",
      justifyContent:"flex-start",
      alignItems:"center",
      flexDirection:"row",
      marginTop:0,
      marginBottom:5
    },
    Btn:{
      backgroundColor:"#0C124E",
      borderRadius:22,
      width:"45%",
      margin:10,
      alignItems:'center',
      justifyContent:"center",
      height:102
  
    },
    imgsBtns:{
      flex:1,
      width:"80%",
    }
    , 
    containerAllButtons:{
      height:"45%",
      alignItems:'center',
      justifyContent:"center",
    },
    Tittle:{
      
      backgroundColor:"#0C124E",
      borderRadius:15,
      color:"white",
      alignItems:"center",
      justifyContent:"center",
      margin:10,
      padding:14
    },
    tittleText:{
      textDecorationLine:"underline",
      color: '#fff',
      fontSize: 24,
      fontWeight: 'bold',
     textAlign:"center"
    },
    bodyNotice:{
      backgroundColor:"#0C124E",
      borderRadius:15,
      color:"white",
      alignItems:"center",
      justifyContent:"center",
      margin:10
    },
    TextBody:{
      color:"white",
      alignItems:"flex-start",
      justifyContent:"center",
     textAlign:"left",
     fontSize: 16,
     margin:7
  
    },
    TextBodyA:{
      color:"white",
      alignItems:"flex-start",
      justifyContent:"center",
     textAlign:"left",
     fontSize: 20,
    marginLeft: 14,
    fontWeight:"bold",
    borderBottomWidth:2,
    borderBottomColor:"white"
  
    },
    
    MyMap:{
       
        height:"100%",
        width:"100%"
       
    },
    MyMap2:{
      height:RFValue(400),
      width:"100%",
      alignSelf:"center"
    },
    myScroll:{
        flex:1,
        height:"auto",

    },
    myMapContainer:{
        flex:3,
        backgroundColor:"blue",
        alignItems:"center",
        justifyContent:"center",
        margin:10,
        height:1000
        
    }, //STORYSET
    myMapContainer3:{
     
      backgroundColor:"#CDE0CD",
      alignItems:"center",
      justifyContent:"center",
      margin:10,
      height:RFValue(550),
      borderRadius:10,
      elevation:5
      
  },
    MyImg:{
        width:200,
        height:200,
        alignSelf:"center",
        borderRadius:10
    },
    MyCont:{
        backgroundColor:"#2ca880",
        padding:7
    },
    horizontal:{
        flexDirection:"row",
        width:"100%"
    },
    btnAccept:{
        backgroundColor:"#56D782",
        padding:5,
        borderRadius:8,
      margin:2,
       width:"50%"

    },
    btnRemove:{
        backgroundColor:"red",
        padding:5,
        borderRadius:8,
       margin:2,
       width:"50%"

      
    },
    myMapContainer2:{
      flex:3,
      backgroundColor:"blue",
      alignItems:"center",
      justifyContent:"center",
      margin:0,
      height:1000
      
  }
  });

  export default styles;