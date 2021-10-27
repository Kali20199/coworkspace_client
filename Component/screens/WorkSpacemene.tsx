import React from 'react'
import { View,Text,FlatList,Image,TouchableOpacity } from 'react-native';
import { Work } from '../../constant/Application';
import { StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';




const LightSpaceListItem=({item})=>{
    return (
         <View style={style.list}>
             <TouchableOpacity style={style.item_container}>
        <View >
            <View>
            <Image  style={style.image} source={{uri:item.item.imageurl}} />
         
          <Text>{item.item.name}</Text>
          </View>
        </View>
        </TouchableOpacity>
        </View>

    )
}






function WorkSpacemene() {
    return (
        <View>
        
            <FlatList data={Work} keyExtractor={item=>item.id} renderItem={item=>  <LightSpaceListItem item={item}/>} />
        </View>
    )
}



const style = StyleSheet.create({
    list:{
      flexDirection:'row',
      alignItems:'center',
      justifyContent:'center',
      width:'100%'
    },


    image:{
        width:250,
        height:150,
    },
    item_container:{
        marginTop: 20,
        padding:30,
        height:250,
        flexDirection:'row',
        justifyContent:'center',
        alignContent:'center',
        width:'70%',
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        elevation: 5,
        borderRadius: 10,
        backgroundColor: 'white'

    },
    


}) 



export default WorkSpacemene
