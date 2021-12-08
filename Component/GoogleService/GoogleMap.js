import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Image, Alert, PermissionsAndroid } from 'react-native'
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps'
import Color, { GoogleMapApiKey } from '../../constant/Color'
import * as Location from 'expo-location'
import * as Permmision from 'expo-permissions'
import { useStore } from '../../store/store'
import { observer } from 'mobx-react-lite'
import Geolocation from '@react-native-community/geolocation';
import RNLocation from 'react-native-location'
import MARKER from '../../assets/MARKER.png'
import { Work } from '../../constant/Application';
import { Card, Button } from 'react-native-elements'
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



const GoogleMap = (props) => {
  const [visable, setVisable] = useState(false)
  const { UserStore, CoWorkStore: { getSpaceAround, location, setWorkSpaceOptions } } = useStore()
  const [loc, setLoc] = useState()


  useEffect(async () => {
    const Loc = await LocationPermmision(UserStore)
    setLoc(Loc)
    await getSpaceAround()


    //  const latlan = `${Loc.coords.latitude}${Loc.coords.longitude}`


  }, [])

  


  // const LightSpaceCard = (props) => {

  //     return (
        
  //       <View >
  //         {props !==undefined &&
  //         <View style={{ opacity: 1, marginTop: 20 ,position:'absolute'}}>
  //         <Card>
  //           <Image style={styles.image} source={{ uri: 'http://cairopulse.net/wp-content/uploads/2019/01/NEST-@-TRYP-hotel-1280x640.jpg' }} />
  //           <Text style={{ opacity: 1 }}>
  //             Blooms
  //           </Text>
  //           <Button onPress={()=>{}}>View</Button>
  //         </Card>
  //         </View>
  //   }
  //       </View>
  //     ) 
    
 
  // } 
    
 


  const Markers = () => {



    return location.map(location => {

      const lat = parseFloat(location.latitude)
      const long = parseFloat(location.longitude)
      return (
        <Marker
          style={{ width: 200, height: 220 }}
          onPress={() => {
            const { name, id, imageurl, tables } = Work.find((element) => element.name === location.spaceName)
            setWorkSpaceOptions(name, id, imageurl, tables)
         
              props.navigation.navigate('Ink')
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


      {loc ?
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

          {location !== undefined ?
            <>

              <Marker
                style={{ height: 90, width: 90 }}
                pinColor={'red'}
                coordinate={{ latitude: loc.latitude, longitude: loc.longitude }}
                title={'Current Location'}
              >


              </Marker>
              {Markers()}
            </>

            : null}


        </MapView>
        : null}
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
