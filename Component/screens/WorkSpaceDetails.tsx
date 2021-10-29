import { View,Text ,StyleSheet,Image, Button, Alert} from 'react-native'
import React from 'react'
import { useStore } from '../../store/store'
import Color from '../../constant/Color'




interface SpaceDetail {

    name:string
    phone:string
    tables:number
    city:string
    id:string
    imageurl:string
}


function WorkSpaceDetails(props) {
    const {CoWorkStore,UserStore} = useStore() 
    const  Detail  = CoWorkStore as  SpaceDetail
    return (
        <View style={style.view}>
            <View>
            <Image style={style.image} source={{uri:Detail.imageurl}}/>
            </View>
            <Text>
                 {Detail.name}
            </Text>
            <Text>
               Tables : {Detail.tables}
            </Text>
            <Text>
               city : {Detail.city}
            </Text>
            
            <View style={style.button}>
             <Button onPress={()=>{
                const date  = new Date();
               
                 Alert.alert("Reserve Requested",`Name ${UserStore.Creds.userName} \nDate : ${ date.getDay() }/${date.getHours().toFixed(2)}:${date.getMinutes()}M `)}}  color={Color.primary} title={'Reserve Now'} />
             </View>
        </View>
    )
}



const style = StyleSheet.create({
    view:{
      width:'100%'
    },

    container:{

    },
    image:{  
     height:200
    },

    button:{
        flexDirection:'row',
        justifyContent:'center',

      
       
    }


})


export default WorkSpaceDetails
