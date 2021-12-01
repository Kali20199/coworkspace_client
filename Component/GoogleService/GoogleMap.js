import React, { useEffect, useState } from 'react'
import { View,Text ,StyleSheet,Image, Alert,PermissionsAndroid} from 'react-native'
import MapView,{PROVIDER_GOOGLE,Marker  } from 'react-native-maps'
import Color,{GoogleMapApiKey} from '../../constant/Color'
import * as Location from 'expo-location'
import * as Permmision from 'expo-permissions'
import { useStore } from '../../store/store'
import { observer } from 'mobx-react-lite'
import Geolocation from '@react-native-community/geolocation';
import RNLocation  from 'react-native-location'
import MARKER from '../../assets/marker.png'
import { Work } from '../../constant/Application';
const LocationPermmision =async(props)=>{
  
  const gtanted =await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,{
      'title': 'Location Permission',
      'message': 'Cowowork App Need access to your location '
    }
  )

   if(gtanted ==PermissionsAndroid.RESULTS.GRANTED)
   {

     const ACCESS_COARSE =await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
      {
        'title': 'Location Permission',
        'message': ' location '
      })

     
       const Loc = await RNLocation.getLatestLocation()
      

  
    props.setLocation(Loc)
     
     console.log("Mobx ",props.UserLocation)
     return Loc
   }else{
    debugger
    Alert.alert('Insuffisent permissions!','you Need to grant Permmission to use this app',[{text:'Okay'}])
   }
  

}




const GoogleMap=(props)=> {
 
    const {UserStore,CoWorkStore:{getSpaceAround,location,setWorkSpaceOptions}} = useStore()
    const [loc,setLoc] = useState()
  

    useEffect(async()=>{
      const Loc = await  LocationPermmision(UserStore)
      setLoc(Loc)
      await getSpaceAround() 
    
      
    //  const latlan = `${Loc.coords.latitude}${Loc.coords.longitude}`
     
     
     },[])
         

 const  Markers=()=>{
   

 
 return location.map(location=>{
   
   const lat =  parseFloat(location.latitude)
   const long =parseFloat(location.longitude)  
return(   
   <Marker  
   onPress={()=>{
    const {name,id,imageurl,tables}  =  Work.find((element)=>element.name===location.spaceName)  
   setWorkSpaceOptions(name,id,imageurl,tables) 
   props.navigation.navigate('Ink')
  }}
   pinColor={'orange'}
   coordinate={{latitude: lat,longitude: long}}  
   title={location.spaceName} 
   />
  ) 
  }) 

  
  }
   
 
  
  return (
   
      <View style={styles.container}>
      {loc ?
            <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          //loc.latitdude,
          //loc.longitude,
          latitude:31.227904,
          longitude:29.9565056,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {location!==undefined ?
        <>
          <Marker 
          style={{height:90,width:90}}
          pinColor={'red'}
          coordinate={{latitude: loc.latitude,longitude: loc.longitude}}  
          title={'Current Location'} 
          >
             
        
          </Marker>
        { Markers()}
         </>
         
        :null}
      
    
      </MapView>
 :null  }   
      </View>
     
  
    )
}


const styles = StyleSheet.create({
    container: {
      ...StyleSheet.absoluteFillObject,
      height: '100%',
   
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    map: {
      ...StyleSheet.absoluteFillObject,
    },
   });

export default observer(GoogleMap)
