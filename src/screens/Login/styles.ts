import React from "react";
import { Dimensions, StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container:{
      flex:1,
      backgroundColor:'#ebe9e9'
    },
    cabecalho:{
      flex: 1,
      justifyContent: 'flex-end',
      alignItems: 'center',
  
    },
    conteudo:{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    rodape:{
      flex: 1,
      justifyContent: 'flex-start',
      alignItems: 'center'
  
    },
    neki:{
        width:200,
        height:70,
        marginBottom:30
    },
    BV:{
      fontSize: 30,
      fontWeight: 'bold'
  
    },
    input:{
      color:'black',      
      backgroundColor: '#fff',
      opacity:0.8,
      borderRadius: 25,
      width: Dimensions.get('window').width * 0.9,
      marginVertical:10,
      paddingVertical:13,
      paddingHorizontal:15,
      fontWeight: 'bold'
    },
    eyevisible: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        left: 150,
        bottom: 50,
    },
    Login:{
        backgroundColor:'#2a8894',
        width: Dimensions.get('window').width * 0.9,
        padding: 20,
        borderRadius: 50

    },
    LogText:{
        color:'#ebe9e9',
        textAlign:'center',
        fontWeight:'bold',
        fontSize: 18
    },
    Register:{
        marginTop:50
    },
    signUp:{
      fontWeight:'bold'
    }
  });