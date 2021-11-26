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


const Fetch =async()=>{
  const allLocation =await CoWorkStore.getSpaceAround() 

}


const GoogleMap=()=> {

    const {UserStore,CoWorkStore:{getSpaceAround,location}} = useStore()
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
   coordinate={{latitude: lat,longitude: long}}  
   title={'Current Location'} 
   />)
  })

  
  }
   
 
  
  return (
   
      <View style={styles.container}>
      {loc ?
            <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: loc.latitude,
          longitude:loc.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {location!==undefined ?
         Markers()
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
