import React from 'react'
import { View,Text,FlatList,Image,TouchableOpacity } from 'react-native';
import { Work } from '../../constant/Application';
import { StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { observer } from 'mobx-react-lite';
import { store } from '../../store/store';



const LightSpaceListItem=(props)=>{
    const {CoWorkStore} = store
    const {item}  = props 
    const {name,id,imageurl,tables} = item.item
    const x =3;
    return (
        
         <View style={style.list}>
             <TouchableOpacity style={style.item_container} onPress={()=>{
                 CoWorkStore.setWorkSpaceOptions(name,id,imageurl,tables)
                 props.nav.navigate('Ink')}}>
        <View style={{width:'100%'}}>
            <Image  style={style.image} source={{uri:imageurl}} />
         <View>
          <Text style={style.name}> {item.item.name}</Text>
          <Text style={ {...style.name}}> Open: 
          <Text  style={ style.open}>{item.item.open ? "Open Now"  : "Closed"}
          </Text> 
          </Text>
          </View>
        </View>
        </TouchableOpacity>
        </View>
    
    )
}






function WorkSpacemene(props) {
   
    return (
        <View>
          <View>
          
          </View>
            <FlatList numColumns={2} data={Work} keyExtractor={item=>item.id} renderItem={item=>  <LightSpaceListItem item={item} nav={props.navigation}/>} />
        </View>
    )
}



const style = StyleSheet.create({
    list:{
      flexDirection:'row',
      alignItems:'center',
      justifyContent:'center',
      width:'65%',
      marginLeft:-35,
     
      
    },


 
    item_container:{
        marginTop: 20,  
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
    image:{
       
        width:'100%',
        backgroundColor:'black',
        height:170,
    },
    name:{
        color :'black',
        padding:5,
        width:'100%',
   
    },


    open:{
       position:'absolute' ,
       right:0,
       color:'#038900',
       marginRight:10,
  
  
       
      
    },
    


}) 



export default observer(WorkSpacemene)
