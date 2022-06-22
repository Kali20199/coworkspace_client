import React from 'react'
import {View,StyleSheet,TouchableOpacity,Text} from 'react-native'
function MyButton({title,color,fun,icon}) {

    const style = StyleSheet.create({

        mybutton:{
            flexDirection:'row',
            justifyContent:'center',
            alignItems:'center',
            backgroundColor:color,
            height:40,
            borderRadius:20,
            marginBottom:20,
           
        
        }
        ,BTtitle:{
            color:'white',
            fontSize:18,
        },
        icon:{
            marginRight:10,
        }
    })
    


  return (
    <TouchableOpacity onPress={()=>{
        fun()
    }}>
            <View style={style.mybutton}>
                <View style={style.icon}>{icon}</View>
                <Text style={style.BTtitle}>{title}</Text>
            </View>
    </TouchableOpacity>
  )



  
}




export default MyButton