import { View, Text, StyleSheet, Image, Button, Alert } from 'react-native'
import React, { useEffect } from 'react'
import { useStore } from '../../store/store'
import Color from '../../constant/Color'
import LottieView from 'lottie-react-native'

import PushNotification from 'react-native-push-notification'
import { FlatList, ScrollView } from 'react-native-gesture-handler'
import { Work } from '../../constant/Application';
interface SpaceDetail {

  name: string
  phone: string
  tables: number
  city: string
  id: string
  imageurl: string
}


function WorkSpaceDetails(props) {



   const WorkSpaceImage=(props)=>{

    return (
      <View style={{marginLeft:20}}>
  
        <Image style={{height:150,width:200}} source={{uri:props.img}}/>
      </View>
    )
   }
  




  const CreateChannel = () => {
    PushNotification.createChannel(
      {
        channelId: "test-channel",
        channelName: "Test Chnnel"
      }, () => {
        PushNotification.localNotification({
          channelId: "",
          title: "Loght Space",
          message: 'Reserved Succssefully',

        })
      },
    )
  }

  useEffect(() => {

    CreateChannel()
  })





  const { CoWorkStore, UserStore } = useStore()
  const Detail = CoWorkStore as SpaceDetail
  return (
    <ScrollView style={style.view}>
      <View>

        <Image style={style.image} source={{ uri: Detail.imageurl }} />
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
        <View>
          <Text style={[style.text, style.name,style.cards]}>
            {Detail.name}
          </Text>


          <Text style={[style.text,style.cards]}>
            Free Tables : {Detail.tables}
          </Text>


          <Text style={[style.text,style.cards]}>
            city : {Detail.city}
          </Text>

          <Text style={[style.info]}>
            Space Info 
          </Text>


          <Text style={[style.moreinfo]}>
            phone : 01111309569
          </Text>

          <Text style={[style.moreinfo]}>
            Owner : Mostafa ihab
          </Text>
          <Text style={[style.moreinfo]}>
            Time Open : 8:30 AM
          </Text>
          <Text style={[style.moreinfo]}>
            Time Close : 10 PM 
          </Text>


          <Text style={[style.moreinfo]}>
            Tables : 12
          </Text>

          <Text style={[style.moreinfo]}>
            Private Rooms : 5
          </Text>

          <Text style={[style.moreinfo]}>
            TablePrice : 20 EGP
          </Text>

          <Text style={[style.moreinfo]}>
            PrivateRoomPerHoure : 50 EGB - 100 EGP
          </Text>
         
          <Text style={[style.info]}>
            Notes :
          </Text>
          <Text style={[style.moreinfo]}>
          Notes is a notetaking app developed by Apple. It is provided on their iOS and macOS operating systems, the latter starting with OS X 10.8 Mountain Lion. It functions as a service for making short text notes, which can be synchronised between devices using       
          </Text>

          <FlatList horizontal  data={Work} renderItem={item =><WorkSpaceImage img={item.item.imageurl}/>} />
        
        </View>
      </View>
      <View style={style.button}>
        <Button onPress={() => {
          const date = new Date();
          // Notifi()

          PushNotification.localNotification({
            channelId: "test-channel",
            title: "Light Space",
            message: 'Reserved Succssefully',

          })
          Alert.alert("Reserve Requested", `Name ${UserStore.Creds.userName} \nDate : ${date.getDay()}/${date.getHours().toFixed(2)}:${date.getMinutes()}M `)
        }} color={Color.primary} title={'Reserve Now'} />
      </View>
    </ScrollView>
  )
}



const style = StyleSheet.create({

  cards:{
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: 'white'
  },

  view: {
    width: '100%',

  },
  name: {

  },

  container: {

  },
  image: {
    height: 200
  },

  button: {
    marginTop:50,
    flexDirection: 'row',
    justifyContent: 'center',



  }, text: {
    backgroundColor:'white',
    marginTop:10,
    padding:20,
    width: 390,
    height: 60,
 

    color: 'black'
  },
  info:{
    color:'black',
    padding:20,
    fontSize:25,
    
    
  },
   moreinfo:{
     color:'black',
     padding:20,

   },


})


export default WorkSpaceDetails
