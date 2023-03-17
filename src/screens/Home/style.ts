import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
container:{
    flex:1,
    backgroundColor:'#ebe9e9'
  },
header:{
    backgroundColor:'#2a8894',
    height:110
    
},
userContainer:{
    flex:0.5,
    marginTop:40,
    marginLeft:20,
    marginRight:18,
    flexDirection:'row',
    justifyContent:'space-between'
},
user:{
    color:'#ebe9e9',
    fontSize: 18,
},
addSkillContainer:{
    flex:0.5,
    marginTop:10,
    marginLeft:20,
    marginRight:20
},
addskillSubContainer:{
    flexDirection:'row',
    justifyContent:'space-between'
},
addSkill:{
    color:'#ebe9e9',
    fontSize: 20,
    fontWeight: 'bold'
},
titlecontainer:{
    marginTop:30,
    justifyContent:'center',
    alignItems:'center'
},
title:{
    color:'#252525',
    fontSize: 25,
    fontWeight: 'bold'
},
imgSkills: {
    width: 100,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
},
infos: {
    marginTop: 2,
    borderRadius: 10,
    fontSize: 16,
    fontWeight: "bold",
    color: "#252525",
},
description:{
    marginTop: 2,
    borderRadius: 10,
    fontSize: 12,
    fontWeight: "bold",
    color: "#252525"
},
skillsBackground: {
    backgroundColor: "#2a88949b",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    margin: 15,
},
skillsButton:{
    flexDirection:'row',
    gap:15
},
flatlist:{
    marginTop: 30,
    marginBottom:165,
    alignSelf:'center'
},
textPrimary: {
    marginVertical: 5,
    marginBottom:5,
    textAlign: 'center',
    fontSize: 20,
    fontWeight:'bold'
  },
  textSecondary: {
    marginBottom: 10,
    textAlign: 'center',
    fontSize: 17,
  }
})