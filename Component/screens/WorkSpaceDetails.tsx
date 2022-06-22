import { View,Text ,StyleSheet,Image, Button, Alert} from 'react-native'
import React from 'react'
import { useStore } from '../../store/store'
import Color from '../../constant/Color'
import LottieView from 'lottie-react-native'


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
        <View  style={style.view}>
            <View>
          
            <Image style={style.image} source={{uri:Detail.imageurl}}/>
            </View>
            <View style={{flexDirection:'row',justifyContent:'center'}}>
                <View>
            <Text style={style.name}>
                 {Detail.name}
            </Text>
        
          
            <Text>
              Free Tables : {Detail.tables}
            </Text>
           
         
            <Text>
               city : {Detail.city}
            </Text>
            </View>
            </View>
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
      width:'100%',
  
    },
    name:{
     
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
