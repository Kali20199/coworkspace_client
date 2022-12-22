import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Image, Alert, PermissionsAndroid } from 'react-native'
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps'
import { useStore } from '../../store/store'
import { observer } from 'mobx-react-lite'
import RNLocation from 'react-native-location'
import { Work } from '../../constant/Application';

const LocationPermmision = async (props) => {



  const gtanted = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION, {
    'title': 'Location Permission',
    'message': 'Cowowork App Need access to your location '
  }
  )

  if (gtanted == PermissionsAndroid.RESULTS.GRANTED) {

    const ACCESS_COARSE = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
      {
        'title': 'Location Permission',
        'message': ' location '
      })


    const Loc = await RNLocation.getLatestLocation()



    props.setLocation(Loc)  

    console.log("Mobx ", props.UserLocation)
    return Loc
  } else {
    debugger
    Alert.alert('Insuffisent permissions!', 'you Need to grant Permmission to use this app', [{ text: 'Okay' }])
  }


}

// props.navigation.navigate("Login")

const GoogleMap = (props) => { 
  const [visable, setVisable] = useState(false)
  const { UserStore, CoWorkStore: { getSpaceAround, location, setWorkSpaceOptions,workSpaces ,getSpaceByid,setCoworkOptions} } = useStore()
  const [loc, setLoc] = useState()


  useEffect(async () => {

    
    const Loc = await LocationPermmision(UserStore)
    setLoc(Loc)
    await getSpaceAround()


  }, []) 

   

 
 


  const Markers = () => {
 


    return location.map(location => {
   
      const lat = parseFloat(location.latitude)
      const long = parseFloat(location.longitude)
      return ( 
        <Marker
            
          onPress={() => {
            try{
            setCoworkOptions(location.spaceName)
            getSpaceAround()
            // const  {lightSpaceId} = workSpaces.find((element) => element.latitude === location.latitude) 
            // getSpaceByid(lightSpaceId,props)
        
         
         
            }catch(e){}
            
          }}
          pinColor={'orange'}
          coordinate={{ latitude: lat, longitude: long }} 
          title={location.spaceName}
        
      
        /> 
    
        
           
     
      )
    })


  }



  return (

    <View style={styles.container}>
     

 
        <MapView
          style={styles.map}
          provider={PROVIDER_GOOGLE}
          initialRegion={{
            //loc.latitdude,
            //loc.longitude,
            latitude: 31.227904, 
            longitude: 29.9565056,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421, 
          }}
        > 

          {location != undefined ? 
            <>

              <Marker
                style={{ height: 90, width: 90 }}
                pinColor={'red'}
                coordinate={{ latitude: loc!=null ?loc.latitude :31.227904, longitude:loc!=null ? loc.longitude:29.9565056 }}
                title={'Current Location'}
              >


              </Marker>
              {Markers()}
            </>

            : null}


        </MapView>
   
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


  Card: {
    borderRadius: 20
  },


  image: {
    width: 120,
    height: 100,

  },




}); 

export default observer(GoogleMap)
